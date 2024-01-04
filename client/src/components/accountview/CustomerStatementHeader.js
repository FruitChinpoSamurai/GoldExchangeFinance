import React from "react";

const CustomerStatementHeader = ({ data, returnClickHandle, flag, searched, searchHandle }) => {

    return (
        <div className="col mx-2 mt-2 mb-2">
            <div className="row">
                <div className="col">
                    <button className="btn" style={{backgroundColor:"grey", color:"white"}} onClick={() => returnClickHandle('Accounts', {}, flag)}>Back</button>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <span>Account ID: </span>
                            <span className="fw-semibold">{data.acco_id}</span><br/>
                            <span>Customer ID: </span>
                            <span className="fst-italic">{data.cust_id}</span>                      
                        </div>
                        <div className="col text-end">
                            <span>{data.cust_name}</span><br/>
                            <span>{data.cust_primary_number}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col mt-1">
                    <input type="text" className="col form-control mt-1 mx-auto" placeholder="Search by Date, Tr. ID, Sample, Pure, and Rate..." value={searched} onChange={searchHandle} />
                </div>
            </div>
        </div>
    )
};

export default CustomerStatementHeader;