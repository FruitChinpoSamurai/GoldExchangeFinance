import React from "react";
import Record from "../Record";

const AccountsRecords = ({ accounts, searched, clickHandle }) => {
    const accountsFiltered = accounts
                                .filter(account => (
                                    (account.acco_id).includes(searched) ||
                                    (account.cust_id).includes(searched) ||
                                    ((account.cust_name).toLocaleLowerCase()).includes(searched.toLocaleLowerCase()) ||
                                    (account.cust_primary_number).includes(searched)
                                ))

    return (
        <div className="col mt-5 mb-2 mx-3">
            {
                searched === '' && accounts.length !== 0 ?
                    accounts
                        .map(account => (
                            <Record key={account.acco_id} data={account} clickHandle={clickHandle} />
                        )) :
                    accountsFiltered
                        .map(account => (
                            <Record key={account.acco_id} data={account} clickHandle={clickHandle} />
                        ))
            }
            {
                accountsFiltered.length === 0 &&
                    <div className="text-center fs-1">  
                        No relevant records found.
                    </div>
            }
        </div>
    )
}

export default AccountsRecords;