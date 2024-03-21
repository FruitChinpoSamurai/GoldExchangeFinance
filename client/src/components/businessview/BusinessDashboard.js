import React, { useState } from "react";
import DashboardItem from "../DashboardItem";
import BusinessStatement from "./BusinessStatement";
import Management from "./Management";
import Workshop from "./Workshop";

const Dashboard = ({ returnClickHandle }) => {
    const [one, setOne] = useState('#CDB450');
    const [two, setTwo] = useState('#CDB450');
    const [three, setThree] = useState('#CDB450');
    const [four, setFour] = useState('#CDB450');
    const [five, setFive] = useState('#CDB450');
    const [clicked, setClicked] = useState('Dashboard');
    const [type, setType] = useState('');

    const dashboardItems = [
        {
            title: "Daily",
            logo: "bi-calendar-day",
            setter: setOne,
            color: one
        },
        {
            title: "Monthly",
            logo: "bi-calendar-month",
            setter: setTwo,
            color: two
        },
        {
            title: "Yearly",
            logo: "bi-calendar-check",
            setter: setThree,
            color: three
        },
        {
            title: "Management",
            logo: "bi-bag",
            setter: setFour,
            color: four
        },
        {
            title: "Workshop",
            logo: "bi-hammer",
            setter: setFive,
            color: five
        }
    ]

    const mouseEnter = (setter) => {
        setter('#DECC84');
    }

    const mouseLeave = (setter) => {
        setter('#CDB450');
    }

    const itemClicked = (view, viewType) => {
        setClicked(view);
        setType(viewType);
        setOne('#CDB450');
        setTwo('#CDB450');
        setThree('#CDB450');
        setFour('#CDB450');
        setFive('#CDB450');
    }

    const switchView = (view) => {
        switch (view) {
            case 'Calender':
                return (
                    <BusinessStatement 
                        returnClickHandle={itemClicked}
                        title={type}
                    />
                )

            case 'Management':
                return (
                    <Management
                        returnClickHandle={itemClicked}
                    />
                )

            case 'Workshop':
                return (
                    <Workshop
                        returnClickHandle={itemClicked}
                    />
                )

            // The default case is to display the dashboard.
            default:
                return (
                    <>
                        <div className="container">
                            <div className="text-center mt-5">
                                <button className="btn" style={{backgroundColor:"grey", color:"white"}} onClick={() => returnClickHandle('Dashboard')}>Back</button>
                            </div>
                            <div className="mx-auto border border-3 rounded mt-5 mb-5" style={{backgroundColor:"#D3C074", maxWidth:'850px'}}>
                                <div className="row row-cols-2 text-center">
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
                        </div>
                    </>
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

export default Dashboard;