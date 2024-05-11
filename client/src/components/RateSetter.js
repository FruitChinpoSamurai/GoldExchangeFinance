import React, { useEffect, useState } from "react";
import rateService from "../services/globalRates";

const RateSetter = ({ globalRates }) => {
    const [sellRate, setSellRate] = useState('');
    const [buyRate, setBuyRate] = useState('');

    useEffect(() => {
        setSellRate(globalRates.current.sellRate);
        setBuyRate(globalRates.current.buyRate);
    }, [globalRates])

    const setRates = (e) => {
        e.preventDefault();
        const rates = { sellRate: sellRate, buyRate: buyRate };
        rateService.updateRates(rates)
            .then(() => {
                globalRates.current = rates;
            })
            .catch((response) => console.log(response));
    };

    console.log(sellRate, buyRate)

    return (
        <div className="col" style={{ position: 'absolute' }}>
            <div style={{ backgroundColor: '#CDB450', borderRadius: '10px', borderColor: 'black', width: '200px', height: '100px' }}>
                <form id="rateForm" onSubmit={setRates} style={{ marginLeft: '17px', paddingTop: '5px' }}>
                    <input className='row' type="number" value={sellRate} onChange={e => setSellRate(e.target.value)} placeholder='Sell Rate' required min={100000} max={1000000} />
                    <input className='row' type="number" value={buyRate} onChange={e => setBuyRate(e.target.value)} placeholder='Buy Rate' required min={100000} max={1000000} />
                    <button className="btn btn-sm" form='rateForm' type="submit" style={{backgroundColor:"grey", color:"white", marginTop:"2px", marginRight: '6px', float: 'right'}}>Set</button>
                </form>
            </div>
        </div>
    )
}

export default RateSetter;