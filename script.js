
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; // = width / 3;
let h; // = height / 3;

let ai = 'X';
let human = 'O';
let currentPlayer = human;

function createStyle(css) {
  let style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  return style;
}

function setup() {
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
  bestMove();

  let css = createStyle(`
    body {
      height: 100vh;
      margin: 0;
      position: relative;
      padding: 0;
      background-image: url('./background.jpg');
      background-size: cover;
      background-repeat: no-repeat;
    }
    .p5Canvas {
      position: absolute;
      top: 150px;
      right: 180px;
      box-shadow: 10px 10px 50px black;
    }
  `);
  css.appendChild(document.createTextNode(css));
  document.head.appendChild(css);

  let textDiv = document.createElement('div');
  textDiv.style.position = 'absolute';
  textDiv.style.textAlign = 'center';
  textDiv.style.color = 'white';
  textDiv.style.fontSize = '35px';
  textDiv.style.fontFamily = 'Orbitron';
  textDiv.style.width = '400px';
  textDiv.style.top = '90px'; 
  textDiv.style.right = '180px';
  textDiv.innerHTML = 'TIC-TAC-TOE Game';
  document.body.appendChild(textDiv);

  let typed = new Typed(textDiv, {
    strings: [textDiv.innerText],
    backSpeed: 140,
    loop: true
  });
  background('rgba(255, 255, 255, 0.1)');
}


function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed() {
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == '') {
      board[i][j] = human;
      currentPlayer = ai;
      bestMove();
    }
  }
}

function draw() {
  strokeWeight(4);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-family', 'Orbitron');
    resultP.style('font-size', '32pt');
    resultP.style('position', 'absolute');
    resultP.style('bottom', '50px');
    resultP.style('right', '310px');
    resultP.style('z-index', '1');
    resultP.style('color', 'white');
    if (result == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}