import React, { useState, useReducer, useCallback, useEffect, useRef } from "react";
import accountService from "../services/account";
import Sidebar from "./Sidebar";
import transactionReducer from "../reducers/transactionReducer";
import transactionService from "../services/transaction";
// Transaction types.
import Testing from "./transactions/Testing";
import Impure from "./transactions/Impure";
import Exchange from "./transactions/Exchange";
import Both from "./transactions/Both";
import Tezab from "./transactions/Tezab";
import Given from "./transactions/Given";
import Taken from "./transactions/Taken";
import AdvanceAndLoan from "./transactions/AdvanceAndLoan";
import PureGoldBuyAndSell from "./transactions/PureGoldBuyAndSell";
import BarExchangeInAndOut from "./transactions/BarExchangeInAndOut";

const currentDate = new Date().toLocaleString().split(', ');

const preventNegativeValues = (e) => {
    (["e", "E", "+", "-"].includes(e.key) || (e.target.value === "" && ["."].includes(e.key))) && e.preventDefault()
}

const initialFormState = {
    accountID: '',
    accoTranID: '',
    testID: '',
    simpleTranID: '',
    dateCreated: '',
    transactionType: 'Testing',
    testType: 'Raw Gold',
    dateFinalized: '',
    datesModified: '',
    firstWeight: '',
    secondWeight: '',
    thirdWeight: '',
    totalWeight: '',
    fees: '',
    charges: '',
    takeCash: '',
    takeGold: '',
    remarks: '',
    points: '',
    pure: '',
    sampleReturned: false,
    cPayable: '',
    cPaid: '',
    cReceivable: '',
    cReceived: '',
    bReceivable: '',
    bReceived: '',
    bPayable: '',
    bPaid: '',
    rate: '',
    discount: '',
    premium: '',
    stdWeight: '',
    egrWeight: '',
    itemType: '10 Tola Gold',
    amount: '',
    transferredDue: false,
    pendingTakeCash: '',
    pendingTakeGold: '',
    goldInCash: '',
    grossAmount: '',
    netAmount: '',
    carriedFees: '',
    testTransferredDue: false,
    includeTestFees: false,
    convertCharges: true,
    // Is for pure weight minus the pending take gold, converted to cash.
    pureMinusGoldInCash: '',
    // Is for take cash converted to gold amount.
    takeCashInGold: '',
    finalGold: ''
}

