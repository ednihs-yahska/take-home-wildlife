import React from "react";

const CardFace = ({type, cardData}) => {
    return (
        <div className="card-side card-image-side">
            { type == "front" &&
                <div className="flex flex-col p-2 card-image-container">
                    <img className="card-image" alt={cardData.name} src={cardData.image} />
                    <div className="credit">
                        <span>{cardData.credit}</span>
                    </div>
                </div>
            }
            { type == "back" &&
                <div className="flex flex-col p-2 card-info-container">
                    <div>
                    <span>{cardData.name}</span>
                    </div>
                    <div>
                        <span>{cardData.class}</span>
                    </div>
                    <div>
                        <span>{cardData.order}</span>
                    </div>
                    <div>
                        <span>{cardData.family}</span>
                    </div>
                    <div>
                        <span>{cardData.genus}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default CardFace