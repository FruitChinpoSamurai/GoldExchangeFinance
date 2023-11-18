import React, { useEffect } from "react";
import transactionService from "../../services/transaction";

const BarExchangeIn = ({ formData, handleTextChange, handleAccoTranID, handleBEWeights, handleBEPremiumUpdate, preventNegativeValues, readOnly }) => {
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
                    <input type="number" step="0.01" className="form-control" name="stdWeight" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.stdWeight} placeholder={formData.transactionType === 'Bar Exchange In' ? "Standard In" : "Standard Out"} onInput={(e) => handleTextChange(e)} min="0" max="999" required />
                </div>
                <div className="col">
                    <select className="form-select" name="itemType" value={formData.itemType} onChange={(e) => handleTextChange(e)}>
                        <option value="10 Tola Bar">10 Tola Bar</option>
                        <option value="Millat">Millat</option>
                        <option value="Small Pieces">Small Pieces</option>
                        <option value="Coins">Coins</option>
                        <option value="Articles">Articles</option>
                    </select>
                </div>
            </div>
            {/* Second row. */}
            <div className="row my-2"> 
                <div className="col">
                    <input type="number" step="0.01" className="form-control" name="egrWeight" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.egrWeight} placeholder={formData.transactionType === 'Bar Exchange In' ? "EGR Out" : "EGR In"} onInput={(e) => handleBEWeights(e)} min="0" max="999" required disabled={formData.stdWeight === '' ? true : false} />
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Third row. */}
            <div className="row my-2"> 
                <div className="col">
                    <input type="number" className="form-control" name="premium" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.premium} placeholder="Premium" onInput={(e) => handleBEPremiumUpdate(e)} min="0" max="10000" disabled={formData.egrWeight === '' || formData.stdWeight === '' ? true : false} />
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            <div className="row my-4"> 
                <></>
            </div>
            {/* Transferrables box. */}
            <div className="col border border-3 rounded" style={{position: 'absolute', width: '45%', height: '138px', top: readOnly ? '42%' : '46%', left: '52.5%', minWidth: '186px', maxWidth: '372px', backgroundColor: 'silver'}}>
                {
                    formData.transactionType === 'Bar Exchange In' ?
                    <>
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
                    </> :
                    <>
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
                                <span>Customer Paid = </span>
                            </div>
                            <div className="col">
                                <input type="text" value={formData.cPaid} className="form-control form-control-sm" placeholder="0" name="cPaid" onInput={(e) => handleTextChange(e)} />
                            </div>
                        </div>
                    </>
                }
                <div className="row text-end mx-2 mt-4">
                    <span>Account's Transaction ID: {formData.accoTranID}</span>
                </div>
            </div>
        </>
    )
};

export default BarExchangeIn;