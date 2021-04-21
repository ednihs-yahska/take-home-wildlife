import React, { useEffect, useState } from "react";
import CardFace from "./cardface"
import { numberOfFakeCards, touchTimeThreshold} from "../utilities/constants"
import {DragDirectionContext} from "../contexts"

const getTouchX = (e) => {
    let touchX = e.pageX || e.clientX;
    if (!touchX) {
        touchX = e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : 0
    }
    return touchX
}

const getTouchY = (e) => {
    let touchY = e.pageY || e.clientY;
    if (!touchY) {
        touchY = e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientY : 0
    }
    return touchY
}

const startDragging = (e, dragDirection, setDragging, setDragStartX, setMouseDownStart)=>{
    setDragging(true); 
    const touch = dragDirection.dragX ? getTouchX(e) : getTouchY(e)
    setDragStartX(touch); 
    setMouseDownStart(new Date().getTime())
    e.preventDefault()
    e.stopPropagation()
}
const stopDragging = (e, clearDrag, setDragging, mouseDownStart, setFlippedOnce, setFlipped)=>{
    setDragging(false); 
    const time = new Date().getTime()
    const timeDiff = time - mouseDownStart
    if (timeDiff > touchTimeThreshold) {
        clearDrag(()=>{
            setFlippedOnce(false)
            setFlipped(false)
        });   
    }
    e.preventDefault()
    e.stopPropagation()
}
const onDragging = (e, dragging, dragDirection, onDrag, stacked)=>{
    if (dragging && !stacked) {
        const touch = dragDirection.dragX ? getTouchX(e) : getTouchY(e)
        onDrag(e, touch)
    }
    e.preventDefault()
    e.stopPropagation()
}
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

const Flashcard = ({card, styles, classes, onDrag, clearDrag, flipped, setFlipped, stacked=false}) => {
    const [mouseDownStart, setMouseDownStart] = useState(null)
    const [flippedOnce, setFlippedOnce] = useState(false)
    // const [flipped, setFlipped] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [dragStartX, setDragStartX] = useState(null)

    return (
        <DragDirectionContext.Consumer>
        {(dragDirection) => (
                <div style={styles} className={`${classes} card-container ${stacked && "stack-card"}`}
                onMouseDown={(e)=>{
                    startDragging(e, dragDirection, setDragging, setDragStartX, setMouseDownStart)
                    onTouchDown(e, setMouseDownStart)
                }}
                onTouchStart={(e)=>{
                    startDragging(e, dragDirection, setDragging, setDragStartX, setMouseDownStart)
                    onTouchDown(e, setMouseDownStart)
                }}
                onMouseUp={(e)=>{
                    stopDragging(e, clearDrag, setDragging, mouseDownStart, setFlippedOnce, setFlipped)
                    onTouchUp(e, stacked, flippedOnce, setFlippedOnce, mouseDownStart, setMouseDownStart, flipped, setFlipped)
                }}
                onTouchEnd={(e)=>{
                    stopDragging(e, clearDrag, setDragging, mouseDownStart, setFlippedOnce, setFlipped)
                    onTouchUp(e, stacked, flippedOnce, setFlippedOnce, mouseDownStart, setMouseDownStart, flipped, setFlipped)
                }}
                onMouseMove={(e)=>onDragging(e, dragging, dragDirection, onDrag)} onTouchMove={(e)=>onDragging(e, dragging, dragDirection, onDrag)}
            >
                <div className={`card rounded-sm ${(!stacked && flipped) && "flipped"} ${(!stacked && !flipped && !flippedOnce) && "face-down"} ${(!stacked && !flipped && flippedOnce) && "unflipped"}`}>
                    <div className={`front border border-thick border-white bg-almond`}>
                        {
                            card &&
                            <CardFace type="front" cardData={card} />
                        }
                    </div>
                    <div className={`back bg-almond border border-thick border-white`}>
                        {
                            card &&
                            <CardFace type="back" cardData={card} />
                        }
                    </div>
                </div>
            </div>
        )}
        </DragDirectionContext.Consumer>
    )
}

export default Flashcard