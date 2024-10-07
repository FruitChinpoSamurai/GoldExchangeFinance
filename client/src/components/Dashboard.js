import React, { useEffect, useState } from "react";
import DashboardItem from "./DashboardItem";
import Customers from "./customerview/Customers";
import Accounts from "./accountview/Accounts";
import NewAndEditTransaction from "./NewAndEditTransaction";
import SuggestedTransaction from "./SuggestedTransaction";
import BusinessDashboard from "./businessview/BusinessDashboard";
import Inventory from "./Inventory";
import Calculator from "./Calculator";
import AlertPopup from "./AlertPopup";
import readService from "./ScaleRead";
import RateSetter from "./RateSetter";
import transactionService from "../services/transaction";

const Dashboard = ({ globalRates, setGlobalReceipt }) => {
    const [one, setOne] = useState('#CDB450');
    const [two, setTwo] = useState('#CDB450');
    const [three, setThree] = useState('#CDB450');
    const [four, setFour] = useState('#CDB450');
    const [five, setFive] = useState('#CDB450');
    const [six, setSix] = useState('#CDB450');
    const [clicked, setClicked] = useState('Dashboard');
    const [transactionAlert, setTransactionAlert] = useState(null);
    const [searchAlert, setSearchAlert] = useState(null);
    const [custStatementHeader, setCustStatementHeader] = useState({});
    const [displayCalc, setDisplayCalc] = useState(false);
    const [displayRate, setDisplayRate] = useState(false);
    const [showScale, setShowScale] = useState(false);
    const [scaleReading, setScaleReading] = useState(0);
    const [globalSearchValue, setGlobalSearchValue] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setTransactionAlert(null);
            setSearchAlert(null);
        }, 3000);
    }, [transactionAlert, searchAlert]);

    const dashboardItems = [
        {
            title: "Customers",
            logo: "bi-person-square",
            setter: setOne,
            color: one
        },
        {
            title: "Accounts",
            logo: "bi-book",
            setter: setTwo,
            color: two
        },
        {
            title: "New Transaction",
            logo: "bi-coin",
            setter: setThree,
            color: three
        },
        {
            title: "Business",
            logo: "bi-clipboard2-data",
            setter: setFour,
            color: four
        },
        {
            title: "Reports",
            logo: "bi-graph-up",
            setter: setFive,
            color: five
        },
        {
            title: "Inventory",
            logo: "bi-list-columns",
            setter: setSix,
            color: six
        }
    ]

    const mouseEnter = (setter) => {
        setter('#DECC84');
    }

    const mouseLeave = (setter) => {
        setter('#CDB450');
    }

    const itemClicked = (view, data) => {
        setClicked(view);
        setCustStatementHeader({});
        setOne('#CDB450');
        setTwo('#CDB450');
        setThree('#CDB450');
        setFour('#CDB450');
        setFive('#CDB450');
        setSix('#CDB450');
        if (data) {
            if (Object.keys(data).length !== 0) {
                setCustStatementHeader(data);
            }
        }
    }

    const displayCalculator = () => {
        setDisplayCalc(!displayCalc)
    }

    const displayRateSetter = () => {
        setDisplayRate(!displayRate)
    }

    const handleScaleReading = () => {
        setShowScale(!showScale);
        readService.scaleRead(setScaleReading);
    }

    const searchHandle = (e) => {
        setGlobalSearchValue(e.target.value);
    };

    const searchForTransaction = () => {
        transactionService.getTransactionByGlobalID(globalSearchValue)
            .then(response => {
                if (response.status === 'true') {
                    itemClicked('Accounts', {...response});
                    setTimeout(() => {
                        setGlobalSearchValue('');
                    }, 2000);
                } else {
                    setTransactionAlert(response.status);
                    setSearchAlert(response.isSearch);
                }
            })
            .catch(response => {
                setTransactionAlert(response.status);
                setSearchAlert(response.isSearch);
            });
    };

    const switchView = (view) => {
        switch (view) {
            case 'Customers':
                return (
                    <Customers 
                        returnClickHandle={itemClicked}
                    />
                )

            case 'Accounts':
                return (
                    <Accounts 
                        returnClickHandle={itemClicked}
                        data={custStatementHeader}
                        globalRates={globalRates}
                        setGlobalReceipt={setGlobalReceipt}
                    />
                )

            case 'Business':
                return (
                    <BusinessDashboard 
                        returnClickHandle={itemClicked}
                    />
                )

            case 'Inventory':
                return (
                    <Inventory 
                        returnClickHandle={itemClicked}
                    />
                )

            // The default case is to display the dashboard.
            default:
                return (
                    <div className="container">
                        <div className="mx-auto border border-3 rounded mt-5 mb-5" style={{backgroundColor:"#D3C074"}}>
                            <div className="row row-cols-3 text-center">
                                {
                                    dashboardItems.map(item => (
                                        <DashboardItem 
                                            key={item.title}
                                            title={item.title}
                                            logo={item.logo}
                                            setter={item.setter}
                                            color={item.color}
                                            enterHandle={mouseEnter}
                                            leaveHandle={mouseLeave}
                                            clickHandle={itemClicked}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                        <NewAndEditTransaction handleAlert={setTransactionAlert} successTransactionHandle={itemClicked} scaleReading={scaleReading} setGlobalReceipt={setGlobalReceipt} />
                        {
                            transactionAlert !== null && <AlertPopup status={transactionAlert} isSearch={searchAlert} />
                        }
                    </div>
                )
        }
    }

    return (
        <>  
            <div className="row">
                <div className="col">
                    <i className="bi bi-calculator" style={{fontSize: "2rem", color: 'white', cursor: 'pointer'}} onClick={() => displayCalculator()}></i>
                    <i className="bi bi-journal-bookmark" style={{fontSize: "2rem", color: 'white', cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target="#transactionSuggested"></i>
                    <i className="bi bi-coin" style={{fontSize: "2rem", color: 'white', cursor: 'pointer'}} onClick={() => displayRateSetter()}></i>
                </div>
                {
                    clicked === 'Dashboard' ?
                        <div className="col" style={{ textAlign: 'center' }}>
                            <div className="input-group">
                                <input type="input" className="col form-control mx-auto" placeholder="Search Global ID..." value={globalSearchValue} onInput={(e) => searchHandle(e)}/>
                                <button className="btn btn-outline-secondary btn-light" type="button" onClick={() => searchForTransaction()}>Search</button>
                            </div>
                        </div> : <></>
                }
                <div className="col" style={{ textAlign: 'end' }}>
                    {
                        showScale && <span style={{ color: 'white', marginRight: '15px', borderRadius: '5px', borderColor: 'gold', borderStyle: 'solid', padding: '5px' }}>{scaleReading}g</span>
                    }   
                    <i className="bi bi-wallet-fill" style={{fontSize: "2rem", color: 'white', cursor: 'pointer', width: 'auto'}} onClick={async () => handleScaleReading()}></i>
                </div>
            </div>
            {
                displayCalc && <Calculator />
            }
            {
                displayRate && <RateSetter globalRates={globalRates} />
            }
            <SuggestedTransaction setGlobalReceipt={setGlobalReceipt} />
            {
                switchView(clicked)
            }
        </>
    )
}

export default Dashboard;