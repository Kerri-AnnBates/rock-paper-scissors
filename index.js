const winnerMsg = document.querySelector('#winner-msg');
const playerScoreEl = document.querySelector('#player-score');
const computerScoreEl = document.querySelector('#computer-score');
const newGameBtn = document.querySelector('#new-game');
const playerPicksEl = document.querySelectorAll('#player-play .picks');

let playerPick = '';
let computerPick = '';
let pScore = 0;
let compScore = 0;
let rounds = 5;
let isPlaying = true;

const playGame = (e) => {
	playerPick = e.target.dataset.pick;

	computerPick = getComputerPick();
	let score = scoreLogic(playerPick, computerPick);
	pScore = score.playerScore;
	compScore = score.computerScore;
	isPlaying = checkGameOver(rounds, pScore, compScore);

	showWinnerStatus(score.winner, e);
	displayScores(pScore, compScore);

	if (!isPlaying) {
		playerPicksEl.forEach(pick => {
			pick.removeEventListener('click', playGame);
		});
	}
}

// Generate random number for computer pick
const getComputerPick = () => {
	const picksSetup = ['rock', 'paper', 'scissors'];
	const randomPick = Math.floor(Math.random() * (3 - 0)) + 0;
	return picksSetup[randomPick];
}

const scoreLogic = (playerPick, compPick) => {
	let isWinner = null;

	switch (playerPick) {
		case 'rock':
			if (compPick === 'scissors') {
				winnerMsg.textContent = 'Rock beats Scissors. You Win!';
				isWinner = 1;
				pScore += 1;

			} else if (compPick === 'rock') {
				winnerMsg.textContent = 'Both chose Rock. It\'s a tie!';
				isWinner = 3;

			} else {
				winnerMsg.textContent = 'Paper beats Scissors. You Lose!';
				isWinner = 0;
				compScore += 1;
			}
			break;
		case 'scissors':
			if (compPick === 'paper') {
				winnerMsg.textContent = 'Scissors beats Paper. You Win!';
				isWinner = 1;
				pScore += 1;

			} else if (compPick === 'scissors') {
				winnerMsg.textContent = 'Both chose Scissors. It\'s a tie!';
				isWinner = 3;

			} else {
				winnerMsg.textContent = 'Rock beats Scissors. You Lose!';
				isWinner = 0;
				compScore += 1;
			}
			break;
		case 'paper':
			if (compPick === 'rock') {
				winnerMsg.textContent = 'Paper beats Rock. You Win!';
				isWinner = 1;
				pScore += 1;

			} else if (compPick === 'paper') {
				isWinner = 3;
				winnerMsg.textContent = 'Both chose Paper. It\'s a tie!';

			} else {
				winnerMsg.textContent = 'Scissors beats Paper. You Lose!';
				isWinner = 0;
				compScore += 1;
			}
			break;
		default:
			winnerMsg.textContent = '';
			compScore = 0;
			pScore = 0;
			isWinner = undefined;
	}

	return { winner: isWinner, playerScore: pScore, computerScore: compScore };
}

// Display winner and loser by changing colors.
const showWinnerStatus = (isWinner, event) => {
	const allborders = document.querySelectorAll('.picks img');

	allborders.forEach(pick => {
		pick.classList.remove('win');
		pick.classList.remove('lose');
		pick.classList.remove('tie');
	});

	if (isWinner === 1) {
		event.target.classList.add('win');
	} else if (isWinner === 0) {
		event.target.classList.add('lose');
	} else if (isWinner === 3) {
		event.target.classList.add('tie');
	}
}

// Display score
const displayScores = (plScore, cScore) => {
	playerScoreEl.textContent = plScore;
	computerScoreEl.textContent = cScore;
}

// Get game winner
const checkGameOver = (roundWinner, player, computer) => {
	let gameStatus = document.querySelector('#game-status');
	const gameOverMsg = document.querySelector('.game-over');

	if (player === roundWinner || computer === roundWinner) {
		if (player === roundWinner) {
			gameOverMsg.classList.add('show-message');
			gameStatus.textContent = 'Congratulations, you win!';
		} else if (computer === roundWinner) {
			gameOverMsg.classList.add('show-message');
			gameStatus.textContent = 'Sorry, you lose!';
		}

		return false;
	}

	return true;
}

playerPicksEl.forEach(pick => {
	pick.addEventListener('click', playGame);
});

// Start a new game
newGameBtn.addEventListener("click", () => {
	const allborders = document.querySelectorAll('.picks img');
	const gameOverMsg = document.querySelector('.game-over');

	allborders.forEach(pick => {
		pick.classList.remove('win');
		pick.classList.remove('lose');
	});

	gameOverMsg.classList.remove('show-message');

	playerPick = "";
	compPick = "";

	let score = scoreLogic(playerPick, compPick);
	pScore = score.playerScore;
	compScore = score.computerScore;

	displayScores(pScore, compScore);
	checkGameOver(rounds, pScore, compScore)

	playerPicksEl.forEach(pick => {
		pick.addEventListener('click', playGame);
	});
});