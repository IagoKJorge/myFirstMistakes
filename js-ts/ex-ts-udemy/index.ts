//1
  /*var dobro = function(valor) {
  return valor * 2
  }
  console.log(dobro(10))*/

const dobro = (valor: number):number => valor * 2;

//2
/*
  var dizerOla = function (nome) {
  if (nome === undefined) { nome = "Pessoa" }
  console.log("Ola, " + nome)
  }
  dizerOla()
  dizerOla("Anna")
*/

const dizerOla = (nome:string = "Pessoa"):void => {console.log(`Olá, ${nome}!`)};

//3
/*
  var nums = [-3, 33, 38, 5]
  console.log('???')  
*/

const nums:number[] = [-3, 33, 38, 5];

console.log(Math.min(...nums));


//4

let array:number[] = [55,20, ...nums];

//5
/*
  var notas = [8.5, 6.3, 9.4]
  var notas1 = notas[0]
  var notas2 = notas[1]
  var notas3 = notas[2]
  console.log(nota1, nota2, nota3)
  var cientista = {primeiroNome: "Will", experiencia: 12}
  var primeiroNome = cientista.primeiroNome
  var experiencia = cientista.experiencia
  console.log(primeiroNome, experiencia)
*/

const notas:number[] = [8.5, 6.3, 9.4];
const [notas1, notas2, nota3] = notas;
console.log(notas1, notas2, nota3)
const cientista = {primeiroNome: "Will", experiencia: 12};
const {primeiroNome, experiencia} = cientista; 