const winnerMsg = document.querySelector('#winner-msg');
const player1Score = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');
const playerPicks = document.querySelectorAll('#player-play .picks');

let playerPick = '';
let computerPick = '';

playerPicks.forEach(pick => {
    
    pick.addEventListener('click', (e) => {
        playerPick = e.target.dataset.pick;
        // console.log('Player: ' + playerPick);
        getComputerPick();
        let winner = scoreLogic(playerPick, computerPick);

        showWinnerStatus(winner, e);
    });

});

// Generate random number for computer pick
function getComputerPick() {
    const picksSetup = ['rock', 'paper', 'scissors'];
    const randomPick = Math.floor(Math.random() * (3 - 0)) + 0;
    computerPick = picksSetup[randomPick];
    // console.log('Computer: ' + computerPick);
}

function scoreLogic(playerPick, compPick) {
    let isWinner = null;

    switch (playerPick){
        case 'rock':
            if(compPick === 'scissors') {
                winnerMsg.textContent = 'Rock beats Scissors. You Win!';
                isWinner = true;
            } else if(compPick === 'rock') {
                winnerMsg.textContent = 'Both chose Rock. It\'s a tie!';
            } else {
                winnerMsg.textContent = 'Paper beats Scissors. You Lose!';
                isWinner = false;
            }
            break;
        case 'scissors':
            if (compPick === 'paper') {
                winnerMsg.textContent = 'Scissors beats Paper. You Win!';
                isWinner = true;
            } else if (compPick === 'scissors') {
                winnerMsg.textContent = 'Both chose Scissors. It\'s a tie!';
            } else {
                winnerMsg.textContent = 'Rock beats Scissors. You Lose!';
                isWinner = false;
            }
            break;
        case 'paper':
            if (compPick === 'rock') {
                winnerMsg.textContent = 'Paper beats Rock. You Win!';
                isWinner = true;
            } else if (compPick === 'paper') {
                winnerMsg.textContent = 'Both chose Paper. It\'s a tie!';
            } else {
                winnerMsg.textContent = 'Scissors beats Paper. You Lose!';
                isWinner = false;
            }
            break;
    }

    return isWinner;
}

function showWinnerStatus(isWinner, event) {
    const allborders = document.querySelectorAll('.picks img');

    allborders.forEach(pick => {
        pick.classList.remove('win');
        pick.classList.remove('lose');
    });

    if (isWinner) {
        event.target.classList.add('win');
    } 
    if (isWinner === false) {
        event.target.classList.add('lose');
    }
}