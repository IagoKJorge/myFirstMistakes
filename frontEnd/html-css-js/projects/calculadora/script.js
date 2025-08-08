const tela = document.querySelector(".tela");
const btns = [...document.querySelectorAll(".btn")];
const limparBTN = document.querySelector(".limpar");
const igual = document.querySelector(".igual");
let conta = "0";

function mostrarNaTela(ev) {
  const text = ev.target.textContent;

  if ( /^[0-9]$/.test(text) && tela.textContent == "0") {
    if (text == "0") return;
    tela.textContent = text;
    conta = ev.target.dataset.value;
  } else {
    if(text === "." && tela.textContent.includes(".")) return;
    tela.textContent = tela.textContent + text;
    conta += ev.target.dataset.value;
  }
  console.log(conta);
}

btns.map((btn) => btn.addEventListener("click", mostrarNaTela));

function limparTela() {
  tela.textContent = "0";
  conta = "";
}

limparBTN.addEventListener("click", limparTela);

function resposta(){
  let resp = eval(conta);
  console.log(resp)
  tela.textContent = typeof resp == "number" ? resp : "Error";
}

igual.addEventListener("click", resposta)
