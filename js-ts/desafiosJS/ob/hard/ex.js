// 23
const classificacao = ["Alfa", "Beta", "Gama", "Delta"];
let eliminatedQTD = 0;
function runPod(corredorAcao) {
  const corredorAcaoArray = corredorAcao.split(" ");
  let idx = classificacao.indexOf(corredorAcaoArray[0]);

  if (corredorAcaoArray.length !== 2 || idx === -1) return "Entrada inválida!";

  if (classificacao[idx].includes("ELIMINATED"))
    return "Número já foi eliminado!";

  if (!isNaN(corredorAcaoArray[1])) {
    let idx1 =
      classificacao.indexOf(corredorAcaoArray[0]) -
      Number(corredorAcaoArray[1]);

    if (idx1 < 0 || idx1 >= classificacao.length - eliminatedQTD)
      return "Posição inválida!";

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

// 24

const arrBD = ["erick_14", "pam_ls2", "VICTOR_99A"];

function usernameValidation(username) {
  if (
    /^\W/ig.test(username) ||
    /^\d/ig.test(username) ||
    /_$/ig.test(username) ||
    !/^[a-z]/ig.test(username)
  )  return false;
  

  if(username.length > 32 || username.length < 4) return false;

  if(!/[a-z_\d]/ig.test(username)) return false;

  if(arrBD.includes(username)) return false;

  arrBD.push(username);
  return true;
}

console.log(usernameValidation("josh_g15"))