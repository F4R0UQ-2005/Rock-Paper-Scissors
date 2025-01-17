// Game Choices
const choices = ['✊', '✋', '✌'];

let playerScore = 0;
let cpuScore = 0;
let roundsPlayed = 0;
const maxRounds = 5;

// Compare player and CPU choices, update score
function compareChoices(playerChoice, cpuChoice) {
    const result = document.querySelector('.result'); 
    if (playerChoice === cpuChoice) {
        result.textContent = "It's a draw";
    } else if (
        (playerChoice === '✊' && cpuChoice === '✌') ||
        (playerChoice === '✋' && cpuChoice === '✊') ||
        (playerChoice === '✌' && cpuChoice === '✋')
    ) {
        playerScore++;
        result.textContent = 'You win this round';
    } else {
        cpuScore++;
        result.textContent = 'CPU wins this round';
    }
    roundsPlayed++;

    updateScores();
    if (roundsPlayed >= maxRounds) {
        endGame();
    }
}

// Get a random choice for CPU
function getCpuChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Update the score display
function updateScores() {
    document.querySelector('.player-score').textContent = `Player Score: ${playerScore}`;
    document.querySelector('.cpu-score').textContent = `CPU Score: ${cpuScore}`;
}

// End the game, display final result
function endGame() {
    const result = document.querySelector('.result');
    const finalResult = document.createElement('div');
    finalResult.textContent = playerScore > cpuScore ? 'Player wins the game!' : (playerScore < cpuScore ? 'CPU wins the game!' : 'Game is a draw!');
    result.append(finalResult);

    // Disable the buttons after the game ends
    document.querySelectorAll('.game-buttons').forEach(button => button.disabled = true);

    // Show reset button
    showResetButton();
}

// Show a button to reset the game
function showResetButton() {
    const resetButton = document.createElement('button');
    resetButton.textContent = "Play Again";
    resetButton.classList.add('resetBtn');
    resetButton.addEventListener('click', resetGame);
    
    const iconHolder = document.querySelector('.icon-holder');
    iconHolder.innerHTML = ''; // Clear any previous reset buttons and append the new one
    iconHolder.appendChild(resetButton);
}

// Reset the game
function resetGame() {
    playerScore = 0;
    cpuScore = 0;
    roundsPlayed = 0;

    // Reset the score display
    updateScores();

    // Clear the result text
    document.querySelector('.result').textContent = '';

    // Re-enable the buttons
    document.querySelectorAll('.game-buttons').forEach(button => button.disabled = false);

    // Clear the player and CPU icons
    document.querySelector('.cpu-option .header').textContent = '';
    document.querySelector('.player-option .header').textContent = '';
}

// Variables for the DOM
const buttonHolder = document.querySelector('.button-holder');
const cpuOption = document.querySelector('.cpu-option');
const playerOption = document.querySelector('.player-option');
const cpuIcon = document.createElement('div');
const playerIcon = document.createElement('div');
cpuIcon.setAttribute('class', 'header');
playerIcon.setAttribute('class', 'header');
cpuOption.appendChild(cpuIcon);
playerOption.appendChild(playerIcon);

// Event listener for button clicks
buttonHolder.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const playerChoice = event.target.getAttribute('data-choice');
        const cpuChoice = getCpuChoice();

        playerIcon.textContent = `Player: ${playerChoice}`;
        cpuIcon.textContent = `CPU: ${cpuChoice}`;

        compareChoices(playerChoice, cpuChoice);
    }
});
