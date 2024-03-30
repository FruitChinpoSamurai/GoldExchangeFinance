import React, { useEffect } from "react";
import transactionService from "../../services/transaction";
import DisplayMetals from "../DisplayMetals";

const Testing = ({ formData, handleTextChange, handleFeesChange, handleSampleReturned, handleTestType, handleWeightsChange, handlePureChange, handleTakeCashChange, handleTakeGoldChange, handleAccoTranID, preventNegativeValues, handleMetalSelect, readOnly, handleClearCPandBR }) => {
    useEffect(() => {
        if (!readOnly) {
            transactionService.getAccoTranID(formData.transactionType, formData.accountID)
                .then(response => handleAccoTranID(response))
                .catch(() => console.log('Whoops!'));
        }
    }, [formData.transactionType, formData.accountID, handleAccoTranID, readOnly]);

    return (
        <>
            {/* First row. */}
            <div className="row my-2"> 
                <div className="col">
                    {
                        formData.testType === 'Raw Gold'
                            ? <input type="number" step="0.01" className="form-control" name="firstWeight" onKeyDown={(e) => preventNegativeValues(e)} onWheel={e => e.target.blur()} value={formData.firstWeight} placeholder="First Weight" onInput={(e) => handleWeightsChange(e)} min="0" max="999" />
                            : <input type="number" step="0.01" className="form-control" name="firstWeight" onKeyDown={(e) => preventNegativeValues(e)} onWheel={e => e.target.blur()} value={formData.firstWeight} placeholder="Weight" onInput={(e) => handleWeightsChange(e)} min="0" max="999" />
                    }
                </div>
                <div className="col">
                    <input type="number" className="form-control" name="fees" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.fees} placeholder="Test Fees" onInput={(e) => handleFeesChange(e)} min="0" max="9999" required/>
                </div>
                <div className="col">
                    {
                        formData.testType === 'Raw Gold'
                            ? <input type="number" className="form-control" name="points" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.points} placeholder="Points" onInput={(e) => handlePureChange(e)} min="0" max="999"/>
                            : <></>
                    }
                </div>
                <div className="col">
                    <select className="form-select" value={formData.testType} onChange={(e) => handleTestType(e)} disabled={readOnly}>
                        <option value="Raw Gold">Raw Gold</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            {/* Second row. */}
            <div className="row my-2">
                {
                    formData.testType === 'Raw Gold'
                        ?   <>
                                <div className="col">
                                    <input type="number" step="0.01" className="form-control" name="secondWeight" onKeyDown={(e) => preventNegativeValues(e)} onWheel={e => e.target.blur()} value={formData.secondWeight} placeholder="Second Weight" onInput={(e) => handleWeightsChange(e)} min="0" max="999" />
                                </div>
                                <div className="col">
                                    <input type="number" className="form-control" name="charges" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.charges} placeholder="Charges" onInput={(e) => handleTextChange(e)} min="0" max="999" required />
                                </div>
                                <div className="col">
                                    <input type="number" className="form-control" name="pure" value={formData.pure} placeholder="Pure" disabled />
                                </div>
                                <div className="col">
                                    <select className="form-select" value={formData.sampleReturned} onChange={() => handleSampleReturned()} >
                                        <option value="false">Not returned</option>
                                        <option value="true">Returned</option>
                                    </select>
                                </div>
                            </>
                        : <></>
                }
            </div>
            {/* Third row. */}
            <div className="row my-2"> 
                <div className="col">
                    {
                        formData.testType === 'Raw Gold'
                            ? <input type="number" step="0.01" className="form-control" name="thirdWeight" onKeyDown={(e) => preventNegativeValues(e)} onWheel={e => e.target.blur()} value={formData.thirdWeight} placeholder="Third Weight" onInput={(e) => handleWeightsChange(e)} min="0" max="999" />
                            : <></>
                    }
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <input type="number" className="form-control" name="rattiIn" value={formData.rattiIn} placeholder="Ratti In" disabled />
                        </div>
                        <div className="col">
                            <input type="number" className="form-control" name="rattiOut" value={formData.rattiOut} placeholder="Ratti Out" disabled />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Fourth row. */}
            <div className="row my-2"> 
                <div className="col">
                    {
                        formData.testType === 'Raw Gold'
                            ? <input type="number" className="form-control" name="totalWeight" value={formData.totalWeight} placeholder="Total Weight" disabled required/>
                            : <></>
                    }
                </div>
                <div className="col">
                    <input type="number" className="form-control" name="karats" value={formData.karats} placeholder="Karats" disabled />
                </div>
                <div className="col">
                    <></>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Fifth row. */}
            <div className="row my-2"> 
                {
                    formData.testType === 'Raw Gold'
                        ?   <>
                                <div className="col">
                                    <input type="number" className="form-control" name="takeCash" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.takeCash} placeholder="Takeaway Cash" onInput={(e) => handleTakeCashChange(e)} min="0" max="999999999"/>
                                </div>
                                <div className="col">
                                    <input type="number" className="form-control" name="takeGold" onWheel={e => e.target.blur()} onKeyDown={(e) => preventNegativeValues(e)} value={formData.takeGold} placeholder="Takeaway Gold" onInput={(e) => handleTakeGoldChange(e)} min="0" max="9999"/>
                                </div>
                                <div className="col">
                                    <></>
                                </div>
                                <div className="col">
                                    <></>
                                </div>
                            </>
                        : <></>
                }
            </div>
            {/* Sixth row. */}
            <div className="row my-2"> 
                <div className="col">
                    <textarea className="form-control" rows={formData.testType === 'Raw Gold' ? '3' : '9'} placeholder={formData.testType === 'Raw Gold' ? "Remarks..." : "Metal percentages must equal to 1000 in order to save transaction..."} name="remarks" value={formData.remarks} onInput={(e) => handleTextChange(e)} ></textarea>
                </div>
                <div className="col">
                    <></>
                </div>
            </div>
            {/* Transferrables box. */}
            <div className="col border border-3 rounded" style={{position: 'absolute', width: '45%', height: '226px', top: readOnly ? '38%' : '40%', left: '52.5%', minWidth: '186px', maxWidth: '372px', backgroundColor: 'silver'}}>
                <div className="row mx-2 my-3">
                    <div className="col mt-1">
                        <span>Customer Payable = </span>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control form-control-sm" placeholder="0" value={formData.cPayable} disabled />
                    </div>
                </div>
                <div className="row mx-2 my-3">
                    <div className="col mt-1">
                        <span>Business Received = </span>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control form-control-sm" placeholder="0" value={formData.bReceived} disabled />
                    </div>
                </div>
                <div className="row mx-2 my-3">
                    <div className="col mt-1">
                        <span>Customer Paid = </span>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control form-control-sm" placeholder="0" name="cPaid" value={formData.cPaid} onInput={(e) => handleTextChange(e)} />
                        {
                            !readOnly && formData.cPaid !== '' && <i className="bi bi-x-circle" style={{ position: 'absolute', top: '114px', right: '27px', cursor: 'pointer' }} onClick={() => handleClearCPandBR()}></i> 
                        }
                    </div>
                </div>
                <div className="row text-end mx-2 mt-5">
                    <span>Account's Transaction ID: {formData.accoTranID}</span>
                </div>
            </div>
            {
                formData.testType === 'Other' && <DisplayMetals handleMetalSelect={handleMetalSelect} />
            }
        </>
    )
};

export default Testing;