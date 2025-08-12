//class Fila<T> {
//  private fila: T[];
//  constructor(...valores: T[]) {
//    this.fila = valores;
//  }
//
//  entrar(valor:T){
//    return this.fila.push(valor);
//  }
//
//  proximo(){
//    return this.fila.shift();
//  }
//
//  imprimir(){
//    return this.fila;
//  }
//}
//

// Desafio Mapa
// Array de Objetos (Chave/Valor) -> itens
// Métodos: obter(Chave), colocar({ C, V })
// limpar(), imprimir()
 


//class Mapa<T, Q>{
//  private mapa: {chave: T; valor: Q}[];
//  constructor(){
//    this.mapa = [];
//  }
//
//  colocar(elemento:{chave: T; valor: Q}){
//    let exist = this.mapa.find((el) => el.chave === elemento.chave);
//    if(exist){
//      exist.valor = elemento.valor;
//    }else{
//      this.mapa.push(elemento);
//    }
//  }
//
//  obter(chave: T){
//    return this.mapa.find((el) => el.chave === chave);
//  }
//
//  limpar(){
//    this.mapa = [];
//  }
//
//  imprimir(){
//    return console.log(this.mapa);
//  }
//
//}

// Desafio Decorator perfilAdmin
const usuarioLogado = {
    nome: 'Guilherme Filho',
    email: 'guigui@gmail.com',
    admin: false
}
 
function PerfilAdmin(constructor: Function){
  if(!usuarioLogado.admin){
    throw new Error("Usuário não é adm")
  }
}
@PerfilAdmin
class MudancaAdministrativa {
  critico() {
        console.log('Algo crítico foi alterado!')
    }
}
 
new MudancaAdministrativa().critico()

