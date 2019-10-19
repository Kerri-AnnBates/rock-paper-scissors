const winnerMsg = document.querySelector('#winner-msg');
const player1Score = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');
const playerPicks = document.querySelectorAll('#player-play .picks');
let playerPick = '';
let computerPick = '';

playerPicks.forEach(pick => {
    pick.addEventListener('click', (e) => {
        playerPick = e.target.dataset.pick;
        console.log('Player: ' + playerPick);
        getComputerPick();
        scoreLogic(playerPick, computerPick);
    });
});

// Generate random number for computer pick
function getComputerPick() {
    const picksSetup = ['rock', 'paper', 'scissors'];
    const randomPick = Math.floor(Math.random() * (3 - 0)) + 0;
    computerPick = picksSetup[randomPick];
    console.log('Computer: ' + computerPick);
}

function scoreLogic(playerPick, compPick) {
    let message = '';

    switch (playerPick){
        case 'rock':
            if(compPick === 'scissors') {
                console.log('you win!');
                winnerMsg.textContent = 'Rock beats Scissors. You Win!';
            } else if(compPick === 'rock') {
                console.log('tie');
                winnerMsg.textContent = 'Both chose Rock. It\'s a tie!';
            } else {
                console.log('you lose');
                winnerMsg.textContent = 'Paper beats Scissors. You Lose!';
            }
            break;
        case 'scissors':
            if (compPick === 'paper') {
                console.log('you win!');
                winnerMsg.textContent = 'Scissors beats Paper. You Win!';
            } else if (compPick === 'scissors') {
                console.log('tie');
                winnerMsg.textContent = 'Both chose Scissors. It\'s a tie!';
            } else {
                console.log('you lose');
                winnerMsg.textContent = 'Rock beats Scissors. You Lose!';
            }
            break;
        case 'paper':
            if (compPick === 'rock') {
                console.log('you win!');
                winnerMsg.textContent = 'Paper beats Rock. You Win!';
            } else if (compPick === 'paper') {
                console.log('tie');
                winnerMsg.textContent = 'Both chose Paper. It\'s a tie!';
            } else {
                console.log('you lose');
                winnerMsg.textContent = 'Scissors beats Paper. You Lose!';
            }
            break;
    }
}