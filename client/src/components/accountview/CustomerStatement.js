import React, { useState } from "react";
import CustomerStatementHeader from "./CustomerStatementHeader";
import CustomerStatementTransactions from "./CustomerStatementTransactions";

const CustomerStatement = ({ data, returnClickHandle, flag, globalRates }) => {
    const [searched, setSearched] = useState('')

    const searchHandle = (e) => {
        setSearched(e.target.value);
    };

    return (
        <>
            <CustomerStatementHeader 
                data={data}
                returnClickHandle={returnClickHandle}
                flag={flag}
                searched={searched}
                searchHandle={searchHandle}
            />
            <CustomerStatementTransactions accountID={data.acco_id} searched={searched} data={data} globalRates={globalRates} />
        </>
    )
};

export default CustomerStatement;