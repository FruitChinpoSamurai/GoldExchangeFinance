import React, { useState } from "react";

const Calculator = () => {
    const [gold, setGold] = useState('')
    const [cash, setCash] = useState('')
    const [rate, setRate] = useState('225000')

    const handleGoldtoCash = (e) => {
        if (e.target.value === '') {
            setGold('')
            setCash('')
        } else {
            setGold(e.target.value)
            setCash(Math.round((rate * e.target.value) / 11.664))
        }
    }

    const handleCashtoGold = (e) => {
        if (e.target.value === '') {
            setCash('')
            setGold('')
        } else {
            setCash(e.target.value)
            setGold(Math.round(((e.target.value * 11.664) / rate) * 100) / 100)
        }
    }

    return (
        <div className="col" style={{ position: 'absolute' }}>
            <div style={{ backgroundColor: '#CDB450', borderRadius: '10px', borderColor: 'black', width: '200px', height: '100px' }}>
                <form style={{ marginLeft: '17px', paddingTop: '5px' }}>
                    <input className='row' type="text" value={gold} onChange={e => handleGoldtoCash(e)} placeholder='Gold weight (0.00)' />
                    <input className='row' type="text" value={rate} onChange={e => setRate(e.target.value)} placeholder='Rate'  disabled={(gold !== '' && cash !== '') ? true : false} />
                    <input className='row' type="text" value={cash} onChange={e => handleCashtoGold(e)} placeholder='Amount in cash (0)' />
                </form>
            </div>
        </div>
    )
}

export default Calculator;