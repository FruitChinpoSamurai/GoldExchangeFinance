import React, { useEffect, useState } from "react";

const BusinessStatementHeader = ({ returnClickHandle, title, date, handleDateChange, searched, searchHandle }) => {
    const [allowNextDate, setAllowNextDate] = useState(true);

    useEffect(() => {
        const currentDate = new Date();
        if (title === 'Monthly') {
            currentDate.setMonth(currentDate.getMonth() + 1, 0);
        } else if (title === 'Yearly') {
            currentDate.setFullYear(currentDate.getFullYear(), 12, 0);
        }
        handleDateChange(currentDate.toLocaleString().split(', ')[0]);
    }, [title, handleDateChange]);

    const devanceDate = (date = new Date()) => {
        setAllowNextDate(false);
        const previousDate = new Date(date.getTime());
        if (title === 'Daily') {
            previousDate.setDate(date.getDate() - 1);
        } else if (title === 'Monthly') {
            previousDate.setDate(0);
        } else if (title === 'Yearly') {
            previousDate.setFullYear(date.getFullYear() - 1);
        }
        handleDateChange(previousDate.toLocaleString().split(', ')[0]);
    }

    const advanceDate = (date = new Date()) => {
        const nextDate = new Date(date.getTime());
        const currentDate = new Date();
        if (title === 'Daily') {
            nextDate.setDate(date.getDate() + 1);
            if (nextDate < currentDate) {
                handleDateChange(nextDate.toLocaleString().split(', ')[0]);
                if (nextDate.toLocaleString().split(', ')[0].split('/')[1] === currentDate.toLocaleString().split(', ')[0].split('/')[1]) {
                    setAllowNextDate(true);
                }
            } else {
                setAllowNextDate(true);
            }
        } else if (title === 'Monthly') {
            nextDate.setMonth(date.getMonth() + 2, 0);
            currentDate.setMonth(currentDate.getMonth() + 1, 0);
            if (nextDate < currentDate) {
                handleDateChange(nextDate.toLocaleString().split(', ')[0]);
                if (nextDate.toLocaleString().split(', ')[0].split('/')[0] === currentDate.toLocaleString().split(', ')[0].split('/')[0]) {
                    setAllowNextDate(true);
                }
            } else {
                setAllowNextDate(true);
            }
        } else if (title === 'Yearly') {
            nextDate.setFullYear(date.getFullYear() + 1);
            currentDate.setFullYear(currentDate.getFullYear(), 12, 0);
            if (nextDate < currentDate) {
                handleDateChange(nextDate.toLocaleString().split(', ')[0]);
                if (nextDate.toLocaleString().split(', ')[0].split('/')[2] === currentDate.toLocaleString().split(', ')[0].split('/')[2]) {
                    setAllowNextDate(true);
                }
            } else {
                setAllowNextDate(true);
            }
        }
    }

    return (
        <div className="col mx-2 mt-2 mb-2">
            <div className="row">
                <div className="col">
                    <button className="btn" style={{backgroundColor:"grey", color:"white"}} onClick={() => returnClickHandle('Accounts')}>Back</button>
                </div>
                <div className="col text-center">
                    {
                        date === '' ?
                            <span className="fs-3">{title}</span> :
                            <span className="fs-3">{title} | {date}</span>
                    }
                </div>
                <div className="col text-end">
                    <button className="btn ms-2" style={{backgroundColor:"grey", color:"white"}} onClick={() => devanceDate(new Date(date))}>Prev</button>
                    <button className="btn ms-2" style={{backgroundColor:"grey", color:"white"}} onClick={() => advanceDate(new Date(date))} disabled={allowNextDate}>Next</button>
                </div>
            </div>
            <div className="row">
                <div className="col mt-1">
                    <input type="text" className="col form-control mt-1 mx-auto" placeholder="Search by Tr.ID, Sample, Pure, and Rate..." value={searched} onChange={searchHandle} />
                </div>
            </div>
        </div>
    )
};

export default BusinessStatementHeader;