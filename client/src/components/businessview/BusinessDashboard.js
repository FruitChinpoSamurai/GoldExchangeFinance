import React, { useState } from "react";
import DashboardItem from "../DashboardItem";
import BusinessStatement from "./BusinessStatement";

const Dashboard = ({ returnClickHandle }) => {
    const [one, setOne] = useState('#CDB450');
    const [two, setTwo] = useState('#CDB450');
    const [three, setThree] = useState('#CDB450');
    const [four, setFour] = useState('#CDB450');
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
        // {
        //     title: "Ranged",
        //     logo: "bi-calendar-range",
        //     setter: setThree,
        //     color: three
        // },
        {
            title: "Expenses",
            logo: "bi-bag",
            setter: setFour,
            color: four
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