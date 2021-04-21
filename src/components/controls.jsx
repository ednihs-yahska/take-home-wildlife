import React, { useEffect, useState } from "react";

const Controls = ({correct, incorrect, drag1, drag2, tictac, handleFlip, handleLeftDrag, handleRightDrag})=>{
    const [left, setLeft] = useState(34)
    const [right, setRight] = useState(34)

    useEffect(()=>{
        if (tictac) {
            if (drag1 < 0) {
                setLeft(Math.abs(drag1))
                setRight(34)
            } else if(drag1 > 0) {
                setLeft(34)
                setRight(Math.abs(drag1))
            } else {
                setLeft(34)
                setRight(34)
            }
        } else {
            if (drag2 < 0) {
                setRight(34)
                setLeft(Math.abs(drag2))
            } else if(drag2 > 0) {
                setLeft(34)
                setRight(Math.abs(drag2))
            } else {
                setLeft(34)
                setRight(34)
            }
        }
    }, [drag1, drag2, tictac])
    return (
        <div className="flex absolute controls md-w-11-12 md-mx-auto">
            <div style={{background: `rgb(${left}, 34, 34)`}} onClick={handleLeftDrag} className="flex control m-2 p-2 text-white">
                Incorrect: <span className="m-2">{incorrect}</span>
            </div>
            <div onClick={handleFlip} className="flex control m-2 p-2 text-white">Flip</div>
            <div style={{background: `rgb(34, ${right}, 34)`}} onClick={handleRightDrag} className="flex control m-2 p-2 text-white">
                Correct: <span className="m-2">{correct}</span>
            </div>
        </div>
    )
}

export default Controls