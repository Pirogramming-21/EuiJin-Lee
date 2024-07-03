let secretNumbers = [];
let attempts = 9;
let gameOver = false;

function generateSecretNumbers() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const secret = [];
    for (let i = 0; i < 3; i++) {
        const index = Math.floor(Math.random() * numbers.length);
        secret.push(numbers[index]);
        numbers.splice(index, 1);
    }
    return secret;
}

function initializeGame() {
    secretNumbers = generateSecretNumbers();
    attempts = 9;
    gameOver = false;
    clearInputs();
    clearResults();
    document.querySelector('.submit-button').disabled = false;
    document.getElementById('game-result-img').src = '';
}



function clearInputs() {
    document.querySelectorAll('.input-field').forEach(input => input.value = '');
}

function clearResults() {
    document.querySelector('.result-display').innerHTML = '';
}

function check_numbers() {
    if (gameOver) return;

    const inputs = document.querySelectorAll('.input-field');
    const guessedNumbers = Array.from(inputs).map(input => parseInt(input.value));

    if (guessedNumbers.some(isNaN)) {
        clearInputs();
        return;
    }

    const result = checkGuess(guessedNumbers);
    displayResult(guessedNumbers, result);
    clearInputs();

    attempts--;

    if (result.strikes === 3) {
        endGame(true);
    } else if (attempts === 0) {
        endGame(false);
    }
}

function checkGuess(guessedNumbers) {
    let strikes = 0;
    let balls = 0;

    for (let i = 0; i < 3; i++) {
        if (guessedNumbers[i] === secretNumbers[i]) {
            strikes++;
        } else if (secretNumbers.includes(guessedNumbers[i])) {
            balls++;
        }
    }

    return { strikes, balls };
}

function displayResult(guessedNumbers, result) {
    const resultDisplay = document.querySelector('.result-display');
    const resultDiv = document.createElement('div');
    resultDiv.className = 'check-result';

    const leftDiv = document.createElement('div');
    leftDiv.className = 'left';
    leftDiv.textContent = guessedNumbers.join(' ');

    const rightDiv = document.createElement('div');
    rightDiv.className = 'right';

    if (result.strikes === 0 && result.balls === 0) {
        const outDiv = document.createElement('div');
        outDiv.className = 'out num-result';
        outDiv.textContent = 'O';
        rightDiv.appendChild(outDiv);
    } else {
        rightDiv.innerHTML = `
            ${result.strikes} <div class="strike num-result">S</div>
            ${result.balls} <div class="ball num-result">B</div>
        `;
    }

    resultDiv.appendChild(leftDiv);
    resultDiv.appendChild(document.createTextNode(':'));
    resultDiv.appendChild(rightDiv);

    resultDisplay.appendChild(resultDiv);
}

function endGame(isWin) {
    gameOver = true;
    document.querySelector('.submit-button').disabled = true;
    const resultImg = document.getElementById('game-result-img');
    resultImg.src = isWin ? 'success.png' : 'fail.png';
}

window.onload = initializeGame;