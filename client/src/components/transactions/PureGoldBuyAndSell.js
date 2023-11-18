import React, { useEffect } from "react";
import transactionService from "../../services/transaction";

const PureGoldBuy = ({ formData, handleTextChange, handleAccoTranID, handlePureGoldTransactionRate, handlePGPremiumUpdate, preventNegativeValues, readOnly }) => {
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
                    <input type="number" step="0.01" className="form-control" name="pure" onKeyDown={(e) => preventNegativeValues(e)} onWheel={e => e.target.blur()} value={formData.pure} placeholder="Pure" onInput={(e) => handleTextChange(e)} min="0" max="999" required />
                </div>
                <div className="col">
                    <input type="text" className="form-control" value={formData.amount} placeholder="Amount" disabled />
                </div>
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Second row. */}
            <div className="row my-2"> 
                <div className="col">
                    <input type="number" className="form-control" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.rate} placeholder="Rate" onInput={(e) => handlePureGoldTransactionRate(e)} required disabled={formData.pure === '' ? true : false} />
                </div>
                <div className="col">
                    <></>
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
                    <input type="number" className="form-control" name="premium" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.premium} placeholder="Premium" onInput={(e) => handlePGPremiumUpdate(e)} min="0" max={Number(formData.amount / 2)} disabled={formData.pure === '' || formData.rate === '' ? true : false} />
                </div>
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            <div className="row my-5">
                <></>
            </div>
            {/* Transferrables box. */}
            <div className="col border border-3 rounded" style={{position: 'absolute', width: '45%', height: '226px', top: readOnly ? '20.5%' : '24.5%', left: '52.5%', minWidth: '186px', maxWidth: '372px', backgroundColor: 'silver'}}>
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
                        <span>Customer Payable = </span>
                    </div>
                    <div className="col">
                        <input type="text" value={formData.cPayable} className="form-control form-control-sm" placeholder="0" disabled />
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
                <div className="row mx-2 my-2">
                    <div className="col-7 mt-1">
                        <span>Customer Paid = </span>
                    </div>
                    <div className="col">
                        <input type="text" value={formData.cPaid} className="form-control form-control-sm" placeholder="0" name="cPaid" onInput={(e) => handleTextChange(e)} />
                    </div>
                </div>
                <div className="row text-end mx-2 mt-4">
                    <span>Account's Transaction ID: {formData.accoTranID}</span>
                </div>
            </div>
        </>
    )
};

export default PureGoldBuy;