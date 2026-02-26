import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, onClick, status }) {
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => onClick(0)} />
        <Square value={squares[1]} onSquareClick={() => onClick(1)} />
        <Square value={squares[2]} onSquareClick={() => onClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => onClick(3)} />
        <Square value={squares[4]} onSquareClick={() => onClick(4)} />
        <Square value={squares[5]} onSquareClick={() => onClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => onClick(6)} />
        <Square value={squares[7]} onSquareClick={() => onClick(7)} />
        <Square value={squares[8]} onSquareClick={() => onClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      xMoves: [],
      oMoves: [],
    },
  ]);

  const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handleClick(i) {
    if (current.squares[i]) return;

    const nextSquares = current.squares.slice();
    let xMoves = [...current.xMoves];
    let oMoves = [...current.oMoves];

    const currentPlayer = xIsNext ? "X" : "O";

    if (currentPlayer === "X") {
      xMoves.push(i);

      if (xMoves.length > 3) {
        const removed = xMoves.shift();
        nextSquares[removed] = null;
      }
    } else {
      oMoves.push(i);

      if (oMoves.length > 3) {
        const removed = oMoves.shift();
        nextSquares[removed] = null;
      }
    }

    nextSquares[i] = currentPlayer;

    const nextHistory = history.slice(0, currentMove + 1);
    setHistory([
      ...nextHistory,
      {
        squares: nextSquares,
        xMoves,
        oMoves,
      },
    ]);

    setCurrentMove(nextHistory.length);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const moves = history.map((step, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
          status={status}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
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
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
