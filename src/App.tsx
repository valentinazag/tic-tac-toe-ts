import { useState } from "react";
import "./App.css";

const WINNING_LINES: number[][] = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

type Move = "X" | "O";
type Square = Move | null;

function getWinner(squares: Square[]) {
	for (let i = 0; i < WINNING_LINES.length; i++) {
		const [a, b, c] = WINNING_LINES[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
//I do this because every component that recienve prps those ned to have a type
type SquareProps = {
	clickSquare: () => void; //empty function
	value: Square; // "X" | "O"
};

function Square({ clickSquare, value }: SquareProps) {
	return (
		<button type="button" className="square" onClick={clickSquare}>
			{value}
		</button>
	);
}

function Board() {
	const [xIsNext, setxIsNext] = useState<boolean>(true);
	const [squares, setSquares] = useState<Square[]>(new Array(9).fill(null));

	function handleClick(i: number) {
		if (getWinner(squares) || squares[i]) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}
		setSquares(nextSquares);
		setxIsNext(!xIsNext);
	}

	const winner = getWinner(squares);
	let status: string;
	if (winner) {
		status = `the winner is ${winner}`;
	} else {
		status = `turn of ${xIsNext ? "X" : "O"}`;
	}

	function composeRows(squares: Square[]) {
		const SIZE = 3;
		const slices: Square[][] = [
			squares.slice(0, SIZE),
			squares.slice(SIZE, 2 * SIZE),
			squares.slice(2 * SIZE, 3 * SIZE),
		];
		return slices;
	}

	const rows = composeRows(squares);

	return (
		<div className="rows">
			{rows.map((row, rowInd) => {
				const key = `square${rowInd}`;
				return (
					<div key={key}>
						{row.map((_, column) => {
							const square = rowInd * 3 + column;
							return (
								<Square
									key={square}
									value={squares[square]}
									clickSquare={() => handleClick(square)}
								/>
							);
						})}
					</div>
				);
			})}
			{status}
		</div>
	);
}

export function App() {
	return (
		<div>
			<Board />
		</div>
	);
}

export default App;
