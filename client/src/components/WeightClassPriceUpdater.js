import React, { useEffect, useState } from "react";
import inventoryService from "../services/inventory";

const WeightClassPriceUpdater = ({ currentPrice, currentWeightClass, handleDisplay }) => {
    const [price, setPrice] = useState('')

    useEffect(() => {
        setPrice(currentPrice);
    }, [currentPrice]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        const weightAndPrice = { price: price, weightClass: currentWeightClass }
        inventoryService.updateWeightPriceMeta(weightAndPrice)
            .then(response => handleDisplay(false))
            .catch(error => console.log("Oh no!"));
    }

    return (
        <>
            <form id="weightPriceForm" className="row" onSubmit={onSubmitForm} style={{ marginRight: '0px', justifyContent: 'flex-end' }}>
                <input className="form-control" type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder='Price...' style={{ width: '150px' }} />
                <button className="btn" form='weightPriceForm' type="submit" style={{backgroundColor:"grey", color:"white", width: '60px'}}>Save</button>
            </form>
        </>
    )
}

export default WeightClassPriceUpdater;