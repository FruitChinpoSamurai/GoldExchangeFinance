import React, { useState } from "react";
import BusinessStatementHeader from "./BusinessStatementHeader";
import BusinessStatementTransactions from "./BusinessStatementTransactions";

const BusinessStatement = ({ returnClickHandle, title }) => {
    const [date, setDate] = useState('');
    const [searched, setSearched] = useState('')

    const searchHandle = (e) => {
        setSearched(e.target.value);
    };

    return (
        <div className="container-fluid">
            <div className="mx-auto border border-3 rounded mt-3 mb-3" style={{backgroundColor:"#D3C074"}}>
                <BusinessStatementHeader returnClickHandle={returnClickHandle} title={title} date={date} handleDateChange={setDate} searched={searched} searchHandle={searchHandle} />
                {
                    title !== '' && date  !== '' && <BusinessStatementTransactions title={title} date={date} searched={searched} />
                }
            </div>
        </div>
    )
};

export default BusinessStatement;