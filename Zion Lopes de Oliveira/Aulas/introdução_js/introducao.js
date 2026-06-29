var ola = "Ola!"

console.log(ola);

function log(valor) {

    console.log(valor);

}

// Tipos de variaveis

var valor = 10;

log(typeof valor); //Numero

var palavra = "Palavra"

log(typeof palavra); //String

var booleano = false

log(typeof booleano); //Boolean

var meuObj = {};

var meuArray = []; //Array

var nulo = null; //Null

var variavelFODA; //Indefinido/Undefind


// Escopo de variavel

function comparaEscopo() {
    if(true){
        var varDento = "Var"
        let letDento = "Let"
        const constDento = "Const"

        log(varDento);
        log(letDento);
        log(constDento);
    }
    log(varDento);
}

comparaEscopo();

// Operações Simples

const n1 = 1;
const n2 = 5;
const valorNumericoStr = "5";

log(n1+n2); //6
log(n1 * n2); //5
log(n1/n2); //0.2

log(n1 == n2); //false

log(n2 == valorNumericoStr);

log((n2 > n1 || n2 > n1) && 1 > 2); //false

//Manipulando Arrays

let frutas = ["Maça","Banana","Laranja"];

log(frutas.length)//3
log(frutas[2]);

log(frutas);

frutas.pop();//Remove o ultimo

log(frutas);

frutas.push("Manga"); //Adiciona manga

log(frutas);

//Estruturas condicionais
const idade = 18;
if(idade >= 18){
    log("Adulto")
} else if(idade >= 2){
    log("Criança")
} else {
    log("Bebê")
}

const instituicao = "CEUB";

switch(instituicao) {
    case "CEUB":
        log("Faculdade");
        break;
    case "CIL":
        log("Escola de Linguas")
        break;
    case "CEM100":
        log("Escola")
        break;
}

for (let loop =0; loop < 5; loop++){
    log(`Meu valor no loop: ${loop}`)
}

let valorWhile = 0;
while(valorWhile < 0) {
    log(`Meu valor no While : ${valorWhile}`)
}

//Função Assincrona (Permite executar operações, sem bloquear a execução do codigo)

async function buscarDados() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Dados recebidos!");
        }, 4*1000);
    });
}

async function executarBusca() {
    log("Buscando....");
    let resultado = await buscarDados();
    log(resultado);
}

executarBusca();

const meuMetodo = function exemploMetodo() {
    log("Executado por metodo normal");
};

log(meuMetodo)

const objTeste = {
    oi() {
        log("Oi")
    },
    tchau() {
        log("Tchau");
    },
};

objTeste.oi();
objTeste.tchau();