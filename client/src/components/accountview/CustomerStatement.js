import React from "react";
import CustomerStatementHeader from "./CustomerStatementHeader";
import CustomerStatementTransactions from "./CustomerStatementTransactions";

const CustomerStatement = ({ data, returnClickHandle, flag }) => {

    return (
        <>
            <CustomerStatementHeader 
                data={data}
                returnClickHandle={returnClickHandle}
                flag={flag}
            />
            <CustomerStatementTransactions accountID={data.acco_id} />
        </>
    )
};

export default CustomerStatement;