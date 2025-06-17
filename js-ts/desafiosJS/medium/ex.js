//15

const romano = (str) => {
  if (str.length == 0) return "";
  const obj = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  if (str.length == 1) return obj[str[0]];

  let resp = 0;

  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]] >= obj[str[i + 1]] || !str[i + 1]) {
      resp += obj[str[i]];
    } else {
      resp -= obj[str[i]];
    }
  }

  return Math.abs(resp);
};

//console.log(romano("XLVII"))
//console.log(romano("CDXXXVIII"))
//console.log(romano("CMIX"))
//console.log(romano("MMMCMXCIX"));

//16

function cifra(str, deslocamento) {
  let resp = "";
  let alfa = [];
  deslocamento = deslocamento % 26;
  for (let i = 65 + deslocamento; i <= 90; i++) {
    alfa.push(String.fromCharCode(i));
  }

  for (let i = 0; i < deslocamento; i++) {
    alfa.push(String.fromCharCode(65 + i));
  }

  for (let i = 0; i < str.length; i++) {
    if (str[i] != str[i].toUpperCase()) {
      resp += alfa[str[i].toUpperCase().charCodeAt(0) - 65].toLowerCase();
    } else {
      resp += alfa[str[i].charCodeAt(0) - 65];
    }
  }

  return resp;
}

//console.log(cifra("Vugvg", 2));
//console.log(cifra("BCDYZAbcdyza", 27));
//console.log(cifra("Qaiik", 60));
//console.log(cifra("Amozmlw", 60));

//17

function mission(f, p, ind) {
  let resp = "";
  let c = 0;
  for (let i = 0; i < f.length; i++) {
    if (ind[c] == i) {
      resp += p;
      c++;
    }

    resp += f[i];
  }

  return resp;
}

/*console.log(mission("capaz utilizar as cápsulas emergência","de ",[6,27]))*/
//console.log(mission("Hello","world",[6]))

//18

function equation(a, b, c) {
  if (a === 0 && b == 0) return "1.Parâmetos insuficientes.";

  let resp = [];
  if (a === 0) {
    resp[0] = -c / a;
  } else {
    resp[0] = ((-b + (b ** 2 - 4 * a * c) ** 0.5) / 2) * a;
    resp[1] = ((-b + (b ** 2 - 4 * a * c) ** 0.5) / 2) * a;
  }

  return resp;
}

//19

function calc(num) {
  let resp = 0;
  let numAux = String(num);

  while (numAux.length > 1) {
    numAux = numAux.split("").reduce((acc, el) => acc * Number(el), 1);
    numAux = String(numAux);
    resp++;
  }

  return resp;
}

//console.log(calc(539))

//20(Errei)

//21

function sistema(arr) {
  if (arr.length != 3) return;
  let resp = "";

  if (arr[0] > 0 && arr[1] > 0 && arr[2] > 0) {
    resp += "Saída setor: Alfa \n";
  } else if (arr[0] > 0 && arr[1] > 0 && !(arr[2] > 0)) {
    resp += "Saída setor: Beta \n";
  } else if ((arr[0] > 0) && !(arr[1] > 0) && arr[2] > 0) {
    resp += "Saída setor: Gama \n";
  } else if (arr[0] > 0 && !(arr[1] > 0) && arr[2] > 0) {
    resp += "Saída setor: Delta \n";
  } else if (!(arr[0] > 0) && arr[1] > 0 && arr[2] > 0) { // Repetido (igual ao case Gama)
    resp += "Saída setor: Épsilon \n";
  } else if (!(arr[0] > 0) && !(arr[1] > 0) && arr[2] > 0) {
    resp += "Saída setor: Sigma \n";
  } else if (!(arr[0] > 0) && !(arr[1] > 0) && !(arr[2] > 0)) {
    resp += "Saída setor: Ômega \n";
  } else if (!(arr[0] > 0) && (arr[1] > 0) && !(arr[2] > 0)) { 
    resp += "Saída setor: Zeta \n";
  }

  let num = arr.map((el) => el ** 2).reduce((acc, el) => (acc += el), 0) ** 0.5;

  resp = `${resp}Saída distância: ${num}`;

  return resp;
}

//22

function faltando(arr){
  let resp = [];
  let regex = /^0*?([1-9].*)/
  let obj = {}
  let arrNum = arr.map((el) => Number(el.replace(regex, "$1")));
  let max = arrNum[0];
  arrNum.forEach(element => {
    obj[element] = 1; 
    max = Math.max(element, max);
  });
  let n = 1;
  while(n <= max){
    if(!obj[n]){
      resp.push(String(n).padStart(4,"0"))
    }
    n++;
  }
  console.log(resp)
  return resp;
}

//faltando(['0020', '0002', '0013', '0004', '0001', '0016', '0015', '0006', '0012', '0007', '0005', '0008', '0011', '0010'])
//faltando(['0020', '0009', '0002', '0013', '0004', '0017', '0001', '0003', '0016', '0015', '0019', '0006', '0012', '0007', '0005', '0014', '0008', '0011', '0010', '0018'])
//faltando(['0004', '0002', '0005', '0003'])

