let square = {
    a1: '',
    a2: '',
    a3: '',

    b1: '',
    b2: '',
    b3: '',

    c1: '',
    c2: '',
    c3: '',
};

let player = '';
let warning = '';
let playing = false;
let score = {
    x: 0,
    o: 0
};
let currentPlayer = 'x';
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});
reset();
function reset () {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    currentPlayer = (random === 0) ? 'x' : 'o';
    player = currentPlayer;

    for (let i in square) {
        square[i] = '';
    }
    clearBoardStyle();
    renderSquare();
    renderInfo();
    updateScore();
    updateCurrentPlayer();

    playing = true;
}
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && square[item] === '') {
        square[item] = currentPlayer;
        renderSquare();
        tooglePlayer();
    }
}
function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
        item.classList.remove('x', 'o');

        if(square[i] === 'x') {
            item.classList.add('x');
        } else if (square[i] === 'o') {
            item.classList.add('o');
        }
    }

    checkGame();
}
function renderInfo() {
    
    document.querySelector('.resultado').innerHTML = warning;
}
function tooglePlayer(){
    currentPlayer = (currentPlayer === 'x') ? 'o' : 'x';
    renderInfo();
    updateCurrentPlayer();
}
function checkGame() {
    if (checkWinnerFor('x')) {
        warning = 'O "x" foi o vencedor!';
        score.x++; 
        playing = false;
        applyWinnerStyle('x');
    } else if (checkWinnerFor('o')) {
        warning = 'O "o" foi o vencedor!';
        score.o++; 
        playing = false;
        applyWinnerStyle('o');
    } else if (isFull()) {
        warning = 'Vocês empataram!';
        playing = false;
    }
    updateScore(); 
}
function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ];

    for(let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => square[option] === player);
        if(hasWon) {
            return true;
        }
    } 

    return false;
}
function applyWinnerStyle(player) {
    let pos = [
      
      ['a1', 'a2', 'a3'],
      ['b1', 'b2', 'b3'],
      ['c1', 'c2', 'c3'],
      
      ['a1', 'b1', 'c1'],
      ['a2', 'b2', 'c2'],
      ['a3', 'b3', 'c3'],
    
      ['a1', 'b2', 'c3'],
      ['a3', 'b2', 'c1'],
    ];
  
    for (let w in pos) {
      let pArray = pos[w];
      let hasWon = pArray.every((option) => square[option] === player);
      if (hasWon) {
        pArray.forEach((option) => {
          let item = document.querySelector(`div[data-item=${option}]`);
          item.classList.add('winner'); 
        });
        break;
      }
    }
}  
function clearBoardStyle() {
    const cells = document.querySelectorAll('.item');
    cells.forEach((cell) => {
      cell.classList.remove('winner');
    });
  }
function isFull() {
    for( let i in square) {
        if(square[i] === '') {
            return false;
        }
    }

    return true;
}
function updateScore() {
    const scoreElement = document.querySelector('.placar');
    scoreElement.textContent = `${score.x} - ${score.o}`;
}
function updateCurrentPlayer() {
    const currentPlayerElement = document.querySelector('.jogador');
    currentPlayerElement.textContent = currentPlayer;
}