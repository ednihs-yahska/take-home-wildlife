import React, { useEffect, useState } from "react";
import CardFace from "./cardface"

const Flashcard = ({card, styles, classes}) => {
    return (
        <div style={styles} className={`${classes} card-container`}>
            <div className={`card rounded-sm border`}>
                <div className={`front bg-almond`}>
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