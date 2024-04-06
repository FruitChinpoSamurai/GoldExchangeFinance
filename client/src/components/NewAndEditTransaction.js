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
import printService from "./ReceiptPrint"

const currentDate = new Date().toLocaleString().split(', ');

const preventNegativeValues = (e) => {
    (["e", "E", "+", "-"].includes(e.key) || (e.target.value === "" && ["."].includes(e.key))) && e.preventDefault()
}

const initialFormState = {
    tranID: '',
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
    inventoryDetails: [
        {
            itemType: '',
            itemSubType: '',
            points: '',
            pure: '',
            premium: '',
            count: 1
        }
    ],
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
    finalGold: '',
    currBalance: '',
    prevBalance: '',
    globalID: ''
}

const NewTransaction = ({ transaction, handleAlert, successTransactionHandle, data, handleRefresh, setEditReceiptData, scaleReading }) => {
    const [accountID, setAccountID] = useState(''); // Account ID selection.
    const [custDetails, setCustDetails] = useState(null) // Customer details at top right of modal.
    const [formData, dispatch] = useReducer(transactionReducer, initialFormState);
    const [transactionID, setTransactionID] = useState('');
    const [buttonDisable, setButtonDisable] = useState(false);
    const [alert, setAlert] = useState('');
    // const [otherRemarkValidity, setOtherRemarkValidity] = useState(false);
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
                    accountService.getAccount(parseInt(transaction[0]))
                        .then(response => {
                            setCustDetails(response);
                            if (response.status) {
                                void(response.status);
                            }
                        })
                        .catch(() => setCustDetails('Something went wrong.'));
                }
            })
        }
    }, [transaction, transactionID])

    useEffect(() => {
        if (formData.testType === 'Other') {
            const sum = function(text) {
                return (text.match(/\d*(?:\.\d*)?/g) || [])
                .reduce(function(prev, curr) {
                  return prev + +curr;
                }, 0);
            };
            if (sum(formData.remarks) !== 1000) {
                setButtonDisable(true);
            } else {
                setButtonDisable(false);
            }
        }
    }, [formData.remarks, formData.testType])

    const handleAccoTranID = useCallback((data) => {
        dispatch({
            type: 'UpdateAccoTranID',
            payload: data
        });
    }, []);

    const handleTextChange = (e, index) => {
        dispatch({
            type: "UpdateText",
            field: e.target.name,
            payload: e.target.value,
            index: index
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

    const handleWeightsChange = (value, name) => {
        dispatch({
            type: "UpdateWeights",
            field: name,
            payload: value
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

    const handleMetalSelect = (name, symbol) => {
        dispatch({
            type: 'UpdateMetalSelection',
            payload: { name: name, symbol: symbol }
        })
    }

    const handleClearCPandBR = () => {
        dispatch({
            type: 'ClearCPandBR'
        })
    }

    const handleBEPGTypeChange = (e, metaData, index) => {
        dispatch({
            type: "UpdateBEPGType",
            payload: e.target.value,
            metaData: metaData,
            index: index
        });
    };

    const handleBEPGSubTypeChange = (e, metaData, index) => {
        dispatch({
            type: "UpdateBEPGSubType",
            payload: e.target.value,
            metaData: metaData,
            index: index
        });
    };

    const handleBEPGPure = (e, index) => {
        dispatch({
            type: "UpdateBEPGPure",
            payload: e.target.value,
            index: index
        });
    };

    const handleBEPGPremium = (e, index) => {
        dispatch({
            type: "UpdateBEPGPremium",
            payload: e.target.value,
            index: index
        });
    };

    const handleBEPGCount = (e, index) => {
        dispatch({
            type: "UpdateBEPGCount",
            payload: e.target.value,
            index: index
        });
    };

    const handleInventoryItemAdd = (e) => {
        dispatch({
            type: 'UpdateInventoryItemList'
       });
    };

    const handleBEPGCaluculations = (e) => {
        dispatch({
            type: 'UpdateBEPGCalculations'
        });
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
                        handleMetalSelect={handleMetalSelect}
                        readOnly={editMode}
                        handleClearCPandBR={handleClearCPandBR}
                        scaleReading={scaleReading}
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
                        scaleReading={scaleReading}
                    />
                )

            case 'Pure Gold Buy':
                return (
                    <PureGoldBuyAndSell
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        preventNegativeValues={preventNegativeValues}
                        handleBEPGTypeChange={handleBEPGTypeChange}
                        handleBEPGSubTypeChange={handleBEPGSubTypeChange}
                        handleBEPGPure={handleBEPGPure}
                        handleBEPGPremium={handleBEPGPremium}
                        handleBEPGCount={handleBEPGCount}
                        handleBEPGCaluculations={handleBEPGCaluculations}
                        handleInventoryItemAdd={handleInventoryItemAdd}
                        readOnly={editMode}
                    />
                )

            case 'Pure Gold Sell':
                return (
                    <PureGoldBuyAndSell
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        preventNegativeValues={preventNegativeValues}
                        handleBEPGTypeChange={handleBEPGTypeChange}
                        handleBEPGSubTypeChange={handleBEPGSubTypeChange}
                        handleBEPGPure={handleBEPGPure}
                        handleBEPGPremium={handleBEPGPremium}
                        handleBEPGCount={handleBEPGCount}
                        handleBEPGCaluculations={handleBEPGCaluculations}
                        handleInventoryItemAdd={handleInventoryItemAdd}
                        readOnly={editMode}
                    />
                )

            case 'Bar Exchange In':
                return (
                    <BarExchangeInAndOut
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        handleBEPGTypeChange={handleBEPGTypeChange}
                        handleBEPGSubTypeChange={handleBEPGSubTypeChange}
                        handleBEPGPure={handleBEPGPure}
                        handleBEPGPremium={handleBEPGPremium}
                        handleInventoryItemAdd={handleInventoryItemAdd}
                        handleBEPGCount={handleBEPGCount}
                        handleBEPGCaluculations={handleBEPGCaluculations}
                        readOnly={editMode}
                    />
                )
            
            case 'Bar Exchange Out':
                return (
                    <BarExchangeInAndOut
                        formData={formData}
                        handleTextChange={handleTextChange}
                        handleAccoTranID={handleAccoTranID}
                        handleBEPGTypeChange={handleBEPGTypeChange}
                        handleBEPGSubTypeChange={handleBEPGSubTypeChange}
                        handleBEPGPure={handleBEPGPure}
                        handleBEPGPremium={handleBEPGPremium}
                        handleInventoryItemAdd={handleInventoryItemAdd}
                        handleBEPGCount={handleBEPGCount}
                        handleBEPGCaluculations={handleBEPGCaluculations}
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
        transactionService.getTestingTransaction(parseInt(formData.accountID), formData.testID, formData.transactionType)
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
                cleanedFormData[key] = cleanedFormData['dateCreated'] || `${currentDate[0]} ${currentDate[1]}`;
            }
            if (editMode && key === 'datesModified') {
                cleanedFormData[key] = cleanedFormData['datesModified'] ? `${cleanedFormData['datesModified']}, ${currentDate[0]} ${currentDate[1]}` : `${currentDate[0]} ${currentDate[1]}`;
            }
            if (key === 'globalID') {
                cleanedFormData[key] = transactionID || cleanedFormData['globalID']
            }
            if (key === 'prevBalance') {
                cleanedFormData[key] = cleanedFormData['prevBalance'] || `${custDetails.message.curr_cash_balance} ${custDetails.message.curr_gold_balance} ${custDetails.message.curr_sample_balance}`;
            }
            if (key === 'transactionType') {
                if (cleanedFormData[key] !== 'Testing') {
                    cleanedFormData['sampleReturned'] = null;
                    cleanedFormData['testType'] = null;
                }
                if (cleanedFormData[key] !== 'Bar Exchange In' && cleanedFormData[key] !== 'Bar Exchange Out' && cleanedFormData[key] !== 'Pure Gold Buy' && cleanedFormData[key] !== 'Pure Gold Sell') {
                    cleanedFormData['inventoryDetails'] = null;
                }
                if (cleanedFormData[key] === 'Impure' || cleanedFormData[key] === 'Tezab' | cleanedFormData[key] === 'Pure Gold Buy' || cleanedFormData[key] === 'Pure Gold Sell' || cleanedFormData[key] === 'Bar Exchange In' || cleanedFormData[key] === 'Bar Exchange Out') {
                    cleanedFormData['fees'] = null;
                    if (cleanedFormData['cReceived'] === cleanedFormData['cReceivable'] && cleanedFormData['cPaid'] === cleanedFormData['cPayable'] ) {
                        cleanedFormData['transferredDue'] = true;
                        cleanedFormData['dateFinalized'] = `${currentDate[0]} ${currentDate[1]}`;
                    }
                }
                if (cleanedFormData[key] === 'Exchange') {
                    cleanedFormData['fees'] = null;
                    if (cleanedFormData['cPaid'] === cleanedFormData['cPayable']) {
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

    const onSubmitFormCreation = (e) => {
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
            inventory_details: data.inventoryDetails,
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
            final_gold: data.finalGold,
            current_balance: data.currBalance,
            previous_balance: data.prevBalance,
            global_id: data.globalID
        };
        transactionService.createTransaction(createParams)
            .then(response => {
                handleAlert(response);
                if (response === 'true') { 
                    setTransactionID('');
                    closeModal.current.click();
                    const receiptData = {
                        header: {
                            date_created: createParams.date_created,
                            acco_id: accountID,
                            cust_id: custDetails.message.cust_id,
                            cust_name: custDetails.message.cust_name,
                            cust_primary_number: custDetails.message.cust_primary_number
                        },
                        is_testing: createParams.transaction_type === 'Testing' ? true : false,
                        global_transaction_id: transactionID || createParams.global_id,
                        transaction: {
                            ...createParams
                        }
                    }
                    successTransactionHandle('Accounts', {acco_id: accountID, cust_id: custDetails.message.cust_id, cust_name: custDetails.message.cust_name, cust_primary_number: custDetails.message.cust_primary_number, created: true, acco_tran_id: createParams.acco_tran_id, receiptData: receiptData});
                }
            })
            .catch(response => handleAlert(response));
    }
    
    const onSubmitFormUpdation = (e) => {
        e.preventDefault();
        const data = setNullerAndCreationDate();
        const createParams = {
            tran_id: data.tranID,
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
            inventory_details: data.inventoryDetails,
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
            final_gold: data.finalGold,
            current_balance: data.currBalance,
            previous_balance: data.prevBalance,
            global_id: data.globalID
        };
        transactionService.updateTransaction(createParams)
            .then(response => {
                handleAlert(response);
                if (response === 'true') { 
                    setTransactionID('');
                    closeModal.current.click();
                    const receiptData = {
                        header: {
                            date_created: createParams.date_created,
                            acco_id: createParams.acco_id,
                            cust_id: custDetails.message.cust_id,
                            cust_name: custDetails.message.cust_name,
                            cust_primary_number: custDetails.message.cust_primary_number
                        },
                        is_testing: createParams.transaction_type === 'Testing' ? true : false,
                        global_transaction_id: createParams.global_id,
                        transaction: {
                            ...createParams
                        }
                    };
                    setEditReceiptData(receiptData);
                    handleRefresh(true)
                }
            })
            .catch(response => handleAlert(response));
    }

    return (
        <div className="modal fade" id="transactionEditCreate" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">{editMode ? 'Editing' : `Tr. ID: ${transactionID} • ${currentDate[0]}`}</h1>
                        <button ref={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => resetFields()}></button>
                    </div>
                    <div className="modal-body">
                        <form id="transactionForm" onSubmit={editMode ? onSubmitFormUpdation : onSubmitFormCreation}>
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
                                    (!transaction && custDetails !== null && custDetails !== undefined) &&
                                        <Sidebar
                                            status={custDetails.status}
                                            id={custDetails.message.cust_id}
                                            name={custDetails.message.cust_name}
                                            cash={custDetails.message.curr_cash_balance}
                                            gold={custDetails.message.curr_gold_balance}
                                            sample={custDetails.message.curr_sample_balance}
                                            error={custDetails.message}
                                        />
                                }
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        {
                            editMode && <button className="btn" onClick={() => printService.receiptPrint(true, {
                                header: {
                                    date_created: formData.dateCreated,
                                    acco_id: data.acco_id,
                                    cust_id: data.cust_id,
                                    cust_name: data.cust_name,
                                    cust_primary_number: data.cust_primary_number
                                },
                                is_testing: formData.transactionType === 'Testing' ? true : false,
                                global_transaction_id: transactionID || formData.globalID,
                                transaction: {
                                    acco_id: formData.accountID,
                                    date_created: formData.dateCreated,
                                    date_finalized: formData.dateFinalized,
                                    dates_modified: formData.datesModified,
                                    acco_tran_id: formData.accoTranID,
                                    test_id: formData.testID,
                                    use_transaction_id: formData.simpleTranID,
                                    first_weight: formData.firstWeight,
                                    second_weight: formData.secondWeight,
                                    third_weight: formData.thirdWeight,
                                    total_sample_weight: formData.totalWeight,
                                    points: formData.points,
                                    pure_weight: formData.pure,
                                    taken_cash: formData.takeCash,
                                    taken_gold: formData.takeGold,
                                    fees: formData.fees,
                                    charges: formData.charges,
                                    rate: formData.rate,
                                    discount: formData.discount,
                                    amount: formData.amount,
                                    remarks: formData.remarks,
                                    test_type: formData.testType,
                                    premium: formData.premium,
                                    inventory_details: formData.inventoryDetails,
                                    sample_returned: formData.sampleReturned,
                                    received: formData.cReceived,
                                    receivable: formData.cReceivable,
                                    paid: formData.cPaid,
                                    payable: formData.cPayable,
                                    transaction_type: formData.transactionType,
                                    transferred: formData.transferredDue,
                                    pending_taken_cash: formData.pendingTakeCash,
                                    pending_taken_gold: formData.pendingTakeGold,
                                    gold_in_cash: formData.goldInCash,
                                    gross_amount: formData.grossAmount,
                                    net_amount: formData.netAmount,
                                    carried_fees: formData.carriedFees,
                                    include_test_fees: formData.includeTestFees,
                                    pure_minus_gold_in_cash: formData.pureMinusGoldInCash,
                                    taken_cash_in_gold: formData.takeCashInGold, 
                                    final_gold: formData.finalGold,
                                    current_balance: formData.currBalance,
                                    previous_balance: formData.prevBalance,
                                    global_id: formData.globalID
                                }
                            })} style={{backgroundColor:"grey", color:"white"}}>Reprint</button>
                        }
                        {
                            formData.dateFinalized === '' ? 
                                <button className="btn btn-danger" onClick={() => dispatch({type: "UpdateFinalizedDate"})}>Finalize</button> :
                                <button className="btn btn-success" onClick={() => dispatch({type: "UndoFinalizedDate"})}>Finalize</button>
                        }
                        {
                            editMode ?
                                formData.dateCreated.split(' ')[0] === currentDate[0] ?
                                    <button className="btn" form='transactionForm' type="submit" style={{backgroundColor:"grey", color:"white"}} disabled={buttonDisable}>Save</button> :
                                    <></> :
                                <button className="btn" form='transactionForm' type="submit" style={{backgroundColor:"grey", color:"white"}} disabled={buttonDisable}>Save</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NewTransaction;