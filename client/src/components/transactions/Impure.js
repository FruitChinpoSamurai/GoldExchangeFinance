import React, { useEffect } from "react";
import transactionService from "../../services/transaction";

const Impure = ({ formData, handleTextChange, handleAccoTranID, pullTestingTransaction, handleRateChange, handleIncludeTestFees, handleReceivableUpdate, handleDiscountChange, preventNegativeValues, alertMessage, readOnly }) => {

    useEffect(() => {
        if (!readOnly) {
            transactionService.getAccoTranID(formData.transactionType, formData.accountID)
                .then(response => handleAccoTranID(response))
                .catch(() => console.log('Whoops!'));
        }
    }, [formData.accountID, handleAccoTranID, formData.transactionType, readOnly]);

    return (
        <>
            {/* First row. */}
            <div className="row my-2"> 
                <div className="col">
                    <div className="input-group">
                        <input type="text" className="form-control" name="testID" value={formData.testID} placeholder="Testing ID..." onInput={(e) => handleTextChange(e)} />
                        <button className="btn btn-outline-secondary" type="button" onClick={() => pullTestingTransaction()}>Select</button>
                    </div>
                </div>
                <div className="col">
                    <input type="number" className="form-control" value={formData.totalWeight} placeholder="Total Weight" disabled />
                </div>
                <div className="col">
                    <input type="number" className="form-control" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.rate} placeholder="Rate" onInput={(e) => handleRateChange(e)} />
                </div>
                <div className="col">
                    <input type="number" className="form-control" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.discount} placeholder="Discount" max={Number(formData.charges) + Number(formData.pendingTakeCash)} onInput={(e) => handleDiscountChange(e)} />
                </div>
            </div>
            {/* Second row. */}
            <div className="row my-2"> 
                <div className="col">
                    <span style={{color: 'red'}}><small>{alertMessage}</small></span>
                </div>
                <div className="col">
                    <input type="number" className="form-control" value={formData.points} placeholder="Points" disabled />
                </div>
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <select className="form-select" name="includeTestFees" value={formData.includeTestFees} onChange={(e) => handleIncludeTestFees(e)} disabled={formData.testTransferredDue}>
                        <option value="true">Inlcude test fees</option>
                        <option value="false">Don't include test fees</option>
                    </select>
                </div>
            </div>
            {/* Third row. */}
            <div className="row my-2"> 
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <input type="number" className="form-control" value={formData.pure} placeholder="Pure" disabled />
                </div>
                <div className="col">
                    <input type="number" className="form-control" style={{backgroundColor:'#E7CD78', cursor: 'pointer'}} value={formData.grossAmount} placeholder="Gross Amount" readOnly onClick={(e) => handleReceivableUpdate(e)} />
                </div>
                <div className="col">
                    <input type="number" className="form-control" style={{backgroundColor:'#E7CD78', cursor: 'pointer'}} value={formData.netAmount} placeholder="Net Amount" readOnly onClick={(e) => handleReceivableUpdate(e)} />
                </div>
            </div>
            {/* Fourth row. */}
            <div className="row my-2"> 
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <input type="number" className="form-control" value={formData.charges} placeholder="Charges" disabled />
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
            {/* Sixth row. */}
            <div className="row my-2"> 
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <input type="number" className="form-control" value={formData.penedingTakeCash} placeholder="Pending Take Cash" disabled />
                </div>
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Transferrables box. */}
            <div className="col border border-3 rounded" style={{position: 'absolute', width: '45%', height: '131px', top: readOnly ? '56.5%' : '58.5%', left: '52.5%', minWidth: '186px', maxWidth: '372px', backgroundColor: 'silver'}}>
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

export default Impure;