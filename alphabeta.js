function bestMoveAlphaBeta() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        board[i][j] = ai;
        let score = alphaBetaPruning(board, 0, -Infinity, Infinity, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
}

function alphaBetaPruning(board, depth, alpha, beta, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = alphaBetaPruning(board, depth + 1, alpha, beta, false);
          board[i][j] = '';
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, bestScore);
          if (beta <= alpha) {
            break; // Élagage Alpha
          }
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          board[i][j] = human;
          let score = alphaBetaPruning(board, depth + 1, alpha, beta, true);
          board[i][j] = '';
          bestScore = Math.min(score, bestScore);
          beta = Math.min(beta, bestScore);
          if (beta <= alpha) {
            break; // Élagage Bêta
          }
        }
      }
    }
    return bestScore;
  }
}
