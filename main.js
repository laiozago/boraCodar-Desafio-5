//* Declara variaveis
let totalAtual = 0;
let memoria = '0';
let operacaoAnterior;
let operacaoAtual = '';
//*Seleciona a tela de resposta e a tela de conta
const tela = document.querySelector('#telaResposta');
const telaDeOperacao = document.querySelector('#display-conta');
//*Função para quando uma tecla é clicada
function clickDoBotao(value) {
    if (isNaN(value)) {
        lidaSimbolo(value);
    } else {
        lidaNumero(value);
    }
    tela.innerHTML = memoria;
    telaDeOperacao.innerHTML = operacaoAtual;
}
//*Função para lidar com símbolos
function lidaSimbolo(symbol) {
    switch (symbol) {
        case 'C':
            memoria = '0';
            totalAtual = 0;
            break;
        case 'Backspace':
            memoria = '0';
            totalAtual = 0;
            break;
        case '=':
            if(operacaoAnterior === null){
                return
            }
            realizaOperacao(parseFloat(memoria));
            operacaoAnterior = null;
            operacaoAtual += memoria + ' ' + symbol;
            memoria = totalAtual;
            totalAtual = 0;
            break;
        case 'CE':
            memoria = '0';
            totalAtual = 0;
            operacaoAtual = '';
            break;
        case 'Delete':
            memoria = '0';
            totalAtual = 0;
            operacaoAtual = '';
            break;
        case '.':
            lidaPontoDecimal();
            break;
        case '+':
        case '-':
        case 'x':
        case '/':
        case '%':
        case '*':
            lidaConta(symbol);
            break;
    
        default:
            break;
    }
}
//*Função para fazer cálculo
function lidaConta(symbol) {
    if(memoria === '0'){
        return;
    }

    const intMemoria = parseFloat(memoria);

    if (totalAtual === 0){
        totalAtual = intMemoria;
        operacaoAtual = memoria + ' ' + symbol;
    } else {
        realizaOperacao(intMemoria);
        operacaoAtual = memoria + ' ' + symbol;
    }
    operacaoAnterior = symbol;
    memoria = '0';
}
//*Função para fazer cálculo
function realizaOperacao(intMemoria) {
    if (operacaoAnterior === '+') {
        totalAtual += intMemoria;
    } else if (operacaoAnterior === '-') {
        totalAtual -= intMemoria;
    } else if (operacaoAnterior === 'x'|| operacaoAnterior === '*') {
        totalAtual *= intMemoria;
    } else if (operacaoAnterior === '/') {
        totalAtual /= intMemoria;
    } else if (operacaoAnterior === '%') {
        totalAtual = totalAtual*intMemoria/100;
    }
}
//*Função para lidar com números
function lidaNumero(numberString) {
    if (memoria === '0') {
        memoria = numberString;
    } else {
        memoria += numberString;
    }
}
//*Adiciona escutador de evento na tela e no teclado

function init() {
    document
    .querySelectorAll('.teclado-botao')
    .forEach(botao => {
        botao.addEventListener("click", function (event) {
            clickDoBotao(event.target.innerText);
        })
    })
    document.addEventListener("keydown", function(event) {
        if (!isNaN(event.key)) {
            lidaNumero(event.key);
        } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/" || event.key === "%") {
            lidaSimbolo(event.key);
        } else if (event.key === "Enter" || event.key === "=") {
            lidaSimbolo("=");
        } else if (event.key === "Delete" || event.key === "Backspace"){
            lidaSimbolo(event.key);
        } else if (event.key === "," || event.key === ".") {
            lidaPontoDecimal();
        }
        tela.innerHTML = memoria;
        telaDeOperacao.innerHTML = operacaoAtual;
    });
}

init();

//função para lidar com o ponto decimal
function lidaPontoDecimal() {
    if (memoria.includes('.')) {
        return;
    }
    memoria += '.';
}