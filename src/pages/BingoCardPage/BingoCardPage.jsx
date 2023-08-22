import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './BingoCardPage.css';

const BingoCardPage = () => {
    const navigate = useNavigate();
    const [numbers, setNumbers] = useState([]);
    const [txtColor, setTxtColor] = useState("#ffffff");
    const [bgColor, setBgColor] = useState("#2e9a18"); 
    const [colored, setColored] = useState(false);

    useEffect(() => {
        if (numbers.length === 0) {
            generateNumbers()
        }
    }, [])

    useEffect(() => {
        // console.log(numbers);
    }, [numbers])

    useEffect(() => {
        // console.log(numbers);
    }, [colored])

    const click_generateCard = () => {
        if (colored) {
            Swal.fire({
                title: 'Generate new card?',
                confirmButtonText: 'Yes',
                confirmButtonColor: '#4CAF50',
                showCancelButton: true,
                cancelButtonColor: '#B0B0B0'
            }).then(res => {
                if (res.isConfirmed) {
                    resetCard();
                    clearNumbers();
                    generateNumbers();
                }
            })
        } else {
            resetCard();
            clearNumbers();
            generateNumbers();
        }
    }

    const click_resetCard = () => {
        if (colored) {
            Swal.fire({
                title: 'Reset your card?',
                confirmButtonText: 'Yes',
                confirmButtonColor: '#4CAF50',
                showCancelButton: true,
                cancelButtonColor: '#B0B0B0'
            }).then(res => {
                if (res.isConfirmed) {
                    resetCard();
                }
            })
        }
    }

    const click_cell = (e) => {
        if (!e.target.style.backgroundColor) {
            e.target.style.color = txtColor;
            e.target.style.backgroundColor = bgColor;
        } else {
            e.target.style.color = null;
            e.target.style.backgroundColor = null;
        }

        if (!colored) {
            setColored(true);
        }
    }

    const click_goToNumberPicker = () => {
        if (colored) {
            Swal.fire({
                title: 'You want to leave your card?',
                confirmButtonText: 'Yes',
                confirmButtonColor: '#4CAF50',
                showCancelButton: true,
                cancelButtonColor: '#B0B0B0'
            }).then(res => {
                if (res.isConfirmed) {
                    navigate('/number-picker');
                }
            })
        } else {
            navigate('/number-picker');
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

    const resetCard = () => {
        const cells = document.querySelectorAll('.bingo_card_cell');

        cells.forEach(cell => {
            cell.style.backgroundColor = null;
            cell.style.color = null;
        })

        setColored(false);
    }

    return (<React.Fragment>
        <div className="page page-[bingo_card]">
            <div className="row">
                <div className="bingo_card">
                    {('BINGO').split('').map((val, index) => <div key={ index } className="bingo_card_cell special">{ val }</div>)}
                    {numbers && numbers.length === 0 && Array(25).fill().map((x, index) => {
                        return <div key={ index } className="bingo_card_cell"></div>
                    })}
                    {numbers.map((number, index) => {
                        if (index === 12) {
                            return <div key={ index } className="bingo_card_cell special"><i className="fa-solid fa-star fa-xs"/></div>
                        } else {
                            return <div key={ index } className="bingo_card_cell" onClick={ click_cell }>{ number }</div>
                        }
                    })}
                </div>
            </div>
            <div className="row">
                <div className="color_pickers">
                    <div className="input_group">
                        <label htmlFor="txt_color" className="label">Text</label>
                        <input type="color" id="txt_color" className="input" onChange={ change_txtColor } value={ txtColor } />
                    </div>
                    <div className="input_group">
                        <label htmlFor="bg_color" className="label">Cell</label>
                        <input type="color" id="bg_color" className="input" onChange={ change_bgColor } value={ bgColor } />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="buttons">
                    <button className="button" onClick={ click_generateCard }>Generate Card <i className="fa-solid fa-dice" /></button>
                    <button className="button" onClick={ click_resetCard }>Reset Card <i className="fa-solid fa-rotate" /></button>
                    <button className="button" onClick={ click_goToNumberPicker }>
                        Number Picker <i className="fa-solid fa-arrow-right-long" />
                    </button>
                </div>
            </div>
        </div>
    </React.Fragment>)
}

export default BingoCardPage;