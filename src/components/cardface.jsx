import React from "react";
import {infoFontSizeMap} from "../utilities/constants"

const getFontSize = (text, map) => {
    return map[text.length]
}
const CardFace = ({type, cardData}) => {
    return (
        <div className="card-side">
            { type == "front" &&
                <div className="flex flex-col p-2 card-image-container">
                    <img className="card-image" alt={cardData.name} src={cardData.image} />
                    <div className="credit">
                        <span>{cardData.credit}</span>
                    </div>
                </div>
            }
            { type == "back" &&
                <div className="flex flex-col card-info-container">
                    <div className="info-row flex">
                        <span className="mx-2">Name:</span><span 
                        style={{fontSize: getFontSize(cardData.name, infoFontSizeMap)}} 
                        className="info-value ml-auto">{cardData.name || "N/A"}</span>
                    </div>
                    <div className="info-row  flex">
                        <span className="mx-2">Class:</span><span 
                        style={{fontSize: getFontSize(cardData.class, infoFontSizeMap)}} 
                        className="info-value ml-auto">{cardData.class || "N/A"}</span>
                    </div>
                    <div className="info-row  flex">
                        <span className="mx-2">Order:</span><span 
                        style={{fontSize: getFontSize(cardData.order, infoFontSizeMap)}}  
                        className="info-value ml-auto">{cardData.order || "N/A"}</span>
                    </div>
                    <div className="info-row  flex">
                        <span className="mx-2">Family:</span><span 
                        style={{fontSize: getFontSize(cardData.family, infoFontSizeMap)}}  
                        className="info-value ml-auto">{cardData.family || "N/A"}</span>
                    </div>
                    <div className="info-row  flex">
                        <span className="mx-2">Genus:</span><span 
                        style={{fontSize: getFontSize(cardData.genus, infoFontSizeMap)}} 
                        className="info-value ml-auto">{cardData.genus || "N/A"}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default CardFace