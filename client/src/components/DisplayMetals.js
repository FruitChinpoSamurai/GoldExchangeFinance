import React from "react";
import { metals } from "../constants/metals";

const DisplayMetals = ({ handleMetalSelect }) => {
    return (
        <div className="col" style={{ position: 'fixed', left: '100px', top: '250px', width: '400px', cursor: "pointer" }}>
            <div className="row flex-wrap">
                {
                    metals.map((metal) => (
                        <div key={metal.symbol} style={{ backgroundColor: metal.color, color: metal.textColor, width: 'fit-content' }} onClick={() => handleMetalSelect(metal.name, metal.symbol)}>
                            <span className="fs-1">{metal.symbol}</span>
                            <br/>
                            <span>{metal.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default DisplayMetals;