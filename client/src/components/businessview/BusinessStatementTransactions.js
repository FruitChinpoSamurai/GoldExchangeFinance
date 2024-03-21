import React, { useEffect, useState } from "react";
import businessStatmentService from "../../services/statementBusiness";
import transactionService from "../../services/transaction";
import DataPopup from "../DataPopup";
import DisplayTransaction from "../DisplayTransaction";

const BusinessStatementTransactions = ({ title, date, searched }) => {
    const [transactions, setTransactions] = useState([]);
    const [display, setDisplay] = useState([false, 0, 0, '']);
    const [view, setView] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('Update Balances for Next Day');
    const [displayTransaction, setDisplayTransaction] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    const currentDate = new Date().toLocaleString().split(', ')[0];
    
    useEffect(() => {
        let prevDate = new Date(date);
        if (title === 'Daily') {
            prevDate.setDate(prevDate.getDate() - 1);
        } else if (title === 'Monthly') {
            prevDate.setDate(0);
        } else if (title === 'Yearly') {
            prevDate.setFullYear(prevDate.getFullYear() - 1, 12, 0);
        }
        prevDate = prevDate.toLocaleString().split(', ')[0];
        businessStatmentService.getLatestBalances(prevDate.replaceAll("/", "-"))
            .then(latestBalances => {
                let balances = latestBalances;
                businessStatmentService.getAll(title, date.replaceAll("/", "-"))
                    .then(response => {
                        console.log(response)
                        const cRegex = /\d+R/;
                        const gRegex = /\d+\.?\d*G/;
                        response.forEach(tn => {
                            const tran_id = tn.acco_tran_id.slice(0, 2);
                            let cReceived = /R/.test(tn.received) ? Number((tn.received.match(cRegex)[0]).slice(0, -1)) : 0;
                            let cReceivable = /R/.test(tn.receivable) ? Number((tn.receivable.match(cRegex)[0]).slice(0, -1)) : 0;
                            let cPaid = /R/.test(tn.paid) ? Number((tn.paid.match(cRegex)[0]).slice(0, -1)) : 0;
                            let cPayable = /R/.test(tn.payable) ? Number((tn.payable.match(cRegex)[0]).slice(0, -1)) : 0;
                            let gReceived = /G/.test(tn.received) ? Number((tn.received.match(gRegex)[0]).slice(0, -1)) : 0;
                            let gReceivable = /G/.test(tn.receivable) ? Number((tn.receivable.match(gRegex)[0]).slice(0, -1)) : 0;
                            let gPaid = /G/.test(tn.paid) ? Number((tn.paid.match(gRegex)[0]).slice(0, -1)) : 0;
                            let gPayable = /G/.test(tn.payable) ? Number((tn.payable.match(gRegex)[0]).slice(0, -1)) : 0;
                            tn['cBalance'] = Number(balances.cash_balance) + cReceived - cPaid;
                            tn['gBalance'] = Number(balances.gold_balance).toFixed(2);;
                            tn['unCBalance'] = Number(balances.un_cash_balance) + cPaid - cPayable - cReceived + cReceivable;
                            tn['unGBalance'] = Number(balances.un_gold_balance).toFixed(2);
                            tn['sBalance'] = Number(balances.sample_balance).toFixed(2);
                            if (tran_id === 'TE') {
                                tn['sBalance'] = (Math.round((Number(balances.sample_balance) + gPaid - gPayable - gReceived) * 100) / 100).toFixed(2);
                                tn['unGBalance'] = (Math.round((Number(balances.un_gold_balance) + gPaid - gPayable + gReceivable) * 100) / 100).toFixed(2);
                                tn['gBalance'] = (Math.round((Number(balances.gold_balance) - gPaid) * 100) / 100).toFixed(2);
                            } else if (tran_id === 'IM') {
                                tn['sBalance'] = (Math.round((Number(balances.sample_balance) + Number(tn.pure_weight)) * 100) / 100).toFixed(2);
                            } else if (tran_id === 'EX') {
                                tn['sBalance'] = (Math.round((Number(balances.sample_balance) + gPaid - gPayable - gReceived + gReceivable) * 100) / 100).toFixed(2);
                                tn['gBalance'] = (Math.round((Number(balances.gold_balance) + gReceived - gPaid) * 100) / 100).toFixed(2);
                            } else if (tran_id === 'BT') {
                                tn['sBalance'] = (Math.round((Number(balances.sample_balance) + Number(tn.pure_weight)) * 100) / 100).toFixed(2);
                                tn['unGBalance'] = (Math.round((Number(balances.un_gold_balance) - gReceived + gReceivable) * 100) / 100).toFixed(2);
                                tn['gBalance'] = (Math.round((Number(balances.gold_balance) + gReceived + (/G/.test(tn.charges) ? Number(tn.charges.slice(0, -1)) : 0)) * 100) / 100).toFixed(2);
                            } else if (tran_id === 'PB' || tran_id === 'PS') {
                                tn['unGBalance'] = (Math.round((Number(balances.un_gold_balance) + gPaid - gPayable - gReceived + gReceivable) * 100) / 100).toFixed(2);
                                tn['gBalance'] = (Math.round((Number(balances.gold_balance) + gReceived - gPaid) * 100) / 100).toFixed(2);
                            } else if (tran_id === 'BI') {
                                tn['unGBalance'] = (Math.round((Number(balances.un_gold_balance) + gPaid - gPayable) * 100) / 100).toFixed(2);
                                tn['gBalance'] = (Math.round((Number(balances.gold_balance) + gReceived - gPaid) * 100) / 100).toFixed(2);
                            } else if (tran_id === 'BO') {
                                tn['unGBalance'] = (Math.round((Number(balances.un_gold_balance) - gReceived + gReceivable) * 100) / 100).toFixed(2);
                                tn['gBalance'] = (Math.round((Number(balances.gold_balance) + gReceived - gPaid) * 100) / 100).toFixed(2);
                            } else if (tran_id === 'TA' || tran_id === 'AD') {
                                tn['unGBalance'] = (Math.round((Number(balances.un_gold_balance) - gReceived) * 100) / 100).toFixed(2);
                                tn['gBalance'] = (Math.round((Number(balances.gold_balance) + gReceived - gPaid) * 100) / 100).toFixed(2);
                            } else if (tran_id === 'GI' || tran_id === 'LO') {
                                tn['unGBalance'] = (Math.round((Number(balances.un_gold_balance) + gPaid) * 100) / 100).toFixed(2);
                                tn['gBalance'] = (Math.round((Number(balances.gold_balance) + gReceived - gPaid) * 100) / 100).toFixed(2);
                            }
                            balances = {
                                cash_balance: tn.cBalance, 
                                gold_balance: tn.gBalance,
                                sample_balance: tn.sBalance,
                                un_cash_balance: tn.unCBalance,
                                un_gold_balance: tn.unGBalance
                            };
                        });
                        return response;
                    })
                    .then((adjustedTransactions) => {
                        setView(true);
                        setTransactions(adjustedTransactions);
                    })
            })
            // .catch(() => console.log("Yabai!"))
    }, [date, title]);

    const displayTransactionDetails = (e, id) => {
        transactionService.getTakenGivenRelateds(id, e.currentTarget.innerHTML)
            .then(response => setDisplay([true, e.clientX, e.clientY, response]))
            .catch(() => console.log("OH NYO!"));
    }

    const resetDisplay = (e) => {
        setDisplay([false, 0, 0, '']);
    }

    const updateBalances = (transaction) => {
        console.log(date);
        const balances = {
            date_updated: date,
            cash_balance: transaction.cBalance, 
            gold_balance: transaction.gBalance,
            sample_balance: transaction.sBalance,
            un_cash_balance: transaction.unCBalance,
            un_gold_balance: transaction.unGBalance
        }
        businessStatmentService.updateBalances(balances)
            .then(message => setUpdateMessage(message))
            .catch(() => setUpdateMessage('Something Went Wrong!'))
    }

    useEffect(() => {
        if (transactions.length > 0) {
            const filtered = transactions.filter(transaction => (
                (`${transaction.acco_id}-${transaction.acco_tran_id}`).includes(searched) ||
                (transaction.pure_weight && (transaction.pure_weight).includes(searched)) ||
                (transaction.total_sample_weight && (transaction.total_sample_weight).includes(searched)) ||
                (transaction.rate && (transaction.rate.toString()).includes(searched))
            ))
            setFilteredTransactions(filtered)
        } else {
            setFilteredTransactions(transactions)
        }
    }, [transactions, searched])

    return (
        <div className="mb-2 mx-2">
            <table className="table table-striped table-hover table-bordered text-center">
                <thead className="table-warning">
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Tr. ID</th>
                        <th scope="col">Sample</th>
                        <th scope="col">Pure</th>
                        <th scope="col">Given Cash</th>
                        <th scope="col">Given Gold</th>
                        <th scope="col">Charges</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Paid</th>
                        <th scope="col">Payable</th>
                        <th scope="col">Received</th>
                        <th scope="col">Receivable</th>
                        <th scope="col">C-Balance</th>
                        <th scope="col">G-Balance</th>
                        <th scope="col">S-Balance</th>
                        <th scope="col">UC-Balance</th>
                        <th scope="col">UG-Balance</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {
                        searched === '' && transactions.length !== 0 ?
                            view && transactions.map((transaction, index, {length}) => (
                                <tr key={index} data-bs-toggle="modal" data-bs-target="#transactionDisplay" onClick={() => setDisplayTransaction([transaction.acco_id, transaction.acco_tran_id])} style={{ cursor: 'pointer' }}>
                                    <td>{transaction.date_created.split(' ')[0]}</td>
                                    {
                                        transaction.acco_tran_id.slice(0, 2) === 'TA' || transaction.acco_tran_id.slice(0, 2) === 'GI' ?
                                        <td onMouseEnter={(e) => displayTransactionDetails(e, transaction.acco_id)} onMouseLeave={(e) => resetDisplay(e)} >{transaction.acco_id}-{transaction.acco_tran_id}</td> :
                                        <td>{transaction.acco_id}-{transaction.acco_tran_id}</td>
                                    }
                                    <td>{transaction.total_sample_weight}</td>
                                    <td>{transaction.pure_weight}</td>
                                    <td>{transaction.given_cash}</td>
                                    <td>{transaction.given_gold}</td>
                                    <td>{transaction.charges}</td>
                                    <td>{transaction.rate}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.paid}</td>
                                    <td>{transaction.payable}</td>
                                    <td>{transaction.received}</td>
                                    <td>{transaction.receivable}</td>
                                    {
                                        index === length - 1 ?
                                            <>
                                                <td><b>{transaction.cBalance}</b></td>
                                                <td><b>{transaction.gBalance}</b></td>
                                                <td><b>{transaction.sBalance}</b></td>
                                                <td><b>{transaction.unCBalance}</b></td>
                                                <td><b>{transaction.unGBalance}</b></td>
                                            </> :
                                            <>
                                                <td>{transaction.cBalance}</td>
                                                <td>{transaction.gBalance}</td>
                                                <td>{transaction.sBalance}</td>
                                                <td>{transaction.unCBalance}</td>
                                                <td>{transaction.unGBalance}</td>
                                            </>
                                    }
                                </tr>
                            )) :
                            view && filteredTransactions.map((transaction, index) => (
                                <tr key={index} data-bs-toggle="modal" data-bs-target="#transactionDisplay" onClick={() => setDisplayTransaction([transaction.acco_id, transaction.acco_tran_id])} style={{ cursor: 'pointer' }}>
                                    <td>{transaction.date_created.split(' ')[0]}</td>
                                    {
                                        transaction.acco_tran_id.slice(0, 2) === 'TA' || transaction.acco_tran_id.slice(0, 2) === 'GI' ?
                                        <td onMouseEnter={(e) => displayTransactionDetails(e, transaction.acco_id)} onMouseLeave={(e) => resetDisplay(e)} >{transaction.acco_id}-{transaction.acco_tran_id}</td> :
                                        <td>{transaction.acco_id}-{transaction.acco_tran_id}</td>
                                    }
                                    <td>{transaction.total_sample_weight}</td>
                                    <td>{transaction.pure_weight}</td>
                                    <td>{transaction.given_cash}</td>
                                    <td>{transaction.given_gold}</td>
                                    <td>{transaction.charges}</td>
                                    <td>{transaction.rate}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.paid}</td>
                                    <td>{transaction.payable}</td>
                                    <td>{transaction.received}</td>
                                    <td>{transaction.receivable}</td>
                                    <td>{transaction.cBalance}</td>
                                    <td>{transaction.gBalance}</td>
                                    <td>{transaction.sBalance}</td>
                                    <td>{transaction.unCBalance}</td>
                                    <td>{transaction.unGBalance}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
            {
                display[0] && <DataPopup data={display} />
            }
            {
                transactions.length !== 0 && date.split('/')[1] === currentDate.split('/')[1] &&
                    <div className="col text-center">
                        <button
                            className="btn"
                            style={{backgroundColor:"grey", color:"white", width:'fitContent'}}
                            type="button"
                            onClick={() => updateBalances(transactions[transactions.length - 1])}
                        >{updateMessage}</button>
                    </div>
            }
            <DisplayTransaction transaction={displayTransaction} />
        </div>
    )
};

export default BusinessStatementTransactions;