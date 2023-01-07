import React, {useState} from "react";

function Card({name, image}){

    const [{angle, xPosition, yPosition}] = useState({
        angle: Math.random() * 90 - 30,
        xPosition: Math.random() * 50 - 10,
        yPosition: Math.random() * 50 - 20
    });

    const randomlyPlaceCard = `translate(${xPosition}px, ${yPosition}px) rotate(${angle}deg)`;

    return <img className="Card"
                alt={name}
                src={image}
                style={{randomlyPlaceCard}} />;
}

export default Card;
