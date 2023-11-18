import React from "react";
import './Animations.css';

const Sidebar = ({ status, id, name, cash, gold, error}) => {
    return (
        <>
            {
                status ?
                    <div style={{
                        width: '20vw',
                        height: '108px',
                        background: 'gold',
                        borderRadius: '8px',
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        position: 'fixed',
                        left: '40.10%',
                        top: '2%',
                        animation: 'goDown 1s',
                        animationDirection: 'normal'
                    }}>
                        <span className="fw-semibold">Customer ID: </span><span>{id}</span><br/>
                        <span className="fw-semibold">Name: </span><span>{name}</span><br/>
                        <span className="fw-semibold">Cash Balance: </span><span>{cash}</span><br/>
                        <span className="fw-semibold">Gold Balance: </span><span>{gold}</span><br/>
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
                        animation: 'goDown 1s',
                        animationDirection: 'normal'
                    }}>
                        <p className="fs-8 text-center">{error}</p>
                    </div>
            }
        </>
    )
};

export default Sidebar;
