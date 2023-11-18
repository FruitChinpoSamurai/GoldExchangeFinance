import React from "react";

const RecordModalView = ({ customer, accounts, handleAccounts }) => {
    return (
        <div className="modal fade" id="recordModalView" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">{customer.cust_id} - {customer.cust_name}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => handleAccounts([])}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <span className="fw-semibold">Primary Number:</span><span> {customer.cust_primary_number}</span><br/>
                                <span className="fw-semibold">Alternate Number:</span><span> {customer.cust_alternate_number}</span><br/>
                                <span className="fw-semibold">NIC:</span><span> {customer.cust_nic}</span><br/>
                                <span className="fw-semibold">Email:</span><span> {customer.cust_email}</span><br/>
                                <span className="fw-semibold">PTCL Number:</span><span> {customer.cust_ptclf_number}</span><br/>
                                <span className="fw-semibold">Alternate PTCL Number:</span><span> {customer.cust_ptcls_number}</span><br/>
                                <span className="fw-semibold">Shop Address:</span><span> {customer.cust_shop_address}</span><br/>
                                <span className="fw-semibold">Reference:</span><span> {customer.cust_reference}</span><br/>
                            </div>
                            <div className="col">
                                <span className="fw-semibold">Test Fees:</span><span> {customer.cust_test_fees}</span><br/>
                                <span className="fw-semibold">Charges Per Gram:</span><span> {customer.cust_pg_charges}</span><br/><br/>
                                <span className="fw-semibold">Accounts: </span><br/>
                                {
                                    accounts.map(account => (
                                        <>
                                            <span className="ms-3" key={account.acco_id + account.acco_id}>{account.acco_id}</span><br/>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecordModalView;