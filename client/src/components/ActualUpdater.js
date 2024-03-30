import React, { useEffect, useState } from "react";
import workshopService from "../services/workshop";

const ActualUpdater = ({ updateData, handleDisplay, handleTableUpdate }) => {
    const [actualImpure, setActualImpure] = useState('')
    const [shopImpure, setShopImpure] = useState('');
    const [shopPure, setShopPure] = useState('');
    const [shopMix, setShopMix] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        setType(updateData[2]);
    }, [updateData])

    const onSubmitForm = (e) => {
        e.preventDefault();
        let body = null;
        if(updateData[2] === 'actual') {
            const missingImpure = Math.round((Number(updateData[0]) - Number(actualImpure)) * 100) / 100;
            body = { type: type, actualImpure: actualImpure, missingImpure: missingImpure, dateCreated: updateData[1] }
        } else {
            const finalPure = Math.round((Number(shopPure) + Number(shopMix) - Number(updateData[0])) * 100) / 100;
            console.log(finalPure);
            body = { type: type, finalPure: finalPure, shopImpure: shopImpure, shopPure: shopPure, shopMix: shopMix, dateCreated: updateData[1] }
        }
        workshopService.updateWorkshopRow(body)
            .then(response => {
                handleDisplay(false)
                handleTableUpdate(response);
            })
            .catch(error => console.log("Oh no!"));
    }

    return (
        <>
            <form id="workshopForm" className="row" onSubmit={onSubmitForm} style={{ marginRight: '0px', justifyContent: 'flex-end' }}>
                {
                    type === 'actual' ?
                        <input className="form-control" type="text" value={actualImpure} onChange={e => setActualImpure(e.target.value)} placeholder='Actual Impure...' style={{ width: '150px' }} />
                        :
                        <>
                            <input className="form-control" type="text" value={shopImpure} onChange={e => setShopImpure(e.target.value)} placeholder='Workshop Impure...' style={{ width: '150px' }} />
                            <input className="form-control" type="text" value={shopPure} onChange={e => setShopPure(e.target.value)} placeholder='Workshop Pure...' style={{ width: '150px' }} />
                            <input className="form-control" type="text" value={shopMix} onChange={e => setShopMix(e.target.value)} placeholder='Workship Mix...' style={{ width: '150px' }} />
                        </>

                }
                <button className="btn" form='workshopForm' type="submit" style={{backgroundColor:"grey", color:"white", width: '60px'}}>Save</button>
            </form>
        </>
    )
}

export default ActualUpdater;