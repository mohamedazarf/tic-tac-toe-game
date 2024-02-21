import { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';
function handleGagnerClick() {
  axios.get('http://localhost:3000/gagner') // Appeler la route '/gagner'
    .then(response => {
      console.log(response.data); // Afficher la réponse dans la console
      // Vous pouvez effectuer d'autres actions si nécessaire
    })
    .catch(error => {
      console.error('Erreur lors de la requête GET vers /gagner : ', error);
    });
}
function handleWinClick(winner) {
  axios.get('http://localhost:3000/win', {
    params: {
      winner: winner // Envoyer le gagnant au backend
    }
  })
  .then(response => {
    console.log(response.data); // Afficher la réponse dans la console
    // Vous pouvez effectuer d'autres actions si nécessaire
  })
  .catch(error => {
    console.error('Erreur lors de la requête GET vers /gagner : ', error);
  });
}
function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner=calculateWinner(squares);
  let status;
  if(winner){
    handleGagnerClick();
    handleWinClick(winner);
    status="winner "+winner;
    setTimeout(() => {
      setSquares(Array(9).fill(null));
      setXIsNext(true);
    }, 5000);
  }
  else{
    status= "Next player: " + (xIsNext ? "X" : "O");
  }
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
    nextSquares[i] = "X";
    }else{
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
    <div>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
    </>
  );
}
