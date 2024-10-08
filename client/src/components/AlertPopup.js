import React from "react";
import './Animations.css';

const AlertPopup = ({ status, isSearch }) => {
    return (
        <>
            {
                status === 'true' ?
                    <div style={{
                        width: '20vw',
                        height: '35px',
                        background: 'gold',
                        borderRadius: '8px',
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        position: 'fixed',
                        left: '40.10%',
                        top: '2%',
                        animation: 'alert 3s',
                        animationDirection: 'normal'
                    }}>
                        <p className="fs-8 text-center">Transaction updated.</p>
                    </div> :
                    <div style={{
                        width: '20vw',
                        height: '35px',
                        background: 'red',
                        borderRadius: '8px',
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        position: 'fixed',
                        left: '40.10%',
                        top: '2%',
                        animation: 'alert 3s',
                        animationDirection: 'normal'
                    }}>
                        <p className="fs-8 text-center">{isSearch === 'true' ? 'Search' : 'Transaction' } failed.</p>
                    </div>
            }
        </>
    )
};

export default AlertPopup;
