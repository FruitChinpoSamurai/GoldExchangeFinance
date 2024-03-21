import React, { useEffect, useState } from "react";
import transactionService from "../../services/transaction";
import { categories, coinSubcategories, restSubcategories } from "../../constants/goldItems";

const PureGoldBuy = ({ formData, handleTextChange, handleAccoTranID, preventNegativeValues, handleBEPGTypeChange, handleBEPGSubTypeChange, handleBEPGPure, handleBEPGPremium, handleBEPGCount, handleBEPGCaluculations, handleInventoryItemAdd, readOnly }) => {
    const [meta, setMeta] = useState([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (!readOnly) {
            transactionService.getAccoTranID(formData.transactionType, formData.accountID)
                .then(response => handleAccoTranID(response))
                .catch(() => console.log('Whoops!'));
        }
        transactionService.getWeightPriceMeta()
            .then(response => setMeta(response));
    }, [formData.transactionType, formData.accountID, handleAccoTranID, readOnly]);

    const handleNewClick = (e) => {
        handleInventoryItemAdd(e);
        const newActive = formData.inventoryDetails.length;
        setActive(newActive);
    };

    return (
        <>
            {/* First row. */}
            <div className="row my-2">
                <div className="col">
                    {
                        formData.inventoryDetails.map((item, index) => (
                            <>
                                {
                                    (index === active) &&
                                        <div key={`item-${index}`}>
                                            <select className="form-select" name="itemType" value={item.itemType} onChange={(e) => handleBEPGTypeChange(e, meta, index)}>
                                                <option value="" disabled hidden>Item type...</option>
                                                {
                                                    categories.map((category, index) => (
                                                        <option key={index} value={category}>{category}</option>
                                                    ))
                                                }
                                            </select>
                                            {
                                                (item.itemType === 'Millat' || item.itemType === 'KBE' || item.itemType === 'Small Pieces' || item.itemType === 'Coins') ?
                                                    <select className="form-select" name="itemSubType" value={item.itemSubType} onChange={(e) => handleBEPGSubTypeChange(e, meta, index)}>
                                                        {
                                                            item.itemType === 'Coins' ?
                                                                coinSubcategories.map((subcategory, index) => (
                                                                    <option key={index} value={subcategory.type}>{subcategory.type}</option>
                                                                )) :
                                                                restSubcategories.map((subcategory, index) => (
                                                                    <option key={index} value={subcategory.type}>{subcategory.type}</option>
                                                                ))
                                                        }   
                                                    </select> : <></>
                                            }
                                            <input type="text" className="form-control" name="points" value={item.points} placeholder="Points" pattern="\d{1,3}" onInput={(e) => handleTextChange(e, index)} required disabled={(item.itemType === 'Millat' || item.itemType === 'KBE' || item.itemType === 'Small Pieces' || item.itemType === '10 Tola Standard Bar') ? true : false} />
                                            <input type="text" className="form-control" name="pure" value={item.pure} placeholder="Pure" pattern="\d{1,4}.\d{3}" onInput={(e) => handleBEPGPure(e, index)} required disabled={(item.itemType === 'Millat' || item.itemType === 'KBE' || item.itemType === 'Small Pieces' || item.itemType === '10 Tola Standard Bar') ? true : false} />
                                            <input type="text" className="form-control" name="premium" value={item.premium} placeholder="Premium" pattern="\d{1,7}" onInput={(e) => handleBEPGPremium(e, index)} required />
                                            <input type="number" className="form-control" name="count" value={item.count} placeholder="Count" min='1' max='100' onInput={(e) => handleBEPGCount(e, index)} required />
                                        </div>
                                }
                            </>
                        ))
                    }
                    <br/>
                    <div className="row">
                        {/* Pagination section. */}
                        <ul className="pagination pagination-sm" style={{ marginLeft: '14px', width: '81%' }}>
                            {
                                formData.inventoryDetails.map((item, index) => (
                                    <li className={`page-item ${active === index ? 'active' : ''}`} key={index} onClick={() => setActive(index)}><span className="page-link" style={{ cursor: 'pointer' }}>{index + 1}</span></li>
                                ))
                            }
                            {
                                !readOnly && <li className="page-item" onClick={(e) => handleNewClick(e)}><span className="page-link" style={{ cursor: 'pointer' }}>New</span></li>
                            }                        </ul>
                        <button className="btn btn-sm" type="button" style={{backgroundColor:"grey", color:"white", height: '35px', width: 'auto'}} onClick={() => handleBEPGCaluculations()}>Total</button>
                    </div>
                    <input type="number" name='rate' className="form-control" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.rate} placeholder="Rate" onInput={(e) => handleTextChange(e)} required disabled={formData.inventoryDetails[0].pure ? false : true} />
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Transferrables box. */}
            <div className="col border border-3 rounded" style={{position: 'absolute', width: '45%', height: '226px', top: readOnly ? '20.5%' : '24.5%', left: '52.5%', minWidth: '186px', maxWidth: '372px', backgroundColor: 'silver'}}>
                <div className="row mx-2 my-2">
                    <div className="col-7 mt-1">
                        <span>Customer Receivable = </span>
                    </div>
                    <div className="col">
                        <input type="text" value={formData.cReceivable} className="form-control form-control-sm" placeholder="0" disabled />
                    </div>
                </div>
                <div className="row mx-2 my-2">
                    <div className="col-7 mt-1">
                        <span>Customer Payable = </span>
                    </div>
                    <div className="col">
                        <input type="text" value={formData.cPayable} className="form-control form-control-sm" placeholder="0" disabled />
                    </div>
                </div>
                <div className="row mx-2 my-2">
                    <div className="col-7 mt-1">
                        <span>Customer Received = </span>
                    </div>
                    <div className="col">
                        <input type="text" value={formData.cReceived} className="form-control form-control-sm" placeholder="0" name="cReceived" onInput={(e) => handleTextChange(e)} />
                    </div>
                </div>
                <div className="row mx-2 my-2">
                    <div className="col-7 mt-1">
                        <span>Customer Paid = </span>
                    </div>
                    <div className="col">
                        <input type="text" value={formData.cPaid} className="form-control form-control-sm" placeholder="0" name="cPaid" onInput={(e) => handleTextChange(e)} />
                    </div>
                </div>
                <div className="row text-end mx-2 mt-4">
                    <span>Account's Transaction ID: {formData.accoTranID}</span>
                </div>
            </div>
        </>
    )
};

export default PureGoldBuy;