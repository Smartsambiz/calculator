let displayValue = '0';
let num1 = '';
let num2 = '';
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll('.operand');
const operatorbtn = document.querySelectorAll(".operator");
const clearbtn = document.querySelector(".clear");
const equalbtn = document.querySelector(".equals")
const decimalbtn = document.querySelector(".decimal");
const display = document.querySelector('#currentDisplay')
const lastDisplay = document.querySelector('#lastDisplay');
const percentbtn = document.querySelector(".percent");
const signbtn = document.querySelector(".sign");


signbtn.addEventListener('click', ()=>{
    const eachCLK = signbtn.dataset.input;
    inputSign(eachCLK);
})

percentbtn.addEventListener('click',inputPercent)


decimalbtn.addEventListener('click', inputDecimal)



buttons.forEach((button)=> 
button.addEventListener('click', ()=>{
  const eachCLK = button.dataset.key;
  inputOperand(eachCLK);
  //updateDisplay()
}));



operatorbtn.forEach((button)=>
button.addEventListener('click', ()=>{
  const eachCLK = button.dataset.operate;
  inputOperator(eachCLK);
 
}));


equalbtn.addEventListener('click', inputEquals)


clearbtn.addEventListener('click', ()=>{
  clearDisplay();
 
})







function inputOperand(operand) {
    if(firstOperator === null) {
        if(num1 === '') {
            //1st click - handles first operand input
            num1= operand;
            lastDisplay.textContent = num1;
        } else if(num1 === lastDisplay.textContent) {
            //starts new operation after inputEquals()
            num1 += operand;
            lastDisplay .textContent = num1;
        } else {
            num1 += operand;
            lastDisplay.textContent = num1
        }
    } else {
      if(display.textContent === num1){
        num2 = operand;
        lastDisplay.textContent = num2
      } else {
        num2 += operand;
        lastDisplay.textContent = num2
      }
}
};




function inputOperator(operator) {
    if(firstOperator != null && secondOperator === null) {
        secondOperator = operator;
        result = operate(Number(num1), Number(num2), firstOperator);
        display.textContent = `${roundAccurately(result, 15).toString()}`;
        num1 = display.textContent;
        result = null;
    } else if(firstOperator != null && secondOperator != null) {
        result = operate(Number(num1), Number(num2), secondOperator);
        display.textContent = result;
        secondOperator = operator;
        display.textContent = `${roundAccurately(result, 15).toString()}`;
        num1 = display.textContent
        result = null;
    } else { 
 
        firstOperator = operator;
        lastDisplay.textContent = firstOperator;
    }
}

function inputEquals() {
    if(firstOperator === null) {
        display.textContent = display.textContent
    } else if(secondOperator != null) {
        result = operate(Number(num1), Number(num2), secondOperator);
        display.textContent = result;
        num1 = display.textContent;
        if(result === 'lmao') {
            display.textContent = 'lmao';
        } else {
            display.textContent = `${roundAccurately(result, 15).toString()}`;
            num1 = display.textContent;
            num2 = '';
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        //handles first operation;
        result = operate(Number(num1), Number(num2), firstOperator);
        if(result === 'lmao') {
            display.textContent = 'lmao';
        } else {
            display.textContent = `${roundAccurately(result, 15).toString()}`;
            num1 = display.textContent;
            num2 = '';
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function inputDecimal(){
    let dot = ".";
    if (lastDisplay.textContent === num1 ) {
     num1 = lastDisplay.textContent + dot;
    } else if (lastDisplay.textContent === num2) {
      num2 = lastDisplay.textContent + dot;
    }else if(!lastDisplay.textContent.includes(dot)){
        lastDisplay.textContent+= dot;
    }
}

function inputPercent() {
    let num = lastDisplay.textContent;
    display.textContent = (num/100).toString();
}

function inputSign(num) {
    //let num = lastDisplay.textContent;
    lastDisplay.textContent= (num * -1).toString();
}

function clearDisplay() {
    lastDisplay.textContent = '';
    display.textContent = ''
    num1 = '';
    num2 = '';
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function inputBackspace() {
    if(num1 != null) {
        num1 = null;
        
    }
}

function operate(x, y, op) {
    if(op === '+') {
        return x + y;
    } else if(op === '-') {
        return x - y;
    } else if(op === '*') {
        return x * y;
    } else if(op === '/') {
        if(y === 0) {
            return 'lmao';
        } else {
        return x / y;
        }
    }
}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}