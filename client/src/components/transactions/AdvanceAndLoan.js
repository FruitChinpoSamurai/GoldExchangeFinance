import React, { useEffect } from "react";
import transactionService from "../../services/transaction";

const Advance = ({ formData, handleTextChange, handleAccoTranID, pullTransaction, handleAmountTagChange, alertMessage, readOnly }) => {
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
                    <div className="input-group">
                        <input type="text" className="form-control" name="simpleTranID" value={formData.simpleTranID} placeholder="Trn ID..." onInput={(e) => handleTextChange(e)} required />
                        <button className="btn btn-outline-secondary" type="button" onClick={() => pullTransaction()}>Select</button>
                    </div>
                </div>
                <div className="col">
                    <span style={{color: /\d/.test(alertMessage) ? 'green' : 'red' }}><small>{alertMessage}</small></span>
                </div>
                <div className="col-6">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" name="amount" value={formData.amount} onInput={(e) => handleTextChange(e)} placeholder="Amount" disabled={/\d/.test(alertMessage) ? false : true} required />
                        <button className="btn btn-outline-secondary" type="button" disabled={/\d/.test(alertMessage) ? false : true} data-tag="G" onClick={(e) => handleAmountTagChange(e)}>G</button>
                        <button className="btn btn-outline-secondary" type="button" disabled={/\d/.test(alertMessage) ? false : true} data-tag="R" onClick={(e) => handleAmountTagChange(e)}>C</button>
                    </div>
                </div>
            </div>
            {/* Second row. */}
            <div className="row my-2"> 
                <div className="col">
                    <textarea className="form-control" rows="3" placeholder="Remarks..." name="remarks" value={formData.remarks} onInput={(e) => handleTextChange(e)} disabled={/\d/.test(alertMessage) ? false : true}></textarea>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Transferrables box. */}
            <div className="col border border-3 rounded" style={{position: 'absolute', width: '45%', height: '87px', top: readOnly ? '53.5%' : '56.5%', left: '52.5%', minWidth: '186px', maxWidth: '372px', backgroundColor: 'silver'}}>
                <div className="row mx-2 my-2">
                    {
                        formData.transactionType === 'Advance' ?
                        <>
                            <div className="col-7 mt-1">
                                <span>Customer Paid = </span>
                            </div>
                            <div className="col">
                                <input type="text" value={formData.cPaid} name="cPaid" onInput={(e) => handleTextChange(e)} className="form-control form-control-sm" placeholder="0" disabled={/\d/.test(alertMessage) ? false : true}/>
                            </div>
                        </> :
                        <>
                            <div className="col-7 mt-1">
                                <span>Customer Received = </span>
                            </div>
                            <div className="col">
                                <input type="text" value={formData.cReceived} name="cReceived" onInput={(e) => handleTextChange(e)} className="form-control form-control-sm" placeholder="0" disabled={/\d/.test(alertMessage) ? false : true}/>
                            </div>
                        </>
                    }
                </div>
                <div className="row text-end mx-2">
                    <span>Account's Transaction ID: {formData.accoTranID}</span>
                </div>
            </div>
        </>
    )
};

export default Advance;