let runningTotal = 0;
let buffer = '0';
let previousOperator;

const screen = document.querySelector('#telaResposta');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerHTML = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if(previousOperator === null){
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case 'CE':
            buffer = '0';
            runningTotal = 0;
            break;
        case '+':
        case '-':
        case 'x':
        case '/':
        case '%':
            handleMath(symbol);
            break;
    
        default:
            break;
    }
}

function handleMath(symbol) {
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0){
        runningTotal = intBuffer
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === 'x') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '/') {
        runningTotal /= intBuffer;
    } else if (previousOperator === '%') {
        runningTotal = runningTotal*intBuffer/100;
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

document.addEventListener("keydown", function(event) {
    if (!isNaN(event.key)) {
        handleNumber(event.key);
    } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/" || event.key === "%") {
        handleSymbol(event.key);
    } else if (event.key === "Enter" || event.key === "=") {
        handleSymbol("=");
    }
    screen.innerHTML = buffer;
});

function init() {
    document
        .querySelectorAll('.teclado-botao')
        .forEach(botao => {
            botao.addEventListener("click", function (event) {
                buttonClick(event.target.innerText);
            })
        })
}

init();