const NewTransaction = ({ transaction, handleAlert, successTransactionHandle }) => {
    const [accountID, setAccountID] = useState(''); // Account ID selection.
    const [custDetails, setCustDetails] = useState(null) // Customer details at top right of modal.
    const [formData, dispatch] = useReducer(transactionReducer, initialFormState);
    const [transactionID, setTransactionID] = useState('');
    const [buttonDisable, setButtonDisable] = useState(false);
    const [alert, setAlert] = useState('');
    const [editMode, setEditMode] = useState(false);
    const closeModal = useRef(null);

    useEffect(() => {
        if (!transaction) {
            transactionService.getTranID()
                .then(response => setTransactionID(response))
                .catch(() => console.log("Oh no!"));
        } else {
            transactionService.getOneByIDs(transaction[0], /\*/.test(transaction[1]) ? transaction[1].slice(0, -1) : transaction[1])
            .then(data => {
                if (data !== null) {
                    dispatch({
                        type: 'DisplayExistingTransaction',
                        payload: data
                    });
                    setEditMode(true);
                }
            })
        }
    }, [transaction, transactionID])

    const handleAccoTranID = useCallback((data) => {
        dispatch({
            type: 'UpdateAccoTranID',
            payload: data
        });
    }, []);

    const handleTextChange = (e) => {
        dispatch({
            type: "UpdateText",
            field: e.target.name,
            payload: e.target.value
        });
    };

    const handleTypeChange = (e) => {
        dispatch({
            type: 'UpdateType',
            payload: [initialFormState, e.target.value]
        })
        setAccountID('');
        setAlert('');
        setCustDetails(null);
    }

    const handleFeesChange = (e) => {
        dispatch({
            type: "UpdateTestFees",
            payload: e.target.value
        });
    };

    const handleTakeCashChange = (e) => {
        dispatch({
            type: "UpdateTakeCash",
            payload: e.target.value
        });
    };

    const handleTakeGoldChange = (e) => {
        dispatch({
            type: "UpdateTakeGold",
            payload: e.target.value
        });
    };

    const handleSampleReturned = () => {
        dispatch({
            type: "ToggleSampleReturned"
        });
    };

    const handleTestType = (e) => {
        dispatch({
            type: "UpdateTestType",
            payload: e.target.value
        });
    };

    const handleAccountSelectInitial = (values) => {
        dispatch({
            type: "UpdateInitial",
            payload: [formData.transactionType, accountID, values.message.cust_test_fees, values.message.cust_pg_charges]
        });
    };

    const handleWeightsChange = (e) => {
        dispatch({
            type: "UpdateWeights",
            field: e.target.name,
            payload: e.target.value
        });
    }

    const handlePureChange = (e) => {
        dispatch({
            type: "UpdatePure",
            field: e.target.name,
            payload: e.target.value
        });
    }

    const handleTransactionClick = (e) => {
        if (e.currentTarget.style.backgroundColor === 'green') {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'black';
        } else {
            e.currentTarget.style.backgroundColor = 'green';
            e.currentTarget.style.color = 'white';
        }
        dispatch({
            type: 'UpdateUseTranID',
            field: e.currentTarget.getAttribute('data-name'),
            payload: e.currentTarget.getAttribute('data-value')
        });
    }

    const handleAmountTagChange = (e) => {
        dispatch({
            type: "UpdateAmountTag",
            payload: e.currentTarget.getAttribute("data-tag")
        });
    }

    const handleButtonDisable = useCallback((value) => {
        setButtonDisable(value);
    }, []);

    const handleTestingSelectInitial = (data) => {
        dispatch({
            type: "UpdateTestingInitial",
            payload: data
        })
    };

    const handleRateChange = (e) => {
        dispatch({
            type: "UpdateRGICGANA",
            payload: e.target.value
        });
    }

    const handleIncludeTestFees = (e) => {
        dispatch({
            type: "UpdateTestFeesInCharges",
            payload: e.target.value
        });
    }

    const handleReceivableUpdate = (e) => {
        dispatch({
            type: "UpdateReceivable",
            payload: e.target.value
        })
    }

    const handleDiscountChange = (e) => {
        dispatch({
            type: "UpdateDiscountGANA",
            payload: e.target.value
        })
    }

    const handleChargesConversion = (e) => {
        dispatch({
            type: "UpdateChargesType",
            payload: e.target.value
        })
    }

    const handlePureGoldTransactionRate = (e) => {
        dispatch({
            type: "UpdatePureGoldRateAndStuff",
            payload: e.target.value
        })
    }

    const handlePGPremiumUpdate = (e) => {
        dispatch({
            type: "UpdatePGPremiumAdjustment",
            payload: e.target.value
        })
    }

    const handleBEPremiumUpdate = (e) => {
        dispatch({
            type: "UpdateBEPremiumAdjustment",
            payload: e.target.value
        })
    }

    const handleBEWeights = (e) => {
        dispatch({
            type: "UpdateBEWeights",
            payload: e.target.value
        })
    }

    const switchView = (view) => {
        switch (view) {
            case 'Testing':
                return (
                    <Testing
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleFeesChange={handleFeesChange}
                        handleSampleReturned={handleSampleReturned}
                        handleTestType={handleTestType}
                        handleWeightsChange={handleWeightsChange}
                        handlePureChange={handlePureChange}
                        handleTakeCashChange={handleTakeCashChange}
                        handleTakeGoldChange={handleTakeGoldChange}
                        handleAccoTranID={handleAccoTranID}
                        preventNegativeValues={preventNegativeValues}
                        readOnly={editMode}
                    />
                )

            case 'Impure':
                return (
                    <Impure 
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        pullTestingTransaction={pullTestingTransaction}
                        handleRateChange={handleRateChange}
                        handleIncludeTestFees={handleIncludeTestFees}
                        handleReceivableUpdate={handleReceivableUpdate}
                        handleDiscountChange={handleDiscountChange}
                        preventNegativeValues={preventNegativeValues}
                        alertMessage={alert}
                        readOnly={editMode}
                    />
                )
            
            case 'Exchange':
                return (
                    <Exchange
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        pullTestingTransaction={pullTestingTransaction}
                        handleIncludeTestFees={handleIncludeTestFees}
                        handleDiscountChange={handleDiscountChange}
                        preventNegativeValues={preventNegativeValues}
                        alertMessage={alert}
                        readOnly={editMode}
                    />
                )
            
            case 'Both':
                return (
                    <Both
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        pullTestingTransaction={pullTestingTransaction}
                        handleRateChange={handleRateChange}
                        handleIncludeTestFees={handleIncludeTestFees}
                        handleDiscountChange={handleDiscountChange}
                        preventNegativeValues={preventNegativeValues}
                        handleChargesConversion={handleChargesConversion}
                        alertMessage={alert}
                        readOnly={editMode}
                    />
                )
            
            case 'Tezab':
                return (
                    <Tezab
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handlePureChange={handlePureChange}
                        handleAccoTranID={handleAccoTranID}
                        handleRateChange={handleRateChange}
                        handleDiscountChange={handleDiscountChange}
                        handleReceivableUpdate={handleReceivableUpdate}
                        preventNegativeValues={preventNegativeValues}
                        readOnly={editMode}
                    />
                )

            case 'Pure Gold Buy':
                return (
                    <PureGoldBuyAndSell
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        handlePureGoldTransactionRate={handlePureGoldTransactionRate}
                        handlePGPremiumUpdate={handlePGPremiumUpdate}
                        preventNegativeValues={preventNegativeValues}
                        readOnly={editMode}
                    />
                )

            case 'Pure Gold Sell':
                return (
                    <PureGoldBuyAndSell
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        handlePureGoldTransactionRate={handlePureGoldTransactionRate}
                        handlePGPremiumUpdate={handlePGPremiumUpdate}
                        preventNegativeValues={preventNegativeValues}
                        readOnly={editMode}
                    />
                )

            case 'Bar Exchange In':
                return (
                    <BarExchangeInAndOut
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        handleBEWeights={handleBEWeights}
                        handleBEPremiumUpdate={handleBEPremiumUpdate}
                        preventNegativeValues={preventNegativeValues}
                        readOnly={editMode}
                    />
                )
            
            case 'Bar Exchange Out':
                return (
                    <BarExchangeInAndOut
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        handleBEWeights={handleBEWeights}
                        handleBEPremiumUpdate={handleBEPremiumUpdate}
                        preventNegativeValues={preventNegativeValues}
                        readOnly={editMode}
                    />
                )

            case 'Given':
                return (
                    <Given
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        handleTransactionClick={handleTransactionClick}
                        handleAmountTagChange={handleAmountTagChange}
                        handleButtonDisable={handleButtonDisable}
                        readOnly={editMode}
                    />
                )

            case 'Taken':
                return (
                    <Taken 
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        handleTransactionClick={handleTransactionClick}
                        handleAmountTagChange={handleAmountTagChange}
                        handleButtonDisable={handleButtonDisable}
                        readOnly={editMode}
                    />
                )

            case 'Advance':
                return (
                    <AdvanceAndLoan
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        pullTransaction={pullTransaction}
                        handleAmountTagChange={handleAmountTagChange}
                        alertMessage={alert}
                        readOnly={editMode}
                    />
                )
            
            case 'Loan':
                return (
                    <AdvanceAndLoan
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        pullTransaction={pullTransaction}
                        handleAmountTagChange={handleAmountTagChange}
                        alertMessage={alert}
                        readOnly={editMode}
                    />
                )

            // The default case is to display nothing.
            default:
                return (
                    <>
                    </>
                )
        }
    }

    const pullAccount = () => {
        accountService.getAccount(parseInt(accountID))
            .then(response => {
                setCustDetails(response);
                if (response.status) {
                    handleAccountSelectInitial(response);
                }
            })
            .catch(() => setCustDetails('Something went wrong.'));
    }

    const pullTestingTransaction = () => {
        transactionService.getTestingTransaction(parseInt(formData.accountID), formData.testID)
            .then(response => {
                if (response.status) {
                    handleTestingSelectInitial(response.data);
                    setAlert('');
                } else {
                    setAlert(response.data);
                }
            })
            .catch(() => console.log('Nope.'));
    }

    const pullTransaction = () => {
        transactionService.getAdvanceLoanTransaction(parseInt(formData.accountID), formData.simpleTranID)
            .then(response => {
                if (response.status) {
                    setAlert(response.data.date_created);
                } else {
                    setAlert(response.data);
                }
            })
            .catch(() => console.log('Nope.'));
    }

    const resetFields = () => {
        setCustDetails(null);
        setAlert('');
        setTimeout(() => {
            setAccountID('');
            dispatch({
                type: 'Reset',
                payload: initialFormState
            });
        }, 750)
    }

    const setNullerAndCreationDate = () => {
        const cleanedFormData = structuredClone(formData);
        const currentDate = new Date().toLocaleString().split(', ');
        Object.keys(cleanedFormData).forEach((key) => {
            if (cleanedFormData[key] === "" || key === 'bPaid' || key === 'bReceived' || key === 'bPayabale' || key === 'bReceivable') { cleanedFormData[key] = null; }
            if (key === 'dateCreated') {
                cleanedFormData[key] = `${currentDate[0]} ${currentDate[1]}`;
            }
            if (key === 'transactionType') {
                if (cleanedFormData[key] !== 'Testing') {
                    cleanedFormData['sampleReturned'] = null;
                    cleanedFormData['testType'] = null;
                }
                if (cleanedFormData[key] !== 'Bar Exchange In' || cleanedFormData[key] !== 'Bar Exchange Out') {
                    cleanedFormData['itemType'] = null;
                }
                if (cleanedFormData[key] === 'Impure' || cleanedFormData[key] === 'Exchange' || cleanedFormData[key] === 'Tezab' | cleanedFormData[key] === 'Pure Gold Buy' || cleanedFormData[key] === 'Pure Gold Sell' || cleanedFormData[key] === 'Bar Exchange In' || cleanedFormData[key] === 'Bar Exchange Out') {
                    cleanedFormData['fees'] = null;
                    if (cleanedFormData['cReceived'] === cleanedFormData['cReceivable'] && cleanedFormData['cPaid'] === cleanedFormData['cPayable'] ) {
                        cleanedFormData['transferredDue'] = true;
                        cleanedFormData['dateFinalized'] = `${currentDate[0]} ${currentDate[1]}`;
                    }
                }
                if (cleanedFormData[key] === 'Both') {
                    cleanedFormData['fees'] = null;
                    cleanedFormData['grossAmount'] = null;
                    cleanedFormData['netAmount'] = null;
                    if (cleanedFormData['cReceived'] === cleanedFormData['cReceivable']) {
                        cleanedFormData['transferredDue'] = true;
                        cleanedFormData['dateFinalized'] = `${currentDate[0]} ${currentDate[1]}`;
                        if (cleanedFormData['cPayable'] !== '') {
                            let paid = cleanedFormData['cPaid'].split(' ');
                            let payable = cleanedFormData['cPayable'];
                            let cTaken = cleanedFormData['pendingTakeCash'];
                            let gTaken = cleanedFormData['pendingTakeGold'];
                            if(payable.slice(-1) === 'G' && paid[0].slice(0, -1) - payable.slice(0, -1) === gTaken) {
                                void(0);
                            } else if (payable.slice(-1) === 'R' && paid[1].slice(0, -1) - payable.slice(0, -1) === cTaken) {
                                void(0);
                            } else {
                                cleanedFormData['transferredDue'] = false;
                                cleanedFormData['dateFinalized'] = null;
                            }
                        }
                    }
                }
                if (cleanedFormData[key] !== 'Impure' && cleanedFormData[key] !== 'Exchange' && cleanedFormData[key] !== 'Both') {
                    cleanedFormData['includeTestFees'] = null;
                }
                if (cleanedFormData[key] === 'Advance' || cleanedFormData[key] === 'Loan') {
                    cleanedFormData['transferredDue'] = true;
                    cleanedFormData['dateFinalized'] = `${currentDate[0]} ${currentDate[1]}`;
                }
            }
        }, cleanedFormData);
        return cleanedFormData;
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        const data = setNullerAndCreationDate();
        const createParams = {
            acco_id: data.accountID,
            date_created: data.dateCreated,
            date_finalized: data.dateFinalized,
            dates_modified: data.datesModified,
            acco_tran_id: data.accoTranID,
            test_id: data.testID,
            use_transaction_id: data.simpleTranID,
            first_weight: data.firstWeight,
            second_weight: data.secondWeight,
            third_weight: data.thirdWeight,
            total_sample_weight: data.totalWeight,
            points: data.points,
            pure_weight: data.pure,
            taken_cash: data.takeCash,
            taken_gold: data.takeGold,
            fees: data.fees,
            charges: data.charges,
            rate: data.rate,
            discount: data.discount,
            amount: data.amount,
            remarks: data.remarks,
            test_type: data.testType,
            premium: data.premium,
            standard_weight: data.stdWeight,
            egr_weight: data.egrWeight,
            item_type: data.itemType,
            sample_returned: data.sampleReturned,
            received: data.cReceived,
            receivable: data.cReceivable,
            paid: data.cPaid,
            payable: data.cPayable,
            transaction_type: data.transactionType,
            transferred: data.transferredDue,
            pending_taken_cash: data.pendingTakeCash,
            pending_taken_gold: data.pendingTakeGold,
            gold_in_cash: data.goldInCash,
            gross_amount: data.grossAmount,
            net_amount: data.netAmount,
            carried_fees: data.carriedFees,
            include_test_fees: data.includeTestFees,
            pure_minus_gold_in_cash: data.pureMinusGoldInCash,
            taken_cash_in_gold: data.takeCashInGold, 
            final_gold: data.finalGold
        };
        transactionService.createTransaction(createParams)
            .then(response => {
                handleAlert(response);
                if (response === 'true') { 
                    setTransactionID('');
                    closeModal.current.click();
                    successTransactionHandle('Accounts', {acco_id: accountID, cust_id: custDetails.message.cust_id, cust_name: custDetails.message.cust_name, cust_primary_number: custDetails.message.cust_primary_number});
                }
            })
            .catch(response => handleAlert(response));
    }

    return (
        <div className="modal fade" id="transactionEditCreate" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Tr. ID: {transactionID} • {currentDate[0]}</h1>
                        <button ref={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => resetFields()}></button>
                    </div>
                    <div className="modal-body">
                        <form id="transactionForm" onSubmit={onSubmitForm}>
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" value={accountID || formData.accountID} placeholder="Account ID..." onChange={(e) => setAccountID(e.target.value)} disabled={editMode} />
                                            <button className="btn btn-outline-secondary" type="button" onClick={() => pullAccount()} disabled={editMode}>Select</button>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <select className="form-select" value={formData.transactionType} onChange={(e) => handleTypeChange(e)} disabled={editMode}>
                                            <option value="Testing">Testing</option>
                                            <option value="Impure">Impure</option>
                                            <option value="Exchange">Exchange</option>
                                            <option value="Both">Both</option>
                                            <option value="Tezab">Tezab</option>
                                            <option value="Pure Gold Buy">Pure Gold Buy</option>
                                            <option value="Pure Gold Sell">Pure Gold Sell</option>
                                            <option value="Bar Exchange In">Bar Exchange In</option>
                                            <option value="Bar Exchange Out">Bar Exchange Out</option>
                                            <option value="Given">Given</option>
                                            <option value="Taken">Taken</option>
                                            <option value="Advance">Advance</option>
                                            <option value="Loan">Loan</option>
                                        </select>
                                    </div>
                                </div>
                                {
                                    switchView(formData.transactionType)
                                }
                                {   
                                    (custDetails !== null && custDetails !== undefined) &&
                                        <Sidebar
                                            status={custDetails.status}
                                            id={custDetails.message.cust_id}
                                            name={custDetails.message.cust_name}
                                            cash={custDetails.message.curr_cash_balance}
                                            gold={custDetails.message.curr_gold_balance}
                                            error={custDetails.message}
                                        />
                                }
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        {
                            formData.dateFinalized === '' ? 
                                <button className="btn btn-danger" onClick={() => dispatch({type: "UpdateFinalizedDate"})}>Finalize</button> :
                                <button className="btn btn-success" onClick={() => dispatch({type: "UndoFinalizedDate"})}>Finalize</button>
                        }
                        <button className="btn" form='transactionForm' type="submit" style={{backgroundColor:"grey", color:"white"}} disabled={buttonDisable}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NewTransaction;