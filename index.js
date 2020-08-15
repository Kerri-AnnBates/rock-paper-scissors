const winnerMsg = document.querySelector('#winner-msg');
const playerScoreEl = document.querySelector('#player-score');
const computerScoreEl = document.querySelector('#computer-score');
const playerPicksEl = document.querySelectorAll('#player-play .picks');

let playerPick = '';
let computerPick = '';
let pScore = 0;
let compScore = 0;
let rounds = 5;

playerPicksEl.forEach(pick => {
	pick.addEventListener('click', (e) => {
		playerPick = e.target.dataset.pick;

		getComputerPick();
		let score = scoreLogic(playerPick, computerPick);
		pScore = score.playerScore;
		compScore = score.computerScore;

		showWinnerStatus(score.winner, e);
		displayScores(pScore, compScore);
		checkGameOver(rounds, pScore, compScore);
	});

});
// Generate random number for computer pick
const getComputerPick = () => {
	const picksSetup = ['rock', 'paper', 'scissors'];
	const randomPick = Math.floor(Math.random() * (3 - 0)) + 0;
	computerPick = picksSetup[randomPick];
}

const scoreLogic = (playerPick, compPick) => {
	let isWinner = null;

	switch (playerPick) {
		case 'rock':
			if (compPick === 'scissors') {
				winnerMsg.textContent = 'Rock beats Scissors. You Win!';
				isWinner = true;
				pScore += 1;

			} else if (compPick === 'rock') {
				winnerMsg.textContent = 'Both chose Rock. It\'s a tie!';

			} else {
				winnerMsg.textContent = 'Paper beats Scissors. You Lose!';
				isWinner = false;
				compScore += 1;
			}
			break;
		case 'scissors':
			if (compPick === 'paper') {
				winnerMsg.textContent = 'Scissors beats Paper. You Win!';
				isWinner = true;
				pScore += 1;

			} else if (compPick === 'scissors') {
				winnerMsg.textContent = 'Both chose Scissors. It\'s a tie!';

			} else {
				winnerMsg.textContent = 'Rock beats Scissors. You Lose!';
				isWinner = false;
				compScore += 1;
			}
			break;
		case 'paper':
			if (compPick === 'rock') {
				winnerMsg.textContent = 'Paper beats Rock. You Win!';
				isWinner = true;
				pScore += 1;

			} else if (compPick === 'paper') {
				winnerMsg.textContent = 'Both chose Paper. It\'s a tie!';

			} else {
				winnerMsg.textContent = 'Scissors beats Paper. You Lose!';
				isWinner = false;
				compScore += 1;
			}
			break;
	}

	return { winner: isWinner, playerScore: pScore, computerScore: compScore };
}

// Display winner and loser by changing colors.
const showWinnerStatus = (isWinner, event) => {
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

// Display score
const displayScores = (plScore, cScore) => {
	playerScoreEl.textContent = plScore;
	computerScoreEl.textContent = cScore;
}

// Get game winner
const checkGameOver = (roundWinner, player, computer) => {
	if (player === roundWinner) {
		alert("Congratulations, you win!");
	} else if (computer === roundWinner) {
		alert("Sorry, you lose!");
	}
}