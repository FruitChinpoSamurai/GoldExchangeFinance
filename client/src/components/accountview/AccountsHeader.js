import React from "react";

const AccountsHeader = ({ returnClickHandle, searched, searchHandle }) => {
    return (
        <div className="row mx-0 mt-1">
            <div className="col mt-2">
                <button className="btn btn-lg" style={{backgroundColor:"grey", color:"white"}} onClick={() => returnClickHandle('Dashboard')}>Back</button>
            </div>
            <div className="col mt-1">
                <input type="text" className="col form-control form-control-lg mt-1 mx-auto" placeholder="Search..." value={searched} onChange={searchHandle} />
            </div>
        </div>
    )
}

export default AccountsHeader;