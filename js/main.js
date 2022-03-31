const btns = document.querySelectorAll('button');
const screen = document.querySelector('.screen')
let numBuffer = '';
let storedValues = {};
let dotted = false;

btns.forEach(button => button.addEventListener('click', operate))

function operate(value) {
    id = value.target.id;
    classes = value.target.classList;

    switch (classes[0]){
        case 'numB':
            if(numBuffer.length > 11) {
                break;
                /*alert('Calculation exceded character limit')
                numBuffer = ''
                screen.innerText = ''
                dotted = false;
                return*/
            }
            addButton(id)
            screen.innerText = `${numBuffer}`
            break

        case 'dot':
            if(dotted){
                break
            }
            if(numBuffer.length > 11) {
                break
                /*alert('Calculation exceded character limit')
                numBuffer = ''
                screen.innerText = ''
                return*/
            }
            addButton(id)
            screen.innerText = `${numBuffer}`
            dotted = true
            break

        case 'opB':
            doOperation(id)
            if(checkSanity()){
                alert('NO NUMBERS TO OPERATE')
                clearAll()
                return
            }
            if(storedValues.firstVal > 999999999999) {
                alert("Calculation exceded character limit")
                numBuffer = ''
                screen.innerText= ''
                clearAll()
                dotted = false;
                return
            }else{
                formattedValue = String(storedValues.firstVal)
                screen.innerText = `${parseFloat(formattedValue.slice(0, 12))}`
            }
            dotted = false;
            break

        case 'eqB':
            if(storedValues.operator == undefined) {
                alert("NO NUMBERS TO OPERATE")
                clearAll()
                break;
            }
            doOperation(id)
            if(storedValues.firstVal > 999999999999) {
                alert("Calculation exceded character limit")
                numBuffer = ''
                screen.innerText= ''
            }else{
                formattedValue = String(storedValues.firstVal)
                screen.innerText = `${parseFloat(formattedValue.slice(0, 12))}`
               
            }
            clearAll()
            dotted = false;
            break

        case 'clearB':
            clearAll()
            screen.innerText = ``
            dotted = false;
            break

        default:
            alert('FATAL ERROR')
    }
}

function addButton(number) {
    numBuffer += number;
}

function doOperation(operation) {
    switch(operation) {
        case 'plus':
            defineOperation('+')
            break;
        case 'subt':
            defineOperation('-')
            break;
        case 'division':
            defineOperation('/')
            break;
        case 'mult':
            defineOperation('x')
            break;
        case 'eq':
            defineOperation('=')
    }
}


function defineOperation(operator) {
    if(storedValues.firstVal == undefined) {
        storedValues.firstVal = parseFloat(numBuffer);
        storedValues.operator = `${operator}`;
        numBuffer = '';
    }
    else {
        operateLast(numBuffer, operator)
        numBuffer = '';
    }
}

function operateLast(number, newOperator) {
    storedValues.secondVal = parseFloat(number)
    if(isNaN(storedValues.secondVal)){
        alert ("No numbers to operate")
        return
    }
    storedValues.firstVal = makeOperation(storedValues);
    storedValues.secondVal = undefined;
    storedValues.operator = newOperator

    return storedValues.firstVal;
}

function makeOperation(object) {
    operator = object.operator;
    primeiro = object.firstVal;
    segundo = object.secondVal;
    if(operator == '+') {
        return primeiro + segundo
    }
    else if(operator == '-'){
        return primeiro - segundo
    }
    else if(operator == '/'){
        if(segundo == 0) {
            alert("bruh")
            return 0
        }
        return primeiro / segundo
    }
    else {
        return primeiro * segundo
    }
}

function clearAll() {
    numBuffer = '';
    storedValues = {};
}

function checkSanity() {
    return isNaN(storedValues.firstVal)
}