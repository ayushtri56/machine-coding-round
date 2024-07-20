// players
// logic to find win
// store data.

import { useEffect, useState } from 'react';
import styles from './styles.module.css'

function getTable(size = 3) {
    let table = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push(null);
        }
        table.push(row);
    }
    return table;
}
const PLAYERS = {
    1: 'O',
    2: 'X',
};

const SIZE = 3;

function isRowSame(row){
    let first = row[0];
    for(let i =1; i < row.length; i++){
        const el =  row[i];
        if(!el || !row[i] || first !== row[i]){
            return false;
        }
    }
    return true;
}

function isColumnSame(table, col){
    const first = table[0][col];
    for(let i =1; i< table[0].length; i++){
        const el = table[i][col];
        console.log(el)
        if(!el || first !== el){
            return false;
        }
    }
    return true;
}

function isDiagonalSame(table){
    let first = table[0][0];
    for(let i =0; i< table[0].length; i++){
        for(let j=0; j< table[0].length; j++){
            if(i === j){
                if(!first || !table[i][j] || first !== table[i][j]){
                    return false;
                }
            }
        }
    }
    return true;
}
function isWin(table){
    let won = false;
    if(table == null){
        return won;
    }
    for(let i = 0; i< table[0].length; i++){
        if(isRowSame(table[i])){
            console.log('same row')
            return true;
        }
        
        if(isColumnSame(table, i)){
            console.log('same columns')
            return true;
        }
    }
    return isDiagonalSame(table);
}

const TicTaeToe = () => {
    const [table, setTable] = useState(() => getTable(SIZE));
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [won, setWon] = useState(false);

    useEffect(() => {
        if(isWin(table)){
            setWon(true);
        } else {
            setCurrentPlayer((currentPlayer) => currentPlayer === 1 ? 2: 1);
        }
        
    }, [table])

    function onClickBoard(e){
        const id = e.target.id;
        const [row, column] = id.split('_');
        // Update table
        const newTable = [...table];
        newTable[row][column] = PLAYERS[currentPlayer];
        setTable(newTable);
    }

    return (
        <>
        <div className={styles.container} onClick={onClickBoard}>
            {
                table?.map((row, outerIndex) => {
                    return <Box outerIndex={outerIndex} row = {row} />
                })
            }
        </div>
        {won && <div style={{color: 'red', width: '100px', height: '100px' }}>{PLAYERS[currentPlayer]}</div>}
        </>
    )
}
export default TicTaeToe;

function Box({ outerIndex, row }) {
    return (
        <div className={styles.sub_container}>
            {
                row.map((el, innerIndex) => {
                    return (
                        <div id={`${outerIndex}_${innerIndex}`} className={styles.box}>
                            {el}
                        </div>
                    )
                })
            }
        </div>
    )
}