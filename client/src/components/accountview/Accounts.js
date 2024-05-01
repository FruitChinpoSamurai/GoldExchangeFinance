import React, { useState, useEffect } from "react";
import AccountsHeader from "./AccountsHeader";
import AccountsRecords from "./AccountsRecords";
import CustomerStatement from "./CustomerStatement";
import accountService from "../../services/account";

const Accounts = ({ returnClickHandle, data, globalRates }) => {
    const [accounts, setAccounts] = useState([]);
    const [viewAccount, setViewAccount] = useState({});
    const [searched, setSearched] = useState('');
    const [clicked, setClicked] = useState('Accounts');
    const [shortcutFlag, setShortcutFlag] = useState(false);

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            setClicked('Statement');
            setViewAccount(data);
            setShortcutFlag(true);
        } else {
            accountService
              .getAllAccounts()
              .then(accounts => {
                setAccounts(accounts);
              })
        }
      }, [data]);

    const searchHandle = (e) => {
        setSearched(e.target.value);
    };

    const itemClicked = (view, gotData, flag) => {
        setClicked(view);
        setViewAccount(gotData);
        if (flag) {
            returnClickHandle('Dashboard');
        }
    };

    const switchView = (view) => {
        switch (view) {
            case 'Statement':
                return (
                    <div className="container-fluid">
                        <div className="mx-auto border border-3 rounded mt-3 mb-3" style={{backgroundColor:"#D3C074"}}>
                            <CustomerStatement 
                                data={viewAccount}
                                returnClickHandle={itemClicked}
                                flag={shortcutFlag}
                                globalRates={globalRates}
                            />
                        </div>
                    </div>
                )

            // The default case is to display the Accounts.
            default:
                return (
                    <div className="container">                    
                        <div className="mx-auto border border-3 rounded mt-5 mb-5" style={{backgroundColor:"#D3C074"}}>
                            <AccountsHeader 
                                returnClickHandle={returnClickHandle}
                                searched={searched}
                                searchHandle={searchHandle}
                            />
                            <AccountsRecords 
                                accounts={accounts}
                                searched={searched}
                                clickHandle={itemClicked}
                            />
                        </div>
                    </div>
                )
        }
    }

    return (
        <>
            {
                switchView(clicked)
            }
        </>
    )
}

export default Accounts;