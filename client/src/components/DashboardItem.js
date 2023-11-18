import React from "react";

const DashboardItem = ({ title, logo, setter, color, enterHandle, leaveHandle, clickHandle }) => {
    const setView = () => {
        if (title === 'Daily' || title === 'Monthly' || title === 'Yearly') {
            clickHandle('Calender', title);
        } else {
            clickHandle(title);
        }
    }

    return (
        <>
            {
               title !== 'New Transaction' ?
                    <div className="col mx-auto border border-2 rounded my-1 mx-2" style={{width:'425px', height:'300px', backgroundColor: color, cursor: 'pointer'}} onMouseEnter={() => enterHandle(setter)} onMouseLeave={() => leaveHandle(setter)} onClick={() => setView()}>
                        <div className="vstack gap-3">
                            <span className="fs-1 fw-semibold">{title}</span>
                            <i className={`bi ${logo}`} style={{fontSize: "7rem"}}></i>
                        </div>
                    </div> :
                    <div className="col mx-auto border border-2 rounded my-1 mx-2" data-bs-toggle="modal" data-bs-target="#transactionEditCreate" style={{width:'425px', height:'300px', backgroundColor: color, cursor: 'pointer'}} onMouseEnter={() => enterHandle(setter)} onMouseLeave={() => leaveHandle(setter)} onClick={() => clickHandle(title)}>
                        <div className="vstack gap-3">
                            <span className="fs-1 fw-semibold">{title}</span>
                            <i className={`bi ${logo}`} style={{fontSize: "7rem"}}></i>
                        </div>
                    </div> 
            }
        </>
    )
}

export default DashboardItem;