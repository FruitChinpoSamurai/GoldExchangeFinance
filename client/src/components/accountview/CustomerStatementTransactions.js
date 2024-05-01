import React, { useEffect, useState } from "react";
import customerStatmentService from "../../services/statementCustomer";
import transactionService from "../../services/transaction";
import DataPopup from "../DataPopup";
import AlertPopup from "../AlertPopup";
import NewAndEditTransaction from "../NewAndEditTransaction"
import printService from "../ReceiptPrint";
import bigPrintService from "../TestPrint";

const CustomerStatementTransactions = ({ accountID, searched, data, globalRates }) => {
    const [transactions, setTransactions] = useState([]);
    const [display, setDisplay] = useState([false, 0, 0, '']);
    const [view, setView] = useState(false);
    const [transactionAlert, setTransactionAlert] = useState('');
    const [displayTransaction, setDisplayTransaction] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [editReceiptData, setEditReceiptData] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setTransactionAlert('');
        }, 3000);
    }, [transactionAlert]);

    useEffect(() => {
        let balances = { cash: 0, gold: 0, sample: 0 };
        let updateCurrBalances = [];
        customerStatmentService.getAllByID(accountID)
            .then(response => {
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
                    tn['cBalance'] = Number(balances.cash) - cReceived + cReceivable + cPaid - cPayable;
                    tn['gBalance'] = Number(balances.gold).toFixed(2);
                    tn['sBalance'] = Number(balances.sample).toFixed(2);
                    if (tran_id === 'TE') {
                        tn['sBalance'] = (Math.round((Number(balances.sample) - gReceived + gReceivable + gPaid) * 100) / 100).toFixed(2);
                        tn['gBalance'] = (Math.round((Number(balances.gold) - gReceived + gReceivable - gPayable) * 100) / 100).toFixed(2);
                    } else if (tran_id === 'IM') {
                        tn['sBalance'] = (Math.round((Number(balances.sample) - Number(tn.pure_weight)) * 100) / 100).toFixed(2);
                    } else if (tran_id === 'EX') {
                        tn['sBalance'] = (Math.round((Number(balances.sample) - gReceived + gReceivable + gPaid - gPayable) * 100) / 100).toFixed(2);
                    } else if (tran_id === 'BT') {
                        tn['sBalance'] = (Math.round((Number(balances.sample) - Number(tn.pure_weight)) * 100) / 100).toFixed(2);
                        tn['gBalance'] = (Math.round((Number(balances.gold) + gPaid - gPayable) * 100) / 100).toFixed(2);
                    } else if (tran_id === 'PB' || tran_id === 'PS') {
                        tn['gBalance'] = (Math.round((balances.gold - gReceived + gReceivable + gPaid - gPayable) * 100) / 100).toFixed(2);
                    } else if (tran_id === 'BI') {
                        tn['gBalance'] = (Math.round((balances.gold - gReceived + gReceivable) * 100) / 100).toFixed(2);
                    } else if (tran_id === 'BO') {
                        tn['gBalance'] = (Math.round((balances.gold + gPaid - gPayable) * 100) / 100).toFixed(2);
                    } else if (tran_id === 'TA' || tran_id === 'AD') {
                        tn['gBalance'] = (Math.round((balances.gold + gPaid) * 100) / 100).toFixed(2);
                    } else if (tran_id === 'GI' || tran_id === 'LO') {
                        tn['gBalance'] = (Math.round((balances.gold - gReceived) * 100) / 100).toFixed(2);
                    }
                    balances = {
                        cash: tn.cBalance,
                        gold: tn.gBalance,
                        sample: tn.sBalance
                    };
                    updateCurrBalances.push([tn.tran_id, `${balances.cash} ${balances.gold} ${balances.sample}`]);
                });
                return response;
            })
            .then((adjustedTransactions) => {
                setView(true);
                setTransactions(adjustedTransactions);
                customerStatmentService.updateCustomerBalances(balances, Number(accountID))
                    .then(response => {
                        if (data.created) {
                            const currBalance = `${balances.cash} ${balances.gold} ${balances.sample}`
                            const receiptData = data.receiptData;
                            receiptData['transaction']['current_balance'] = currBalance;
                            printService.receiptPrint(false, receiptData);
                            transactionService.updateTransactionClosingBalance(data.acco_id, data.acco_tran_id, { balance: currBalance }).then(() => void(response))
                        }
                        if (refresh) {
                            const currBalance = (updateCurrBalances.filter((idAndBalance) => idAndBalance[0] === displayTransaction[2]))[0][1];
                            const receiptData = editReceiptData;
                            receiptData['transaction']['current_balance'] = currBalance;
                            printService.receiptPrint(false, receiptData, `${balances.cash} ${balances.gold} ${balances.sample}`);
                            transactionService.updateTransactionClosingBalance(data.acco_id, data.acco_tran_id, { balances: updateCurrBalances, updateFrom: displayTransaction[2] }).then(() => void(response))
                            setRefresh(false);
                        }
                        if (data.receiptData) {
                            if (data.receiptData.is_testing && (data.receiptData.transaction.points !== null)) {
                                bigPrintService.print(data.receiptData, globalRates.current.buyRate);
                            }
                        }
                        if (editReceiptData && !refresh) {
                            if (editReceiptData.is_testing && (editReceiptData.transaction.points !== null)) {
                                bigPrintService.print(editReceiptData, globalRates.current.buyRate);
                            }
                        }
                    });
            })
            // .catch(() => console.log("Yabai!"))
    }, [accountID, refresh, data, displayTransaction, editReceiptData, globalRates]);

    const displayTransactionDetails = (e) => {
        transactionService.getTakenGivenRelateds(accountID, e.currentTarget.innerHTML)
            .then(response => setDisplay([true, e.clientX, e.clientY, response]))
            .catch(() => console.log("OH NYO!"));
    }

    const resetDisplay = (e) => {
        setDisplay([false, 0, 0, '']);
    }

    useEffect(() => {
        if (transactions.length > 0) {
            const filtered = transactions.filter(transaction => (
                (transaction.date_created.split(' ')[0]).includes(searched) ||
                (transaction.acco_tran_id).includes(searched) ||
                (transaction.pure_weight && (transaction.pure_weight).includes(searched)) ||
                (transaction.total_sample_weight && (transaction.total_sample_weight).includes(searched)) ||
                (transaction.rate && (transaction.rate.toString()).includes(searched))
            ))
            setFilteredTransactions(filtered)
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
                        <th scope="col">Taken Cash</th>
                        <th scope="col">Taken Gold</th>
                        <th scope="col">Charges</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Received</th>
                        <th scope="col">Receivable</th>
                        <th scope="col">Paid</th>
                        <th scope="col">Payable</th>
                        <th scope="col">C-Balance</th>
                        <th scope="col">G-Balance</th>
                        <th scope="col">S-Balance</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {
                        searched === '' && transactions.length !== 0 ?
                            view && transactions.map((transaction, index, {length}) => (
                                <tr key={index} data-bs-toggle="modal" data-bs-target="#transactionEditCreate" onClick={() => setDisplayTransaction([transaction.acco_id, transaction.acco_tran_id, transaction.tran_id])} style={{ cursor: 'pointer' }}>
                                    <td>{transaction.date_created.split(' ')[0]}</td>
                                    {
                                        transaction.acco_tran_id.slice(0, 2) === 'TA' || transaction.acco_tran_id.slice(0, 2) === 'GI' ?
                                        <td onMouseEnter={(e) => displayTransactionDetails(e)} onMouseLeave={(e) => resetDisplay(e)} >{transaction.acco_tran_id}</td> :
                                        <td>{transaction.acco_tran_id}</td>
                                    }
                                    <td>{transaction.total_sample_weight}</td>
                                    <td>{transaction.pure_weight}</td>
                                    <td>{transaction.taken_cash}</td>
                                    <td>{transaction.taken_gold}</td>
                                    <td>{transaction.charges}</td>
                                    <td>{transaction.rate}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.received}</td>
                                    <td>{transaction.receivable}</td>
                                    <td>{transaction.paid}</td>
                                    <td>{transaction.payable}</td>
                                    {
                                        index === length - 1 ?
                                            <>
                                                <td><b>{transaction.cBalance}</b></td>
                                                <td><b>{transaction.gBalance}</b></td>
                                                <td><b>{transaction.sBalance}</b></td>
                                            </> :
                                            <>
                                                <td>{transaction.cBalance}</td>
                                                <td>{transaction.gBalance}</td>
                                                <td>{transaction.sBalance}</td>
                                            </>
                                    }
                                </tr>
                            )) :
                            view && filteredTransactions.map((transaction, index, {length}) => (
                                <tr key={index} data-bs-toggle="modal" data-bs-target="#transactionEditCreate" onClick={() => setDisplayTransaction([transaction.acco_id, transaction.acco_tran_id])} style={{ cursor: 'pointer' }}>
                                    <td>{transaction.date_created.split(' ')[0]}</td>
                                    {
                                        transaction.acco_tran_id.slice(0, 2) === 'TA' || transaction.acco_tran_id.slice(0, 2) === 'GI' ?
                                        <td onMouseEnter={(e) => displayTransactionDetails(e)} onMouseLeave={(e) => resetDisplay(e)} >{transaction.acco_tran_id}</td> :
                                        <td>{transaction.acco_tran_id}</td>
                                    }
                                    <td>{transaction.total_sample_weight}</td>
                                    <td>{transaction.pure_weight}</td>
                                    <td>{transaction.taken_cash}</td>
                                    <td>{transaction.taken_gold}</td>
                                    <td>{transaction.charges}</td>
                                    <td>{transaction.rate}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.received}</td>
                                    <td>{transaction.receivable}</td>
                                    <td>{transaction.paid}</td>
                                    <td>{transaction.payable}</td>
                                    {
                                        index === length - 1 ?
                                            <>
                                                <td><b>{transaction.cBalance}</b></td>
                                                <td><b>{transaction.gBalance}</b></td>
                                                <td><b>{transaction.sBalance}</b></td>
                                            </> :
                                            <>
                                                <td>{transaction.cBalance}</td>
                                                <td>{transaction.gBalance}</td>
                                                <td>{transaction.sBalance}</td>
                                            </>
                                    }
                                </tr>
                            ))
                    }
                </tbody>
            </table>
            {
                display[0] && <DataPopup data={display} />
            }
            <NewAndEditTransaction transaction={displayTransaction} handleAlert={setTransactionAlert} handleRefresh={setRefresh} setEditReceiptData={setEditReceiptData} />
            {
                transactionAlert !== '' && <AlertPopup status={transactionAlert} />
            }
        </div>
    )
};

export default CustomerStatementTransactions;