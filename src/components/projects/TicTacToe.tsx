import { useEffect, useState } from "react";

type TicTacToeState = {
    board:string[];
    winner?:string;
}

export const TicTacToe = () => {
    const [state, setState] = useState<TicTacToeState>({board: [... Array(9).keys()].map(_ => "")});
    const currentPlayer = state.board.reduce((prev, current) => prev+(current.length ? 1 : 0), 0)%2 ? "X" : "O";
    
    useEffect(() => {
        const iterator = [...Array(state.board.length/3).keys()];
        const horiontal = iterator.map((row) => iterator.map((col) => col+(row*iterator.length)));
        const vertical = iterator.map((row) => iterator.map((_, i) => row+(i*iterator.length)))
        const diagonal = [iterator.map(i => (i*iterator.length)+i), iterator.map(i => ((i+iterator.length)-1)+Math.pow(i, 2))]

        for(let indexSet of [horiontal, vertical, diagonal])
        {
            if(state.winner) break;
            for(let subset of indexSet)
            {
                const matches = state.board.filter((s, i) => subset.includes(i));
                
                if(matches[0].length && matches.every(match => matches[0] == match))
                    setState({...state, winner: currentPlayer == "X" ? "O" : "X"})
            }
        }
    }, [state.board]);

    return (<div>
        {state.winner ? `${state.winner} wint!` : ""}
        {[...Array(state.board.length/3).keys()].map((row, rowIndex) => {
            return (
                <div className="row" key={rowIndex}>
                    {state.board.slice(rowIndex*3, (rowIndex*3)+3).map((col, colIndex) => {
                        return (
                                <span key={colIndex}
                                    className="col-3 border text-center p-2"
                                    onClick={!state.winner && !state.board[colIndex+(rowIndex*3)].length ? () => setState({...state, board: state.board.map((bv, bi) =>
                                        bi === colIndex+(rowIndex*3) ? currentPlayer : bv)
                                    }) : () => {}} 
                                >{col.length ? col : <>&nbsp;</>}</span>
                        )
                    })}
                </div>
            )
        })}
    </div>)
}