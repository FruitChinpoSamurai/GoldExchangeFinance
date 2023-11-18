import React, { useEffect, useState } from "react";
import transactionService from "../../services/transaction";
import DataPopup from "../DataPopup";

const Taken = ({ formData, handleTextChange, handleAccoTranID, handleTransactionClick, handleAmountTagChange, handleButtonDisable, readOnly }) => {
    const [transactions, setTransactions] = useState([]);
    const [display, setDisplay] = useState([false, 0, 0, '0', '0', '0', '0']);
    const [check, setChecked] = useState('NA');

    useEffect(() => {
        if (!readOnly) {
            transactionService.getAllAccoTranIDs(formData.accountID)
                .then(response => setTransactions(response))
                .catch(() => console.log('Wowzers!'));
            
            transactionService.getAccoTranID(formData.transactionType, formData.accountID)
                .then(response => handleAccoTranID(response))
                .catch(() => console.log('Whoops!'));
        }

    }, [formData.accountID, handleAccoTranID, formData.transactionType, readOnly]);

    useEffect(() => {
        if (!readOnly) {
            let listIDs = (formData.simpleTranID).split(' ');
            if (formData.amount.slice(-1) === 'R') {
                let sum = 0;
                for(let i = 0; i < listIDs.length; i++) {
                    let value = transactions.find(transaction => transaction.acco_tran_id === listIDs[i]) || {payable: '0R'};
                    if (value.payable) {
                        sum = sum + Number(value.payable.slice(0, -1));
                    }
                }
                let final = Number(formData.amount.slice(0, -1)) - sum;
                setChecked(final);
            } else {
                setChecked('NA');
            }
            if (check < 0) {
                handleButtonDisable(true);
            } else {
                handleButtonDisable(false);
            }
        }
    }, [formData.amount, formData.simpleTranID, transactions, check, handleButtonDisable, readOnly])

    const displayTransactionDetails = (e) => {
        let received = e.currentTarget.getAttribute('data-received');
        let receivable = e.currentTarget.getAttribute('data-receivable');
        let paid = e.currentTarget.getAttribute('data-paid');
        let payable = e.currentTarget.getAttribute('data-payable');
        setDisplay([true, e.clientX, e.clientY, received, receivable, paid, payable]);
    }

    const resetDisplay = (e) => {
        setDisplay([false, 0, 0, '0', '0', '0', '0']);
    }

    return (
        <>
            {/* First row. */}
            <div className="row my-2"> 
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Amount" name="amount" value={formData.amount} onInput={(e) => handleTextChange(e)} />
                        <button className="btn btn-outline-secondary" type="button" data-tag="G" onClick={(e) => handleAmountTagChange(e)}>G</button>
                        <button className="btn btn-outline-secondary" type="button" data-tag="R" onClick={(e) => handleAmountTagChange(e)}>R</button>
                    </div>
                </div>
            </div>
            {/* Second row. */}
            <div className="row my-2"> 
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <textarea className="form-control" rows="3" placeholder="Remarks..." name="remarks" value={formData.remarks} onInput={(e) => handleTextChange(e)}></textarea>
                </div>
            </div>
            {/* Third row. */}
            <div className="row my-2"> 
                <div className="col">
                    <p></p>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Fourth row. */}
            <div className="row my-2"> 
                <div className="col">
                    <p></p>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Fifth row. */}
            <div className="row my-2"> 
                <div className="col">
                    <p></p>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Sixth row. */}
            <div className="row my-2"> 
                <div className="col">
                    <p></p>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Transactions Selectables box. */}
            <div className="col border border-3 rounded" style={{position: 'absolute', width: '45%', height: '200px', top: readOnly ? '18.5%' : '22.5%', left: '2.75%', minWidth: '186px', maxWidth: '372px', backgroundColor: 'silver', overflowY: 'scroll'}}>
                {
                    transactions.map((transaction) => (
                        <div key={transaction.acco_tran_id} className="row card mx-2 my-2"
                            data-name="simpleTranID"
                            data-value={transaction.acco_tran_id}
                            data-received={transaction.received}
                            data-receivable={transaction.receivable}
                            data-paid={transaction.paid}
                            data-payable={transaction.payable}
                            onClick={(e) => handleTransactionClick(e)}
                            onMouseEnter={(e) => displayTransactionDetails(e)}
                            onMouseLeave={(e) => resetDisplay(e)}>
                            <span>{transaction.acco_tran_id}</span>
                        </div>
                    ))
                }
            </div>
            {/* Transactions balance check. */}
            <div className="col" style={{position: 'absolute', width: '45%', height: '200px', top: '86%', left: '5.75%', minWidth: '186px', maxWidth: '372px'}}>
                <span>Check: </span><span>{check}</span>
            </div>
            {/* Transferrables box. */}
            <div className="col border border-3 rounded" style={{position: 'absolute', width: '45%', height: '81px', top: readOnly ? '70%' : '72%', left: '52.5%', minWidth: '186px', maxWidth: '372px', backgroundColor: 'silver'}}>
                <div className="row mx-2 my-2">
                    <div className="col-7 mt-1">
                        <span>Customer Paid = </span>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control form-control-sm" placeholder="0" value={formData.cPaid} name="cPaid" onInput={(e) => handleTextChange(e)} />
                    </div>
                </div>
                <div className="row text-end mx-2">
                    <span>Account's Transaction ID: {formData.accoTranID}</span>
                </div>
            </div>
            {
                display[0] && <DataPopup data={display} />
            }
        </>
    )
};

export default Taken;