

const SIZE = 10;
import { useEffect, useState } from 'react';
import styles from './styles.module.css'

const SNAKE_LADDER = {
    5: 25,
    16: 87,
    28: 9,
    30: 1,
    40: 90,
    45: 99,
    50: 20,
    60: 80,
    65: 98,
    95: 100
}

const SnakeLadder = () => {
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [diceNumber, setDiceNumber] = useState(null);
    const [playerPos1, setPlayerPos1] = useState(1);
    const [playerPos2, setPlayerPos2] = useState(1);

    useEffect(() => {
        let playerWon = false;
        if(playerPos1 === SIZE * SIZE){
            playerWon = true;
            alert(`p1 win`)
        } else if(playerPos2 === SIZE * SIZE){
            playerWon = true;
            alert(`p2 win`)
        }
        if(playerWon){
            reset();
        }
    }, [playerPos1, playerPos2])

    function reset(){
        setPlayerPos1(1);
        setPlayerPos2(1);
        setCurrentPlayer(1);
    }
    function onClickPlayerBtn(player) {
        setCurrentPlayer((prevPlayer) => {
            if (prevPlayer === 1) return 2;
            else return 1;
        })

        const diceN = rollDice();
        setDiceNumber(diceN)

        if (player === 1) {
            const newPos = getNewPlayerPos(playerPos1, diceN);
            setPlayerPos1(newPos);
        } else {
            const newPos = getNewPlayerPos(playerPos2, diceN);
            setPlayerPos2(newPos);
        }
    }
    return <div className={styles.container}>
        <div className={styles.board}>
            {
                Array.from({ length: SIZE }).map((_, outerIndex) => {
                    return <Row key={outerIndex} outerIndex={outerIndex} playerPos1={playerPos1} playerPos2={playerPos2} />
                })
            }
        </div>
        <div>
            <button onClick={() => onClickPlayerBtn(1)} disabled={currentPlayer !== 1}>Player 1</button>
            <button onClick={() => onClickPlayerBtn(2)} disabled={currentPlayer !== 2}>Player 2</button>
        </div>
        <div>
            <span>Dice Number: </span>
            <span>{diceNumber}</span>
        </div>
    </div>
}

function getNewPlayerPos(playerPos, diceN) {
    let newPos = playerPos;
    if(newPos + diceN <= SIZE * SIZE){
        newPos += diceN;
    }
    if (SNAKE_LADDER[newPos]) {
       newPos = SNAKE_LADDER[newPos];
    }
    return newPos;
}
function Row({ outerIndex, playerPos1, playerPos2 }) {
    return <div className={styles.row}>
        {
            Array.from({ length: SIZE }).map((_, innerIndex) => {
                const cellNumber = getCellNumber(outerIndex, innerIndex);
                return (
                    <div key={innerIndex} id={`${outerIndex}_${innerIndex}`} className={styles.cell}>
                        <span>{cellNumber}</span>
                        {SNAKE_LADDER[cellNumber] && <span className={styles.snake_ladder}>{SNAKE_LADDER[cellNumber]}</span>}
                        {cellNumber === playerPos1 && <div className={styles.person1}>p1</div>}
                        {cellNumber === playerPos2 && <div className={styles.person2}>p2</div>}
                    </div>
                )
            })
        }
    </div>
}

function getCellNumber(outerIndex, innerIndex) {
    return outerIndex * SIZE + innerIndex + 1;
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}
export default SnakeLadder;

// Create board
// Create state for dice
// Create state for players
// Roll dice for alternate players.
// 