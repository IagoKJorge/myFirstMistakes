//1
function helpingTheAcademy(...args) {
  let sum = args.reduce((acc, el) => (acc += el), 0);

  return sum / args.length;
}

//2
function recursiveProcedure(n) {
  if (n === 1) {
    return "chunk";
  }

  if (n > 1) {
    return "chunk-" + recursiveProcedure(n - 1);
  }
}

//3

function newReverse(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr[i] = arr[arr.length - 1 - i];
  }
  return newArr;
}

//4

function calc(n) {
  let newStr = "";
  let str = String(n);
  //console.log(str[0]);
  for (let i = 0; i < str.length; i++) {
    newStr += String(Number(str[i]) ** 2);
  }

  return newStr;
}

//5

function largestLetter(word) {
  let largest = word[0];
  for (let i = 1; i < word.length; i++) {
    largest = largest.charCodeAt(0) > word.charCodeAt(i) ? largest : word[i];
  }

  return largest;
}

//6

function hiddenHistory(phrase) {
  let newPhrase = phrase
    .split(" ")
    .map((el) => el.split("").reverse().join(""))
    .join(" ")
    .toLowerCase();

  return newPhrase;
}

//console.log(hiddenHistory("May the force be with you"))

//9

const frequencyCounter = (str) => {
  let obj = {};
  for (let i = 0; i < str.length; i++) {
    obj[str[i]] = (obj[str[i]] || 0) + 1;
  }

  let max = obj[str[str.length - 1]];

  for (const key in obj) {
    if (obj[key] != max) return false;
  }

  return true;
};

//console.log(frequencyCounter("iagoo"));

//10

const factorial = (n) => {
  const bigN = BigInt(n);
  if (bigN <= 1n) return 1n;
  return bigN * factorial(bigN - 1n);
};

//11

const interval = ([n, m]) => {
  let resp = [];

  for (let i = 0; i <= n; i++) {
    for (let c = 0; c <= m; c++) {
      resp.push([i, c]);
    }
  }

  return resp;
};

//12

function troco(n) {
  let amount = n;
  let obj = { 500: 0, 100: 0, 25: 0, 10: 0, 5: 0, 1: 0 };
  let arr = [500, 100, 25, 10, 5, 1];
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    if (amount > num) {
      obj[num] = Math.floor(amount / num);
      amount -= Math.floor(amount / num) * num;
    }
  }
  return obj;
}

//13

function veri(n) {
  let arr1 = String(n).split("");
  let arr = arr1.slice(0, -1);
  console.log(arr);
  let resp =
    arr
      .filter((_, ind) => ind % 2 == 0)
      .reduce((sum, el) => sum + Number(el), 0) *
      3 +
    arr
      .filter((_, ind) => ind % 2 != 0)
      .reduce((sum, el) => sum + Number(el), 0);

  resp = resp % 10 !== 0 ? 10 - (resp % 10) : 0;

  return resp === Number(arr1.at(-1));
}

//14

class Lic {
  constructor(nome, sobre, nas, lic = false) {
    this.nome = nome;
    this.sobre = sobre;
    nas = nas.split("/");
    this.nas = new Date(nas[2], nas[1] - 1, nas[0]).toISOString();
    this.lic = this.lic(lic);
  }

  lic(lic) {
    return (
      String(this.sobre.padEnd(5, "9").toLocaleUpperCase()) +
      "-" +
      String(this.nas[2]) +
      String(this.nas[5]) +
      String(this.nas[6]) +
      String(this.nas[3]) +
      "." +
      this.nome[0].toLocaleLowerCase()
    );
  }
}




