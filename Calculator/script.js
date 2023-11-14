let inputDisplay = document.getElementById('input-display');
let outputDisplay = document.getElementById('output-display');
let currentInput = '';
let history = [];
let isNewCalculation = true; // Variable to track new calculations

function appendToDisplay(value) {
    if (isNewCalculation) {
        clearDisplay();
        isNewCalculation = false;
    }
    currentInput += value;
    inputDisplay.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    inputDisplay.value = '';
    outputDisplay.value = '';
}

function calculateResult() {
    if (currentInput) {
        try {
            const result = eval(currentInput);
            inputDisplay.value = currentInput;
            outputDisplay.value = result;
            addToHistory(currentInput, result);
            isNewCalculation = true; // Set to new calculation
        } catch (error) {
            outputDisplay.value = 'Error';
        }
    }
}

function deleteLastValue() {
    currentInput = currentInput.slice(0, -1);
    inputDisplay.value = currentInput;
}

// ... (the rest of your JavaScript code) ...



function calculatePercentage() {
    if (currentInput) {
        const result = (eval(currentInput) / 100);
        inputDisplay.value = currentInput;
        outputDisplay.value = result;
        addToHistory(currentInput, result);
    }
}

function calculateSquareRoot() {
    if (currentInput) {
        const result = Math.sqrt(parseFloat(currentInput));
        inputDisplay.value = `√(${currentInput})`;
        outputDisplay.value = result;
        addToHistory(`√(${currentInput})`, result);
    }
}

function calculateCubeRoot() {
    if (currentInput) {
        const result = Math.cbrt(parseFloat(currentInput));
        inputDisplay.value = `³√(${currentInput})`;
        outputDisplay.value = result;
        addToHistory(`³√(${currentInput})`, result);
    }
}

function calculateSquare() {
    if (currentInput) {
        const result = Math.pow(parseFloat(currentInput), 2);
        inputDisplay.value = `(${currentInput})²`;
        outputDisplay.value = result;
        addToHistory(`(${currentInput})²`, result);
    }
}

function calculateCube() {
    if (currentInput) {
        const result = Math.pow(parseFloat(currentInput), 3);
        inputDisplay.value = `(${currentInput})³`;
        outputDisplay.value = result;
        addToHistory(`(${currentInput})³`, result);
    }

}

function addToHistory(input, output) {
    history.push({ input, output });
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('history-item');
        listItem.innerText = `${item.input} = ${item.output}`;
        historyList.appendChild(listItem);
    });
}

function clearHistory() {
    history = [];
    renderHistory();
}

function handleButtonPress(button) {
    if (button === 'Enter' || button === '=') {
        calculateResult();
    } else if (button === 'Escape' || button === 'C') {
        clearDisplay();
        isNewCalculation = true;
    } else if (button === 'Backspace' || button === 'Delete') {
        deleteLastValue();
    } else if (button === 'Percentage') {
        calculatePercentage();
    } else if (button === 'SquareRoot') {
        calculateSquareRoot();
    } else if (button === 'CubeRoot') {
        calculateCubeRoot();
    } else if (button === 'Square') {
        calculateSquare();
    } else if (button === 'Cube') {
        calculateCube();
    } else {
        appendToDisplay(button);
    }
}

function handleKeyboardInput(event) {
    const key = event.key;
    handleButtonPress(key);
}

document.addEventListener('keydown', handleKeyboardInput);
