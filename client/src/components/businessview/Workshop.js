import React, { useEffect, useState } from "react";
import ActualUpdater from "../ActualUpdater";
import workshopService from "../../services/workshop";

const Workshop = ({ returnClickHandle }) => {
    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState([]);
    const [display, setDisplay] = useState(false);
    
    useEffect(() => {
        workshopService.getWorkshopData()
            .then(response => setData(response));
    }, []);

    const displayUpdater = (e) => {
        setDisplay(true);
        const rowData = e.target.dataset.value.split(' ');
        const dateCreated = data[rowData[0]].date_created;
        setUpdateData([rowData[1] === 'actual' ? data[rowData[0]].done_impure : data[rowData[0]].done_pure, dateCreated, rowData[1]]);
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
                                        <th scope="col">Total Impure</th>
                                        <th scope="col">Total Pure</th>
                                        <th scope="col">Done Impure</th>
                                        <th scope="col">Done Pure</th>
                                        <th scope="col">Diff. Impure</th>
                                        <th scope="col">Diff. Pure</th>
                                        <th scope="col">Actual Impure</th>
                                        <th scope="col">Missing Impure</th>
                                        <th scope="col" className="table-info"></th>
                                        <th scope="col">Workshop Impure</th>
                                        <th scope="col">Workshop Pure</th>
                                        <th scope="col">Workshop Mix (Pure)</th>
                                        <th scope="col">Final Pure</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {
                                        data.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.date_created}</td>
                                                <td>{item.total_impure}</td>
                                                <td>{item.total_pure}</td>
                                                <td>{item.done_impure}</td>
                                                <td>{item.done_pure}</td>
                                                <td>{item.diff_impure}</td>
                                                <td>{item.diff_pure}</td>
                                                <td data-value={`${index} actual`} style={{cursor: 'pointer'}} onClick={(e) => displayUpdater(e)}>{item.actual_impure}</td>
                                                <td>{item.missing_impure}</td>
                                                <td className="table-info"></td>
                                                <td data-value={`${index} shop`} style={{cursor: 'pointer'}} onClick={(e) => displayUpdater(e)}>{item.shop_impure}</td>
                                                <td>{item.shop_pure}</td>
                                                <td>{item.shop_mix}</td>
                                                <td>{item.final_pure}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Workshop;