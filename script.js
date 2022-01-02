/** @format */

let order = [];
let clickedOrder = [];
let score = 0;

const yellow = document.getElementsByClassName('yellow')[0];
const red = document.getElementsByClassName('red')[0];
const blue = document.getElementsByClassName('blue')[0];
const green = document.getElementsByClassName('green')[0];
const modal = document.getElementsByClassName('modal')[0];
const pontuacao = document.getElementsByClassName('pontuacao')[0];

const shuffleOrder = () => {
	let colorOrder = Math.floor(Math.random() * 4);
	order[order.length] = colorOrder; // mesmo que um push, esta adicionando a ultima posição
	clickedOrder = [];

	for (let i in order) {
		let elementColor = createColorElement(order[i]);
		lightColor(elementColor, Number(i) + 1);
	}
};

const lightColor = (element, number) => {
	number = number * 500;
	setTimeout(() => {
		element.classList.add('selected');
	}, number);

	setTimeout(() => {
		element.classList.remove('selected');
	}, number + 300);
};

const checkOrder = () => {
	for (let i in clickedOrder) {
		if (clickedOrder[i] != order[i]) {
			gameOver();
			break;
		}
	}

	if (clickedOrder.length == order.length) {
		setTimeout(() => {
			score++;
			onNext();
		}, 1000);
	}
};

let click = (color) => {
	clickedOrder[clickedOrder.length] = color;
	createColorElement(color).classList.add('selected');

	setTimeout(() => {
		createColorElement(color).classList.remove('selected');
		checkOrder();
	}, 250);
};

// criar funcao que retorna a cor

const createColorElement = (color) => {
	switch (color) {
		case 0:
			return green;
		case 1:
			return red;
		case 2:
			return yellow;
		case 3:
			return blue;
		default:
			break;
	}
};

// Funcao para proximo nivel do jogo
const nextLevel = () => {
	shuffleOrder();
};

const gameOver = () => {
	modalContent(
		`Pontuação: ${score} \n Você perdeu o jogo! \n Clique em Ok para iniciar um novo jogo <span id="playAgain" onclick="playGame()">Ok</span>`
	);
	order = [];
	shuffleOrder();
	score = 0;
};

function showPoints() {
	pontuacao.innerHTML = `Pontuação: ${score}`;
}

function onNext() {
	nextLevel(); // proxima fase
	closeModal(); // fechar modal
	showPoints();
}

let closeModal = () => {
	modal.innerHTML = '';
	modal.classList.remove('modal');
};

let playGame = () => {
	onNext();
	score = 0;
};

const modalContent = (content) => {
	modal.classList.add('modal');
	modal.innerHTML = content;
};

// Listeners
// **********************************************************************************

green.addEventListener('click', () => {
	click(0);
});
red.addEventListener('click', () => {
	click(1);
});
yellow.addEventListener('click', () => {
	click(2);
});
blue.addEventListener('click', () => {
	click(3);
});

// **********************************************************************************

window.onload = modalContent(
	'Welcome to Genesys! <span id="startButton" onclick="playGame()">Start Game</span>'
);
