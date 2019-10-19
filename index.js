const winnerMsg = document.querySelector('#winner-msg');
const player1Score = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');
const playerPicks = document.querySelectorAll('#player-play .picks');
let playerPick = '';

const picksSetup = ['rock', 'paper', 'scissors'];

playerPicks.forEach(pick => {
    pick.addEventListener('click', (e) => {
        playerPick = e.target.dataset.pick;
        console.log(playerPick);
        computerPick();
    });
});

function computerPick() {
    const randomPick = Math.floor(Math.random() * (3 - 0)) + 0;
    // console.log(randomPick);
    console.log(picksSetup[randomPick]);
}