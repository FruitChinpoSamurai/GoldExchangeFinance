import React from "react";
import './Animations.css';

const DataPopup = ({ data }) => {
    return (
        <>
            {
                data.length === 7 &&
                    <div style={{
                        width: 'fit-content',
                        background: 'gold',
                        borderRadius: '8px',
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        position: 'fixed',
                        left: `${data[1]}px`,
                        top: `${data[2]}px`,
                        animation: 'display 0.25s',
                        animationDirection: 'normal'
                    }}>
                        <span className="fw-semibold">Received: </span><span>{data[3]}</span><br/>
                        <span className="fw-semibold">Receivable: </span><span>{data[4]}</span><br/>
                        <span className="fw-semibold">Paid: </span><span>{data[5]}</span><br/>
                        <span className="fw-semibold">Payable: </span><span>{data[6]}</span><br/>
                    </div> 
            }
            {
                data.length === 4 &&
                    <div style={{
                        width: 'fit-content',
                        background: 'gold',
                        borderRadius: '8px',
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        position: 'fixed',
                        left: `${data[1]}px`,
                        top: `${data[2]}px`,
                        animation: 'display 0.25s',
                        animationDirection: 'normal'
                    }}>
                        <span className="fw-semibold">Related to: </span><span>{data[3]}</span><br/>
                    </div>
            }
        </>
    )
};

export default DataPopup;
