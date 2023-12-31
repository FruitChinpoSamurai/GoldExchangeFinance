import React, { useEffect, useState } from "react";
import DashboardItem from "./DashboardItem";
import Customers from "./customerview/Customers";
import Accounts from "./accountview/Accounts";
import NewAndEditTransaction from "./NewAndEditTransaction";
import BusinessDashboard from "./businessview/BusinessDashboard";
import Calculator from "./Calculator";
import AlertPopup from "./AlertPopup";

const Dashboard = () => {
    const [one, setOne] = useState('#CDB450');
    const [two, setTwo] = useState('#CDB450');
    const [three, setThree] = useState('#CDB450');
    const [four, setFour] = useState('#CDB450');
    const [five, setFive] = useState('#CDB450');
    const [six, setSix] = useState('#CDB450');
    const [clicked, setClicked] = useState('Dashboard');
    const [transactionAlert, setTransactionAlert] = useState('');
    const [custStatementHeader, setCustStatementHeader] = useState({});
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setTransactionAlert('');
        }, 3000);
    }, [transactionAlert]);

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

    const displayCalculator = (e) => {
        setDisplay(!display)
    }

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
                    />
                )

            case 'Business':
                return (
                    <BusinessDashboard 
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
                        <NewAndEditTransaction handleAlert={setTransactionAlert} successTransactionHandle={itemClicked} />
                        {
                            transactionAlert !== '' && <AlertPopup status={transactionAlert} />
                        }
                    </div>
                )
        }
    }

    return (
        <>
            <i className={`bi bi-calculator`} style={{fontSize: "2rem", color: 'white'}} onClick={(e) => displayCalculator(e)} ></i>
            {
                display && <Calculator />
            }
            {
                switchView(clicked)
            }
        </>
    )
}

export default Dashboard;