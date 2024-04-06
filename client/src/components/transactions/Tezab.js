import React, { useEffect } from "react";
import transactionService from "../../services/transaction";

const Tezab = ({ formData, handleTextChange, handlePureChange, handleAccoTranID, handleRateChange, handleDiscountChange, handleReceivableUpdate, preventNegativeValues, readOnly, scaleReading }) => {
    useEffect(() => {
        if (!readOnly) {
            transactionService.getAccoTranID(formData.transactionType, formData.accountID)
                .then(response => handleAccoTranID(response))
                .catch(() => console.log('Whoops!'));
        }
    }, [formData.transactionType, formData.accountID, handleAccoTranID, readOnly]);

    return (
        <>
            {/* First row. */}
            <div className="row my-2"> 
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <div className="input-group">
                        <input type="number" step="0.01" className="form-control" name="totalWeight" onKeyDown={(e) => preventNegativeValues(e)} onWheel={e => e.target.blur()} value={formData.totalWeight} placeholder="Total Weight" onInput={(e) => handleTextChange(e)} min="0" max="999" required />
                        <button className="btn btn-outline-secondary" type="button" onClick={() => handleTextChange({target: { value: scaleReading, name: "totalWeight"}})}>Set</button>
                    </div>
                </div>
                <div className="col">
                    <input type="number" className="form-control" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.rate} placeholder="Rate" onInput={(e) => handleRateChange(e)} />
                </div>
                <div className="col">
                    <input type="number" className="form-control" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.discount} placeholder="Discount" max={Number(formData.charges)} onInput={(e) => handleDiscountChange(e)} />
                </div>
            </div>
            {/* Second row. */}
            <div className="row my-2"> 
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <input type="number" className="form-control" name="points" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.points} placeholder="Points" onInput={(e) => handlePureChange(e)} min="0" max="999" />
                </div>
                <div className="col">
                    <input type="number" className="form-control" style={{backgroundColor:'#E7CD78', cursor: 'pointer'}} value={formData.grossAmount} placeholder="Gross Amount" readOnly onClick={(e) => handleReceivableUpdate(e)} />
                </div>
                <div className="col">
                    <input type="number" className="form-control" style={{backgroundColor:'#E7CD78', cursor: 'pointer'}} value={formData.netAmount} placeholder="Net Amount" readOnly onClick={(e) => handleReceivableUpdate(e)} />
                </div>
            </div>
            {/* Third row. */}
            <div className="row my-2"> 
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <input type="number" className="form-control" name="pure" value={formData.pure} placeholder="Pure" disabled />
                </div>
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Fourth row. */}
            <div className="row my-2"> 
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <input type="number" className="form-control" name="charges" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.charges} placeholder="Charges" onInput={(e) => handleTextChange(e)} min="0" max="999" required />
                </div>
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Fifth row. */}
            <div className="row my-2"> 
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <input type="number" className="form-control" value={formData.goldInCash} placeholder="Gold in Cash" disabled />
                </div>
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Transferrables box. */}
            <div className="col border border-3 rounded" style={{position: 'absolute', width: '45%', height: '131px', top: readOnly ? '50.4%' : '52.7%', left: '52.5%', minWidth: '186px', maxWidth: '372px', backgroundColor: 'silver'}}>
                <div className="row mx-2 my-2">
                    <div className="col-7 mt-1">
                        <span>Customer Receivable = </span>
                    </div>
                    <div className="col">
                        <input type="text" value={formData.cReceivable} className="form-control form-control-sm" placeholder="0" disabled />
                    </div>
                </div>
                <div className="row mx-2 my-2">
                    <div className="col-7 mt-1">
                        <span>Customer Received = </span>
                    </div>
                    <div className="col">
                        <input type="text" value={formData.cReceived} className="form-control form-control-sm" placeholder="0" name="cReceived" onInput={(e) => handleTextChange(e)} />
                    </div>
                </div>
                <div className="row text-end mx-2">
                    <span>Account's Transaction ID: {formData.accoTranID}</span>
                </div>
            </div>
        </>
    )
};

export default Tezab;