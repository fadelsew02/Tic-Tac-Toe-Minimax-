
function bestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == '') {
        board[i][j] = ai;
        let score = minimax(board, 0, false);
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

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

function minimax(board, depth, isMaximizing) {
  // Affiche les informations de l'évaluation actuelle pour le débogage
/*  console.log(" ".repeat(depth) + `Évaluation de la profondeur ${depth}, isMax=${isMaximizing}`); */
  
  // Vérifie si le jeu est terminé
  let result = checkWinner();
  if(result !== null) {
    //console.log(" ".repeat(depth) + `Fin du jeu avec le résultat ${result}`);
    return scores[result];  
  }

  if (isMaximizing) {
    // Initialise le meilleur score pour les nœuds MAX
    let bestScore = -Infinity;
    
    //console.log(" ".repeat(depth) + "Exploration des nœuds MAX");

    // Parcours les positions du tableau
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        // Vérifie si la case est disponible
        if(board[i][j] === "") {
          // Effectue le mouvement pour l'IA
          board[i][j] = ai;
          
          // Affiche les informations sur l'évaluation du mouvement actuel
          //console.log(" ".repeat(depth) + `Évaluation du mouvement ${i},${j}`);

          // Appelle récursivement minimax pour évaluer le mouvement
          let score = minimax(board, depth + 1, false)
          
          // Affiche le score du mouvement actuel
          //console.log(" ".repeat(depth) + `Le mouvement ${i},${j} donne un score de ${score}`);

          // Annule le mouvement pour revenir à l'état précédent
          board[i][j] = "";
          
          // Met à jour le meilleur score pour les nœuds MAX
          bestScore = Math.max(score, bestScore); 
        }
      } 
    }
    return bestScore;

  } else {
    // Initialise le meilleur score pour les nœuds MIN
    let bestScore = Infinity;
    
    //console.log(" ".repeat(depth) + "Exploration des nœuds MIN");

    // Parcours les positions du tableau
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        // Vérifie si la case est disponible
        if(board[i][j] === "") {
          // Effectue le mouvement pour le joueur humain
          board[i][j] = human;

          // Affiche les informations sur l'évaluation du mouvement actuel
         // console.log(" ".repeat(depth) + `Évaluation du mouvement ${i},${j}`);
          
          // Appelle récursivement minimax pour évaluer le mouvement
          let score = minimax(board, depth + 1, true);

          // Affiche le score du mouvement actuel
         // console.log(" ".repeat(depth) + `Le mouvement ${i},${j} donne un score de ${score}`);
          
          // Annule le mouvement pour revenir à l'état précédent
          board[i][j] = "";
          
          // Met à jour le meilleur score pour les nœuds MIN
          bestScore = Math.min(score, bestScore);  
        }
      } 
    }
    return bestScore; 
  }
}
