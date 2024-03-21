import React, { useReducer, useEffect } from "react";
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
    itemType: '',
    itemSubType: '',
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

const DisplayTransaction = ({ transaction }) => {
    const [formData, dispatch] = useReducer(transactionReducer, initialFormState);

    useEffect(() => {
        transactionService.getOneByIDs(transaction[0], /\*/.test(transaction[1]) ? transaction[1].slice(0, -1) : transaction[1])
            .then(data => {
                if (data !== null) {
                    dispatch({
                        type: 'DisplayExistingTransaction',
                        payload: data
                    })
                }
            })
    }, [transaction])

    const switchView = (view) => {
        switch (view) {
            case 'Testing':
                return (
                    <Testing formData={formData} readOnly={true} />
                )

            case 'Impure':
                return (
                    <Impure formData={formData} readOnly={true} />
                )
            
            case 'Exchange':
                return (
                    <Exchange formData={formData} readOnly={true} />
                )
            
            case 'Both':
                return (
                    <Both formData={formData} readOnly={true} />
                )
            
            case 'Tezab':
                return (
                    <Tezab formData={formData} readOnly={true} />
                )

            case 'Pure Gold Buy':
                return (
                    <PureGoldBuyAndSell formData={formData} readOnly={true} />
                )

            case 'Pure Gold Sell':
                return (
                    <PureGoldBuyAndSell formData={formData} readOnly={true} />
                )

            case 'Bar Exchange In':
                return (
                    <BarExchangeInAndOut formData={formData} readOnly={true} />
                )
            
            case 'Bar Exchange Out':
                return (
                    <BarExchangeInAndOut formData={formData} readOnly={true} />
                )

            case 'Given':
                return (
                    <Given formData={formData} readOnly={true} />
                )

            case 'Taken':
                return (
                    <Taken formData={formData} readOnly={true} />
                )

            case 'Advance':
                return (
                    <AdvanceAndLoan formData={formData} readOnly={true} />
                )
            
            case 'Loan':
                return (
                    <AdvanceAndLoan formData={formData} readOnly={true} />
                )

            // The default case is to display nothing.
            default:
                return (
                    <>
                    </>
                )
        }
    }

    return (
        <div className="modal fade" id="transactionDisplay" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <form id="transactionForm">
                            <fieldset disabled>
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <input type="number" className="form-control" value={formData.accountID} onChange={() => void(1)} placeholder="Account ID..." />
                                        </div>
                                        <div className="col">
                                            <input type="text" className="form-control" value={formData.transactionType} onChange={() => void(1)} placeholder="Transaction Type..." />
                                        </div>
                                    </div>
                                    {
                                        switchView(formData.transactionType)
                                    }
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DisplayTransaction;