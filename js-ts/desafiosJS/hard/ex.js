// 23
const classificacao = ["Alfa", "Beta", "Gama", "Delta"];
let eliminatedQTD = 0;
function runPod(corredorAcao) {
  const corredorAcaoArray = corredorAcao.split(" ");
  let idx = classificacao.indexOf(corredorAcaoArray[0]);

  if (corredorAcaoArray.length !== 2 || idx === -1) return "Entrada inválida!";

  if (classificacao[idx].includes("ELIMINATED")) return "Número já foi eliminado!";
  
  if (!isNaN(corredorAcaoArray[1])) {
    let idx1 = classificacao.indexOf(corredorAcaoArray[0]) - Number(corredorAcaoArray[1]);

    if (idx1 < 0 || idx1 >= classificacao.length - eliminatedQTD) return "Posição inválida!";
    
    let el = classificacao[idx];
    classificacao.splice(idx, 1);
    classificacao.splice(idx1, 0, el);
    
    console.log(classificacao);
    
    return classificacao;
  } else if (corredorAcaoArray[1] === "ELIMINATE") {
    classificacao[idx] += " ELIMINATED";

    let eliminated = classificacao[idx];
    
    classificacao.splice(idx, 1);
    
    classificacao.push(eliminated);
    
    eliminatedQTD++;

    console.log(classificacao);
    return classificacao;
  }
}

runPod("Beta +1");
runPod("Gama -1");
runPod("Delta ELIMINATE");
runPod("Gama +2");
