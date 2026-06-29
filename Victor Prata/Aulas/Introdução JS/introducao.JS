var ola = "Ola mundo JS";

console.log(ola);

function log(valor){
    console.log(valor);
}

//Tipos de variáveis

var valor = 10;
log(typeof valor); //number

var palavra = "Fernando";
log(typeof palavra); //string

var isOK = true;
log(typeof isOK); //boolean

var meuObj = {}; //Object
var meuArray = []; //Array
var nulo = null; //null
var variavelFlamengo; //Undefind


//Escopo de variavel
function compararEscopo() {
    if(true){
        var varDentro = "Var dentro do bloco";
        let letDentro = "Let dentro do bloco";
        const constDentro = "Const dentro do bloco";

        log(varDentro);
        log(letDentro);
        log(constDentro);
    }
    log(varDentro);
}
compararEscopo();

//operações Simples

const n1 = 1;
const n2 = 5;
const valorNumericoStr = "5";

log(n1 + n2); //6
log(n1 * n2); //5
log(n1 / n2); //0.2

log(n1 == n2); //false
log(n2 == valorNumericoStr); //true
log(n2 === valorNumericoStr) //false

log((n2 > n1 || n2 > n1) && 1 > 2); //false

//Manipulando Arrays

let frutas = ["Maçã", "Banana", "Laranja"];

log(frutas.length); //3
log(frutas[0]);

log(frutas);

frutas.pop() //Remove o ultimo

log(frutas);

frutas.push("manga"); //Adicionar um elemento

log(frutas);

//estrutura condicional

const idade = 18;
if (idade>=18){
    log("Adulto");
}
else if (idade>=2){
    log("sou criança")
}
else {
    log("sou bebe")
}

const instituicao = "CEM10";

switch (instituicao){
    case "CEUB":
        log("Faculdade");
        break;
    case "CIL":
        log("Escola de Línguas");
        break;
    case "CEM10":
        log("Escola")
        break;
}

for (let loop = 0; loop > 5; loop++){
    log(`Meu valor no loop: ${loop}`);
}

let valorWhile = 0;
while(valorWhile < 5){
    log(`Meu valor no while: ${valorWhile}`)
    valorWhile++;
}

//Funções Assincronas permitem executar operações
// sem bloquear a execução do codigo

async function buscarDados(){
    return new Promise((resolve) =>{
        setTimeout(() => {
            resolve("Dados Recebidos");
        }, 4*1000);
    });
}

async function executarBusca() {
    log ("Buscando.....");
    let resultado = buscarDados();
    log(resultado);
}

executarBusca();


const meuMetodo = function exemploMetodo(){
    log("Executei o metodo normal");
};

log(meuMetodo);

const objTeste = {
    oi() {
        log("oi");
    },
    tchau() {
        log("tchau");
    },
};

objTeste.oi();
objTeste.tchau();

function toggleImage(){
    let img = document.getElementById("minhaImagem");
    img.style.display = img.style.display === "none" ? "block" : "none";
}