import React, { useEffect, useState } from "react";
import ActualUpdater from "../ActualUpdater";
import workshopService from "../../services/workshop";

const Workshop = ({ returnClickHandle }) => {
    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState([]);
    const [display, setDisplay] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [sendoffTotals, setSendoffTotals] = useState({ impure: 0, pure: 0, diff_impure: 0, diff_pure: 0 });
    
    useEffect(() => {
        workshopService.getWorkshopData()
            .then(response => setData(response));
        workshopService.getFinalizedTransactions()
            .then(response => setTransactions(response));
    }, []);

    const displayUpdater = (e) => {
        setDisplay(true);
        const rowData = e.target.dataset.value.split(' ');
        const dateCreated = data[rowData[0]].date_created;
        setUpdateData([rowData[1] === 'actual' ? data[rowData[0]].to_workshop_impure : data[rowData[0]].to_workshop_pure, dateCreated, rowData[1]]);
    }

    const handleSendOff = (e, impure, pure) => {
        if (e.currentTarget.style.backgroundColor === 'grey') {
            e.currentTarget.style.backgroundColor = 'green';
            const newSendoffTotals = {
                ...sendoffTotals,
                impure: sendoffTotals.impure + Number(impure),
                pure: sendoffTotals.pure + Number(pure),
                diff_impure: sendoffTotals.impure + Number(impure) === 0 ? 0 : Math.round((data[0].finalized_impure - (sendoffTotals.impure + Number(impure))) * 100) / 100,
                diff_pure: sendoffTotals.impure + Number(impure) === 0 ? 0 : Math.round((data[0].finalized_pure - (sendoffTotals.pure + Number(pure))) * 100) / 100
            };
            setSendoffTotals(newSendoffTotals);
        } else {
            e.currentTarget.style.backgroundColor = 'grey';
            const newSendoffTotals = {
                ...sendoffTotals,
                impure: sendoffTotals.impure - Number(impure),
                pure: sendoffTotals.pure - Number(pure),
                diff_impure: sendoffTotals.impure - Number(impure) === 0 ? 0 : Math.round((data[0].finalized_impure - (sendoffTotals.impure - Number(impure))) * 100) / 100,
                diff_pure: sendoffTotals.impure - Number(impure) === 0 ? 0 : Math.round((data[0].finalized_pure - (sendoffTotals.pure - Number(pure))) * 100) / 100
            };
            setSendoffTotals(newSendoffTotals);
        }
    }

    const handleSendOffUpdate = () => {
        const currentDate = new Date().toLocaleString().split(', ')[0];
        const body = { ...sendoffTotals, date_created: currentDate };
        workshopService.updateWorkshopSendoffs(body)
            .then(response => setData(response));
    }

    return (
        <div className="container-fluid">
            <div className="mx-auto border border-3 rounded mt-3 mb-3" style={{backgroundColor:"#D3C074"}}>
                <div className="col mx-2 mt-2 mb-2">
                    <div className="row">
                        <div className="col">
                            <button className="btn" style={{backgroundColor: "grey", color: "white"}} onClick={() => returnClickHandle('Dashboard')}>Back</button>
                        </div>
                        <div className="col" style={{ textAlignLast: "end" }}>
                            {
                                display && 
                                    <div className="col">
                                        <ActualUpdater updateData={updateData} handleDisplay={setDisplay} handleTableUpdate={setData} />
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <table className="table table-striped table-hover table-bordered text-center">
                                <thead className="table-warning">
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Finalized Impure</th>
                                        <th scope="col">Finalized Pure</th>
                                        <th scope="col">To Workshop Impure</th>
                                        <th scope="col">To Workshop Pure</th>
                                        <th scope="col">Remaining Impure</th>
                                        <th scope="col">Remaining Pure</th>
                                        <th scope="col">Actual Impure</th>
                                        <th scope="col">Missing Impure</th>
                                        <th scope="col" className="table-info"></th>
                                        <th scope="col">Impure at Workshop</th>
                                        <th scope="col">Workshop Missing Impure</th>
                                        <th scope="col" className="table-info"></th>
                                        <th scope="col">Pure at Workshop</th>
                                        <th scope="col">Workshop Mix (Impure)</th>
                                        <th scope="col">Points</th>
                                        <th scope="col">Workshop Mix (Pure)</th>
                                        <th scope="col">Final Pure</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider" style={{ maxHeight: '250px', overflow: 'auto' }}>
                                    {
                                        data.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.date_created}</td>
                                                <td>{item.finalized_impure}</td>
                                                <td>{item.finalized_pure}</td>
                                                <td>{item.to_workshop_impure}</td>
                                                <td>{item.to_workshop_pure}</td>
                                                <td>{item.remaining_impure}</td>
                                                <td>{item.remaining_pure}</td>
                                                <td data-value={`${index} actual`} style={{cursor: 'pointer'}} onClick={(e) => displayUpdater(e)}>{item.actual_impure}</td>
                                                <td>{item.missing_impure}</td>
                                                <td className="table-info"></td>
                                                <td data-value={`${index} shop`} style={{cursor: 'pointer'}} onClick={(e) => displayUpdater(e)}>{item.impure_at_workshop}</td>
                                                <td>{item.workshop_missing_impure}</td>
                                                <td className="table-info"></td>
                                                <td>{item.pure_at_workshop}</td>
                                                <td>{item.workshop_mix_impure}</td>
                                                <td>{item.points}</td>
                                                <td>{item.workshop_mix_pure}</td>
                                                <td>{item.final_pure}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mx-1 my-1">
                        <div className="col">
                            <span>{sendoffTotals.impure} | {sendoffTotals.pure} | {sendoffTotals.diff_impure} | {sendoffTotals.diff_pure}</span>
                        </div>
                        <div className="col" style={{ textAlignLast: "end" }}>
                            <button className="btn" style={{backgroundColor:"grey", color:"white"}} disabled={sendoffTotals.impure === 0 ? true : false} onClick={() => handleSendOffUpdate()}>Confirm</button>
                        </div>
                    </div>
                    <div className="row mx-1" style={{ maxHeight: '250xpx', overflow: 'auto', backgroundColor: 'grey' }}>
                        {
                            transactions.map((transaction) => (
                                <div key={transaction.tran_id} className="row card my-2" style={{ marginInline: '0px' }}>
                                    <div className="row card-body ms-0">
                                        <div className="col-10 card-text mt-2">
                                            <span>{transaction.global_id} ||| {transaction.acco_id} : {transaction.acco_tran_id} : {transaction.test_id} ||| Sample: {transaction.total_sample_weight}G --- Pure: {transaction.pure_weight}G</span>
                                        </div>
                                        <div className="col text-end">
                                            <button className="btn" style={{backgroundColor:"grey", color:"white"}} onClick={(e) => handleSendOff(e, transaction.total_sample_weight, transaction.pure_weight)}>Send</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Workshop;