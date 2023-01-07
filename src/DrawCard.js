import React, {useState, useEffect, useRef} from "react";
import Card from "./Card";
import axios from "axios";
import "./DrawCard.css";

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

function DrawCard() {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [autoDraw, setAutoDraw] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        async function getData() {
            let d = await axios.get(`${API_BASE_URL}/new/shuffle/`);
            setDeck(d.data);
        }
        getData();
    }, [setDeck]);

    useEffect(() => {
        async function getCard() {
            let {deck_id} = deck;
            try{
                let drawResult = await axios.get(`${API_BASE_URL}/${deck_id}/draw/`);

                if(drawResult.data.remaining === 0){
                    setAutoDraw(false);
                    throw new Error("All cards have been drawn");
                }
                const card = drawResult.data.cards[0];

                setDrawn(d => [
                    ...d, {
                        id: card.code,
                        name: card.suit + " " + card.value,
                        image: card.image
                    }
                ]);
            }
            catch(err){
                alert(err);
            }
        }
        if(autoDraw && !timerRef.current){
            timerRef.current = setInterval(async () => {
                await getCard();
            }, 500);
        }
        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, [autoDraw, setAutoDraw, deck])

    const toggleAutoDraw = () => {
        setAutoDraw(auto => !auto);
    }

    const cards = drawn.map(c => (
        <Card key={c.id} name={c.name} image={c.image} />
    ));

    return (
        <div className="Deck">
            {deck ? (
                <button className="deck-draw" onClick={toggleAutoDraw}>
                    {autoDraw ? "STOP" : "CONTINUE"} DRAWING A CARD
                </button>
            ) : null}
            <div className="deck-area">{cards}</div>
        </div>
    );
}

export default DrawCard;