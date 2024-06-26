import React, { useEffect } from "react";
import transactionService from "../../services/transaction";

const Exchange = ({ formData, handleTextChange, handleAccoTranID, pullTestingTransaction, handleIncludeTestFees, handleDiscountChange, preventNegativeValues, alertMessage, readOnly }) => {
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
                    <input type="number" className="form-control" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.discount} max={Number(formData.charges)} onInput={(e) => handleDiscountChange(e)} placeholder="Discount" />
                </div>
                <div className="col">
                    <select className="form-select" name="includeTestFees" value={formData.includeTestFees} onChange={(e) => handleIncludeTestFees(e)} disabled={formData.testTransferredDue}>
                        <option value="true">Inlcude test fees</option>
                        <option value="false">Don't include test fees</option>
                    </select>
                </div>
            </div>
            {/* Second row. */}
            <div className="row my-2"> 
                <div className="col">
                    <span style={{color: 'red'}}><small>{alertMessage}</small></span>
                </div>
                <div className="col">
                    <input type="number" className="form-control" value={formData.points} placeholder="Points" disabled min={0} max={999} step=".1" />
                </div>
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <></>
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
                    <input type="number" className="form-control" value={formData.charges} placeholder="Charges" disabled />
                </div>
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Transferrables box. */}
            <div className="col border border-3 rounded" style={{position: 'absolute', width: '45%', height: '131px', top: readOnly ? '41.5%' : '44.5%', left: '52.5%', minWidth: '186px', maxWidth: '372px', backgroundColor: 'silver'}}>
                <div className="row mx-2 my-2">
                    <div className="col mt-1">
                        <span>Customer Payable = </span>
                    </div>
                    <div className="col">
                        <input type="text" value={formData.cPayable} className="form-control form-control-sm" placeholder="0" disabled />
                    </div>
                </div>
                <div className="row mx-2 my-2">
                    <div className="col mt-1">
                        <span>Customer Paid = </span>
                    </div>
                    <div className="col">
                        <input type="text" name="cPaid" value={formData.cPaid} className="form-control form-control-sm" placeholder="0" onInput={(e) => handleTextChange(e)} />
                    </div>
                </div>
                <div className="row text-end mx-2">
                    <span>Account's Transaction ID: {formData.accoTranID}</span>
                </div>
            </div>
        </>
    )
};

export default Exchange;