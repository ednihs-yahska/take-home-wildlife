import React, { useEffect, useState } from "react";

const Controls = ({handleFlip, handleLeftDrag, handleRightDrag})=>{
    return (
        <div className="flex absolute controls">
            <div onClick={handleLeftDrag} className="flex control m-2 p-2 text-white">Incorrect</div>
            <div onClick={handleFlip} className="flex control m-2 p-2 text-white">Flip</div>
            <div onClick={handleRightDrag} className="flex control m-2 p-2 text-white">Correct</div>
        </div>
    )
}

export default Controls