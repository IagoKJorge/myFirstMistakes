let acertos = +document.querySelector("#acertos").textContent;
let erros = +document.querySelector("#erros").textContent;
let opcoes = document.querySelector(".opcoes");
let next = document.querySelector(".next");
// Nova função de tradução usando MyMemory API
async function traduzir(texto) {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        texto
      )}&langpair=en|pt`
    );
    const data = await response.json();

    if (!data.responseData || !data.responseData.translatedText) {
      throw new Error("Resposta de tradução inválida");
    }

    return data.responseData.translatedText;
  } catch (error) {
    console.error("Erro ao traduzir:", texto, error.message);
    return texto; // Retorna o texto original em caso de erro
  }
}

async function quizTraduzido() {
  try {
    // 1. Busca a pergunta original
    const res = await fetch("https://the-trivia-api.com/api/questions?limit=1");
    if (!res.ok) throw new Error("Falha ao buscar perguntas");
    const data = await res.json();
    const pergunta = data[0];

    // 2. Prepara todas as traduções em paralelo
    const [questaoTraduzida, ...opcoesTraduzidas] = await Promise.all([
      traduzir(pergunta.question),
      ...pergunta.incorrectAnswers.map((op) => traduzir(op)),
      traduzir(pergunta.correctAnswer),
    ]);

    // 3. Identifica a resposta correta
    const opcoes = [...pergunta.incorrectAnswers, pergunta.correctAnswer];
    const opcoesCompletas = [...opcoesTraduzidas];
    const indexCorretaOriginal = opcoes.indexOf(pergunta.correctAnswer);
    const corretaTraduzida = opcoesCompletas[indexCorretaOriginal];

    // 4. Embaralha as opções
    const opcoesEmbaralhadas = [...opcoesCompletas].sort(
      () => Math.random() - 0.5
    );

    return {
      questao: questaoTraduzida,
      opcoesEmbaralhadas,
      correta: corretaTraduzida,
      categoria: pergunta.category, // categoria original (não traduzida)
      dificuldade: pergunta.difficulty, // dificuldade original
    };
  } catch (err) {
    console.error("Erro no quiz:", err);
    return {
      error: "Ocorreu um erro ao gerar o quiz",
      details: err.message,
    };
  }
}

// Testando a função
quizTraduzido()
  .then((resultado) => {
    if (resultado.error) {
      console.error("Erro:", resultado);
    } else {
      console.log("Pergunta:", resultado.questao);
      console.log("Opções:", resultado.opcoesEmbaralhadas);
      console.log("Resposta correta:", resultado.correta);
      console.log("Categoria:", resultado.categoria);
      console.log("Dificuldade:", resultado.dificuldade);
    }
  })
  .catch(console.error);

function habilita(bol = false) {
  const elementos = opcoes.querySelectorAll("button");
  elementos.forEach((el) => {
    el.disabled = bol;
  });
}

function criaBTN(idx, text, correta) {
  let btn = document.createElement("button");
  btn.classList.add("opcao");
  btn.id = `escolha${idx + 1}`;
  btn.textContent = text;
  btn.addEventListener("click", function (ev) {
    const elementoClicado = ev.target;
    console.log("click",elementoClicado.textContent, correta)
    if (elementoClicado.textContent.trim() == correta.trim()) {
      acertos++;
      document.querySelector("#acertos").textContent = acertos;
    } else {
      erros++;
      document.querySelector("#erros").textContent = erros;
    }
    habilita(true);
  });
  habilita(false);
  return btn;
}

function exibir(obj) {
  document.querySelector(".pergunta").textContent = obj.questao;

  for (let i = 0; i < obj.opcoesEmbaralhadas.length; i++) {
    opcoes.append(criaBTN(i, obj.opcoesEmbaralhadas[i], obj.correta));
  }
}

function limparTela(){
  opcoes.innerHTML = "";
}


async function mostrandoNaTela() {
  let dados = await quizTraduzido();
  limparTela();
  exibir(dados);
  return;
}

mostrandoNaTela();

next.addEventListener("click", mostrandoNaTela);
