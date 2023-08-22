import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './NumberPickerPage.css';

const NumberPickerPage = () => {
    const navigate = useNavigate();
    const [pickResult, setPickResult] = useState();
    const [pickResult_letter, setPickResult_letter] = useState();
    const [pickHistory, setPickHistory] = useState([]);
    const [isPicking, setIsPicking] = useState(false);
    const bingo = ('BINGO').split('');

    useEffect(() => {

    }, [pickResult])

    useEffect(() => {
        
    }, [pickResult_letter])

    useEffect(() => {
        
    }, [pickHistory])

    useEffect(() => {
        if (isPicking) {
            const interval = setInterval(() => {
                const rgn = Math.floor(Math.random() * 75) + 1;
                setPickResult(rgn);

                const rgn_letter = Math.floor(Math.random() * 4);
                setPickResult_letter(bingo[rgn_letter]);
            }, 50)

            setTimeout(() => {
                clearInterval(interval);
                pickNumber();
                setIsPicking(false);
            }, 1000);
        }
    }, [isPicking])

    const click_goToCard = () => {
        if (pickHistory.length > 0) {
            Swal.fire({
                title: 'Leave picker?',
                confirmButtonText: 'Yes',
                confirmButtonColor: '#4CAF50',
                showCancelButton: true,
                cancelButtonColor: '#B0B0B0'
            }).then(res => {
                if (res.isConfirmed) {
                    navigate('/');
                }
            })
        } else {
            navigate('/');
        }
    }

    const click_pickNumber = () => {
        setIsPicking(true);
    }

    const click_reset = () => {
        if (pickHistory.length > 0) {
            Swal.fire({
                title: 'Reset picker?',
                confirmButtonText: 'Yes',
                confirmButtonColor: '#4CAF50',
                showCancelButton: true,
                cancelButtonColor: '#B0B0B0'
            }).then(res => {
                if (res.isConfirmed) {
                    resetPicker();
                }
            })
        } else {
            resetPicker();
        }
    }

    const pickNumber = () => {
        const rgn = Math.floor(Math.random() * 75) + 1;
        if (pickHistory.indexOf(rgn) > -1) {
            pickNumber();
        } else {
            const temp_pickHistory = pickHistory;
            temp_pickHistory.push(rgn)
            setPickHistory(temp_pickHistory);
            setPickResult(rgn);
            pickLetter(rgn);
        }
    }

    const pickLetter = (number) => {
        for (let i = 0; i < 4; i++) {
            if (number >= (1 + (15 * i))  && number <= (15 + (15 * i))) {
                setPickResult_letter(bingo[i]);
            }
        }
    }

    const resetPicker = () => {
        setPickResult();
        setPickHistory([]);
        setPickResult_letter();
    }

    return (<React.Fragment>
        <div className="page page-[number-picker]">
            <div className="row row-[header]">
                <button onClick={ click_goToCard }><i className="fa-solid fa-arrow-left-long" /> Go Back</button>
                <button><i class="fa-solid fa-gear" /></button>
            </div>
            <div className="row row-[history]">
                {('BINGO').split('').map((val, index) => <div key={ index } className="row">
                    <div className="number-picker_cell letter">{ val }</div>
                    {Array.from({ length: 15 }, (_, index1) => index1 + (1 + (15 * index))).map((number, index) => {
                        if (pickHistory.indexOf(number) > -1) {
                            return <div key={ index } className="number-picker_cell picked">{ number }</div>
                        } else {
                            return <div key={ index } className="number-picker_cell">{ number }</div>
                        }
                    })}
                </div>)}
            </div>
            <div className="row row-[result]">
                {pickResult && <div className="result">{ pickResult_letter }{ pickResult }</div>}
                {!pickResult && <div className="result">START</div>}
            </div>
            <div className="row row-[buttons]">
                <button className="button" onClick={ click_pickNumber } disabled={ (pickHistory.length < 75 ) ? '' : 'disabled' }>Pick Number <i className="fa-solid fa-dice" /></button>
                <button className="button" onClick={ click_reset }>Reset <i className="fa-solid fa-rotate" /></button>
            </div>
        </div>
    </React.Fragment>)
}

export default NumberPickerPage;