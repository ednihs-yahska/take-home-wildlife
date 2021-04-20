import React, { useEffect, useState } from "react";
import CardFace from "./cardface"
import { numberOfFakeCards, touchTimeThreshold} from "../utilities/constants"

const tryFlip = (e, stacked, flippedOnce, setFlippedOnce, mouseDownStart, setMouseDownStart, flipped, setFlipped)=>{
    if (stacked) return
    const time = new Date().getTime()
    const timeDiff = time - mouseDownStart
    if (timeDiff < touchTimeThreshold) {
        setFlipped(!flipped)
        if (!flippedOnce) {
            setFlippedOnce(true)
        }
        setMouseDownStart(null)
    }
    e.preventDefault()
    e.stopPropagation()
}

const onTouchDown = (e, setMouseDownStart)=>{
    setMouseDownStart(new Date().getTime())
    e.stopPropagation()
    e.preventDefault()
}

const onTouchUp = (e, stacked, flippedOnce, setFlippedOnce, mouseDownStart, setMouseDownStart, flipped, setFlipped)=>{
    tryFlip(e, stacked, flippedOnce, setFlippedOnce, mouseDownStart, setMouseDownStart, flipped, setFlipped)
    e.stopPropagation()
    e.preventDefault()
}


const Flashcard = ({card, styles, classes,  stacked=false}) => {
    const [mouseDownStart, setMouseDownStart] = useState(null)
    const [flippedOnce, setFlippedOnce] = useState(false)
    const [flipped, setFlipped] = useState(false)

    return (
        <div style={styles} className={`${classes} card-container ${stacked && "stack-card"}`}
            onMouseDown={(e)=>{
                onTouchDown(e, setMouseDownStart)
            }}
            onTouchStart={(e)=>{
                onTouchDown(e, setMouseDownStart)
            }}
            onMouseUp={(e)=>{
                onTouchUp(e, stacked, flippedOnce, setFlippedOnce, mouseDownStart, setMouseDownStart, flipped, setFlipped)
            }}
            onTouchEnd={(e)=>{
                onTouchUp(e, stacked, flippedOnce, setFlippedOnce, mouseDownStart, setMouseDownStart, flipped, setFlipped)
            }}
        >
            <div className={`card rounded-sm border border-thick border-white ${(!stacked && flipped) && "flipped"} ${(!stacked && !flipped && !flippedOnce) && "face-down"} ${(!stacked && !flipped && flippedOnce) && "unflipped"}`}>
                <div className={`front bg-almond card-image-side`}>
                    {
                        card &&
                        <CardFace type="front" cardData={card} />
                    }
                </div>
                <div className={`back bg-almond`}>
                    {
                        card &&
                        <CardFace type="back" cardData={card} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Flashcard