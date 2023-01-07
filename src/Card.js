import React, {useState} from "react";
import "./Card.css"

function Card({name, image}){

    const [{angle, xPosition, yPosition}] = useState({
        angle: Math.random() * 90 - 30,
        xPosition: Math.random() * 50 - 10,
        yPosition: Math.random() * 50 - 20
    });

    const transform = `translate(${xPosition}px, ${yPosition}px) rotate(${angle}deg)`;

    return <img className="Card"
                alt={name}
                src={image}
                style={{transform}} />;
}

export default Card;
