import React, { useEffect, useState } from "react";
import './BingoCardPage.css';

const BingoCardPage = () => {
    const [numbers, setNumbers] = useState([]);
    const [txtColor, setTxtColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff"); 

    useEffect(() => {
        // console.log(numbers);
    }, [numbers])

    const click_generateCard = () => {
        clearNumbers();
        generateNumbers();
    }

    const click_cell = (e) => {
        if (!e.target.style.backgroundColor) {
            e.target.style.color = txtColor;
            e.target.style.backgroundColor = bgColor;
        } else {
            e.target.style.color = null;
            e.target.style.backgroundColor = null;
        }
    }

    const change_txtColor = (e) => {
        setTxtColor(e.target.value);
    }

    const change_bgColor = (e) => {
        setBgColor(e.target.value);
    }

    const generateNumbers = () => {
        const numbers_holder = [];
        for (let a = 0; a < 5; a++) {
            for (let b = 0; b < 5; b++) {
                const rgn = Math.floor(Math.random() * 15) + (1 + (15 * b));
                if (numbers_holder.indexOf(rgn) > -1) {
                    b--;
                } else {
                    numbers_holder.push(rgn);
                }
            }
        }
        setNumbers(numbers_holder);
    }

    const clearNumbers = () => {
        setNumbers([]);
    }

    return (<React.Fragment>
        <div className="page page-[bingo_card]">
            <div className="bingo_card">
                {('BINGO').split('').map((val, index) => <div key={ index } className="bingo_card_cell special">{ val }</div>)}
                {numbers.map((number, index) => {
                    if (index === 12) {
                        return <div key={ index } className="bingo_card_cell special"><i className="fa-solid fa-star"/></div>
                    } else {
                        return <div key={ index } className="bingo_card_cell" onClick={ click_cell }>{ number }</div>
                    }
                })}
            </div>
            <div className="color_pickers">
                <div className="input_group">
                    <label>Text</label>
                    <input id="txt_color" type="color" onChange={ change_txtColor } value={ txtColor } />
                </div>
                <div className="input_group">
                    <label>Background</label>
                    <input id="bg_color" type="color" onChange={ change_bgColor } value={ bgColor } />
                </div>
            </div>
            <div className="buttons">
                <button onClick={ click_generateCard }>Generate Card</button>
            </div>
        </div>
    </React.Fragment>)
}

export default BingoCardPage;