const transactionReducer = (state, action) => {
    switch (action.type) {
        // General.
        case "UpdateText":
            if (action.field === 'cPaid') {
                return {
                    ...state,
                    [action.field]: action.payload,
                    bReceived: action.payload
                };
            } else {
                return {
                    ...state,
                    [action.field]: action.payload,
                };
            }

        // When you select a user's financial account.
        case "UpdateInitial":
            return {
                ...state,
                transactionType: action.payload[0],
                accountID: action.payload[1],
                fees: action.payload[2],
                charges: action.payload[0] === 'Tezab' ? '' : action.payload[3]
            };

        // When you select a transaction type from the drowpdown.
        case "UpdateType":
            return {
                ...action.payload[0],
                transactionType: action.payload[1]
            }

        // Display the Account specific transaction ID with type prefix that appears on the bottom right.
        case "UpdateAccoTranID":
            const transactionTypes = {
                TE: 'Testing',
                IM: 'Impure',
                EX: 'Exchange',
                BT: 'Both',
                TZ: 'Tezab',
                PB: 'Pure Gold Buy',
                PS: 'Pure Gold Sell',
                BI: 'Bar Exchange In',
                BO: 'Bar Exchange Out',
                GI: 'Given',
                TA: 'Taken',
                AD: 'Advance',
                LO: 'Loan'
            }
            const type = Object.keys(transactionTypes).find(k => transactionTypes[k] === state.transactionType);
            return {
                ...state,
                accoTranID: type + action.payload
            }

        // Testing.
        case "UpdateTestFees": {
            let custPaid = state.cPaid;
            let busiReceived = state.bReceived;
            let custPayable = state.cPayable;
            let takeCash = Number(state.takeCash);
            let fees = Number(action.payload);
            const regex = /\d+R/;
            if (action.payload !== '') {
                if (fees === 0) {
                    return {
                        ...state,
                        fees: fees,
                        cPaid: custPaid.replace(regex, ''),
                        cPayable: custPayable.replace(regex, ''),
                        bReceived: busiReceived.replace(regex, ''),
                    }
                } else if (custPaid === '' && custPayable === '' && busiReceived === '') {
                    return {
                        ...state,
                        fees: fees,
                        cPaid: `${fees}R`,
                        cPayable: `${fees}R`,
                        bReceived: `${fees}R`,
                    }
                } else {
                    return {
                        ...state,
                        fees: fees,
                        cPaid: custPaid.replace(regex, `${fees}R`),
                        cPayable: custPayable.replace(regex, `${takeCash + fees}R`),
                        bReceived: busiReceived.replace(regex, `${fees}R`),
                    }
                }
            } else {
                return {
                    ...state,
                    fees: '',
                    cPaid: custPaid.replace(regex, ''),
                    cPayable: custPayable.replace(regex, ''),
                    bReceived: busiReceived.replace(regex, ''),
                }
            }
        };

        // Testing.
        case "UpdateTakeCash": {
            let fees = Number(state.fees);
            let cashTaken = Number(action.payload);
            let goldTaken = Number(state.takeGold);
            const regex = /\s*\d+R/;
            if (action.payload === '') {
                return {
                    ...state,
                    takeCash: '',
                    cPayable: fees ? goldTaken ? `${goldTaken}G ${fees}R` : `${fees}R` : state.cPayable.replace(regex, ''),
                    cReceivable: state.cReceivable.replace(regex, ''),
                    cReceived: state.cReceived.replace(regex, '')
                }    
            } else {
                if (goldTaken === 0) {
                    return {
                        ...state,
                        takeCash: action.payload,
                        cPayable: `${cashTaken + fees}R`,
                        cReceivable: `${cashTaken}R`,
                        cReceived: `${cashTaken}R`,
                    }    
                } else {
                    return {
                        ...state,
                        takeCash: action.payload,
                        cPayable: `${goldTaken}G ${cashTaken + fees}R`,
                        cReceivable: `${goldTaken}G ${cashTaken}R`,
                        cReceived: `${goldTaken}G ${cashTaken}R`,
                    }
                }
            }
        }

        // Testing.
        case "UpdateTakeGold": {
            let fees = Number(state.fees);
            let cashTaken = Number(state.takeCash);
            let goldTaken = Number(action.payload);
            const regex = /\d+G\s*/;
            if (action.payload === '') {
                return {
                    ...state,
                    takeGold: '',
                    cPayable: fees ? cashTaken ? `${cashTaken + fees}R` : `${fees}R` : state.cPayable.replace(regex, ''),
                    cReceivable: state.cReceivable.replace(regex, ''),
                    cReceived: state.cReceived.replace(regex, '')
                }    
            } else {
                if (cashTaken === 0) {
                    return {
                        ...state,
                        takeGold: action.payload,
                        cPayable: `${goldTaken}G ${fees}R`,
                        cReceivable: `${goldTaken}G`,
                        cReceived: `${goldTaken}G`,
                    }    
                } else {
                    return {
                        ...state,
                        takeGold: action.payload,
                        cPayable: `${goldTaken}G ${cashTaken + fees}R`,
                        cReceivable: `${goldTaken}G ${cashTaken}R`,
                        cReceived: `${goldTaken}G ${cashTaken}R`,
                    }
                }
            }
        };

        // Testing.
        case "ToggleSampleReturned":
            return {
                ...state,
                sampleReturned: !state.sampleReturned,
            };

        // Testing.
        case "UpdateTestType":
            return {
                ...state,
                testType: action.payload,
                cPaid: action.payload === 'Other' ? `${state.fees}R` : `${state.pure}G ${state.fees}R`,
                bReceived: action.payload === 'Other' ? `${state.fees}R` : `${state.pure}G ${state.fees}R`,
            }

        // Testing.
        case "UpdateWeights": {
            let total = Number(state.totalWeight);
            let oldWeight = Number(state[action.field]);
            let newWeight = Number(action.payload);
            let fees = Number(state.fees);
            let takeCash = Number(state.takeCash);
            let takeGold = state.takeGold;
            let payable = `${takeCash + fees}R`;
            if (takeGold !== '') {
                payable = `${takeGold}G ${takeCash + fees}R`;
            }
            if (newWeight !== 0) {
                if (oldWeight > 0) {
                    newWeight = newWeight - oldWeight;
                }
                let points = Number(state.points);
                if (points === '' || points === 0) {
                    return {
                        ...state,
                        [action.field]: newWeight + oldWeight,
                        totalWeight: newWeight + total,
                        pure: '',
                        cPayable: payable,
                        cPaid: `${fees}R`,
                        bReceived: `${fees}R`
                    };
                } else {
                    return {
                        ...state,
                        [action.field]: newWeight + oldWeight,
                        totalWeight: newWeight + total,
                        pure: parseFloat((newWeight + total) * (points / 1000)).toFixed(2),
                        cPayable: payable,
                        cPaid: `${parseFloat((newWeight + total) * (points / 1000)).toFixed(2)}G  ${fees}R`,
                        bReceived: `${parseFloat((newWeight + total) * (points / 1000)).toFixed(2)}G ${fees}R`
                    };
                }
            } else {
                if (oldWeight > 0) {
                    newWeight = newWeight - oldWeight;
                    if (newWeight + total === 0) {
                        return {
                            ...state,
                            [action.field]: '',
                            totalWeight: '',
                            points: '',
                            pure: '',
                            cPayable: '0',
                            cPaid: '0',
                            bReceived: '0',
                        };                        
                    } else {
                        let points = Number(state.points);
                        let pureW = parseFloat((newWeight + total) * (points / 1000)).toFixed(2);
                        let custPaid = `${pureW}G  ${fees}R`;
                        let busiReceived = `${pureW}G  ${fees}R`;
                        if (pureW === '0.00') {
                            pureW = '';
                            custPaid = `${fees}R`;
                            busiReceived = `${fees}R`;
                        }
                        return {
                            ...state,
                            [action.field]: '',
                            totalWeight: newWeight + total,
                            pure: pureW,
                            cPayable: payable,
                            cPaid: custPaid,
                            bReceived: busiReceived
                        };
                    }
                } 
            }; break;
        }

        // Testing.
        case "UpdatePure":
            let points = Number(action.payload);
            let totalW = Number(state.totalWeight);
            let pureW = Number(state.pure);
            let testFees = Number(state.fees);
            let takeCash = Number(state.takeCash);
            let takeGold = state.takeGold;
            let payable = `${takeCash + testFees}R`;
            if (takeGold !== '') {
                payable = `${takeGold}G ${takeCash + testFees}R`;
            }
            if (totalW !== '' && totalW > 0 && points !== '' && points > 0) {
                pureW = parseFloat(totalW * (points / 1000)).toFixed(2);
                return {
                    ...state,
                    [action.field]: action.payload,
                    pure: pureW,
                    cPayable: payable,
                    cPaid: `${pureW}G ${testFees}R`,
                    bReceived: `${pureW}G ${testFees}R`
                };
            } else {
                let custPaid = state.cPaid;
                let busiReceived = state.bReceived;
                if (custPaid !== '0' || busiReceived !== '0') {
                    return {
                        ...state,
                        [action.field]: '',
                        pure: '',
                        cPaid: `${testFees}R`,
                        bReceived: `${testFees}R`
                    };    
                } else {
                    return {
                        ...state,
                        [action.field]: '',
                        pure: ''
                    };
                }
            };

        // TAKEN, GIVEN
        // When you select previous transactions for which you have to pay or receive money for.
        case 'UpdateUseTranID':
            let accoTranIDs = state.simpleTranID.split(' ');
            if (accoTranIDs[0] === '') {
                return {
                    ...state,
                    [action.field]: action.payload
                }
            }
            if (accoTranIDs.includes(action.payload)) {
                accoTranIDs.splice(accoTranIDs.indexOf(action.payload), 1);
                return {
                    ...state,
                    [action.field]: accoTranIDs.join(' ')
                }
            } else {
                accoTranIDs.push(action.payload);
                return {
                    ...state,
                    [action.field]: accoTranIDs.join(' ')
                }
            }
        
        // TAKEN, GIVEN, Advance, Loan
        // Update the tag added to the end of the amound field and update the relevant paid/received fields as well.
        case 'UpdateAmountTag':
            let newAmount = state.amount;
            if (newAmount === '') {
                newAmount = action.payload;
            } else if (newAmount.includes('G') || newAmount.includes('R')) {
                newAmount = newAmount.slice(0, newAmount.length - 1);
                newAmount = newAmount + action.payload;
            } else {
                newAmount = newAmount + action.payload;
            }
            if (Number(newAmount.slice(0, newAmount.length - 1)) === 0) {
                return {
                    ...state,
                    amount: '',
                    cPaid: '',
                    cReceived: ''
                }
            } else {
                if (newAmount.includes('G')) {
                    newAmount = `${Number(newAmount.slice(0, newAmount.length - 1)).toFixed(2)}G`;
                } else {
                    newAmount = `${Number(newAmount.slice(0, newAmount.length - 1)).toFixed()}R`;
                }
                if (state.transactionType === 'Taken' || state.transactionType === 'Advance') {
                    return {
                        ...state,
                        amount: newAmount,
                        cPaid: newAmount
                    }
                } else {
                    return {
                        ...state,
                        amount: newAmount,
                        cReceived: newAmount
                    }
                }
            }

        // Impure, Exchange, Both
        case "UpdateTestingInitial": {
            const { fees, total_sample_weight, points, pure_weight, charges, taken_cash, taken_gold, transferred } = action.payload;
            return {
                ...state,
                totalWeight: total_sample_weight,
                points: points,
                pure: pure_weight,
                charges: state.transactionType === 'Both' ? `${charges * total_sample_weight}R` : charges * total_sample_weight,
                pendingTakeCash: taken_cash || '',
                pendingTakeGold: taken_gold || '',
                carriedFees: fees,
                testTransferredDue: transferred,
                cPayable: state.transactionType === 'Exchange' ? `${charges * total_sample_weight}R` : '',
                cPaid: state.transactionType === 'Exchange' ? `${charges * total_sample_weight}R` : '',
                // Possible bug for exchange in statement.
                cReceivable: '',
                cReceived: state.transactionType === 'Exchange' ? `${pure_weight}G` : ''
            }
        }

        // Impure, Both, Tezab
        case "UpdateRGICGANA": {
            if (action.payload === '') {
                return {
                    ...state,
                    rate: '',
                    goldInCash: '',
                    pureMinusGoldInCash: '',
                    takeCashInGold: '',
                    finalGold: '',
                    cReceivable: '',
                    cReceived: '',
                    cPaid: '',
                    grossAmount: '',
                    newAmount: ''
                }    
            } else {
                let goldToCash = Math.round((action.payload * state.pure) / 11.664);
                let pureMinusPendingGoldInCash = Math.round((action.payload * (state.pure - state.pendingTakeGold)) / 11.664);
                let pendingTakeCashInGold = Math.round(((state.pendingTakeCash * 11.664) / action.payload) * 100) / 100;
                let gross = goldToCash - state.charges;
                let net = gross + state.pendingTakeCash;
                let receivable = '';
                let paid = '';
                let payable = '';
                let final = '';
                let tempAmount = '';
                if (state.pendingTakeCash !== '' && state.pendingTakeGold !== '') {
                    final = `${Math.round((state.pure - state.pendingTakeGold - (Number(state.charges.slice(0, -1)) * 11.664 / action.payload) - pendingTakeCashInGold) * 100) / 100}G`;
                    if (state.convertCharges) {
                        tempAmount = pureMinusPendingGoldInCash - state.pendingTakeCash - Number(state.charges.slice(0, -1));
                        if (tempAmount > 0) {
                            receivable = `${tempAmount}R`
                        } else {
                            payable = `${Math.abs(tempAmount)}R`;
                        }
                    } else {
                        tempAmount = state.pure - state.pendingTakeGold - Number(state.charges.slice(0, -1)) - pendingTakeCashInGold;
                        if (tempAmount > 0) {
                            receivable = `${tempAmount}G`
                        } else {
                            payable = `${Math.abs(tempAmount)}G`;
                        }
                    }
                    paid = `${state.pendingTakeGold}G ${state.pendingTakeCash}R`
                } else if (state.pendingTakeCash !== '') {
                    receivable = `${goldToCash - state.pendingTakeCash - Number(state.charges.slice(0, -1))}R`;
                    paid = `${state.pendingTakeCash}R`;
                    final = (state.pure - pendingTakeCashInGold - Math.round(((Number(state.charges.slice(0, -1)) * 11.664) / Number(action.payload)) * 100) / 100).toFixed(2);
                } else if (state.pendingTakeGold !== '') {
                    receivable = `${pureMinusPendingGoldInCash - Number(state.charges.slice(0, -1))}R`;
                    paid = `${state.pendingTakeGold}G`;
                    final = (state.pure - state.pendingTakeGold - Math.round(((Number(state.charges.slice(0, -1)) * 11.664) / Number(action.payload)) * 100) / 100).toFixed(2);
                } else {
                    receivable = `${goldToCash - Number(state.charges.slice(0, -1))}R`
                    final = (state.pure - state.pendingTakeGold - Math.round(((Number(state.charges.slice(0, -1)) * 11.664) / Number(action.payload)) * 100) / 100).toFixed(2);
                }
                return {
                    ...state,
                    rate: action.payload,
                    goldInCash: goldToCash,
                    pureMinusGoldInCash: state.pendingTakeGold !== '' ? pureMinusPendingGoldInCash : '',
                    takeCashInGold: state.pendingTakeCash !== '' ? pendingTakeCashInGold : '',
                    finalGold: state.transactionType === 'Tezab' ? '' : final,
                    cReceivable: state.transactionType === 'Tezab' ? '0' : receivable,
                    cReceived: state.transactionType === 'Tezab' ? '0' : receivable,
                    cPaid: paid,
                    cPayable: payable,
                    grossAmount: gross,
                    netAmount: net
                }
            }

        }

        // Impure, Exchange, Both
        case "UpdateTestFeesInCharges": {
            if (state.transactionType !== 'Both') {
                let newCharges = state.charges
                if (action.payload === 'true') {
                    newCharges = newCharges + state.carriedFees
                } else {
                    newCharges = newCharges - state.carriedFees
                }
                return {
                    ...state,
                    includeTestFees: action.payload,
                    charges: newCharges,
                    netAmount: state.transactionType === 'Exchange' ? '' : state.goldInCash - newCharges + state.pendingTakeCash,
                    cPayable: state.transactionType === 'Exchange' ? newCharges : '',
                    cPaid: state.transactionType === 'Exchange' ? newCharges : '',
                }
            } else {
                let newCharges = state.charges;
                if (action.payload === 'true') {
                    if (newCharges.slice(-1) === 'R') {
                        newCharges = Number(newCharges.slice(0, -1)) + state.carriedFees;
                        newCharges = `${newCharges}R`;
                    } else {
                        newCharges = Math.round((Number(newCharges.slice(0, -1)) + ((state.carriedFees * 11.664) / state.rate)) * 100) / 100;
                        newCharges = `${newCharges}G`;
                    }
                } else {
                    if (newCharges.slice(-1) === 'R') {
                        newCharges = Number(newCharges.slice(0, -1)) - state.carriedFees;
                        newCharges = `${newCharges}R`;
                    } else {
                        newCharges = Math.round((Number(newCharges.slice(0, -1)) - ((state.carriedFees * 11.664) / state.rate)) * 100) / 100;
                        newCharges = `${newCharges}G`;
                    }
                }
                return {
                    ...state,
                    includeTestFees: action.payload,
                    charges: newCharges,
                    finalGold: newCharges.slice(-1) === 'G' ? state.finalGold !== '' ? `${(Number(state.finalGold.slice(0, -1)) + Number(state.charges.slice(0, -1)) - Number(newCharges.slice(0, -1))).toFixed(2)}G` : `${state.pure}G` : '',
                    cReceivable: newCharges.slice(-1) === 'G' ? state.finalGold !== '' ? `${(Number(state.finalGold.slice(0, -1)) + Number(state.charges.slice(0, -1)) - Number(newCharges.slice(0, -1))).toFixed(2)}G` : `${state.pure}G` : '',
                    cReceived: newCharges.slice(-1) === 'G' ? state.finalGold !== '' ? `${(Number(state.finalGold.slice(0, -1)) + Number(state.charges.slice(0, -1)) - Number(newCharges.slice(0, -1))).toFixed(2)}G` : `${state.pure}G` : '',
                }
            }
        }

        // Impure
        case "UpdateReceivable":
            return {
                ...state,
                cReceivable: action.payload + 'R'
            }

        // Impure, Exchange, Both, Tezab
        case "UpdateDiscountGANA": {
            let prevDiscount = state.discount;
            return {
                ...state,
                discount: action.payload,
                netAmount: state.transactionType === 'Exchange' ? '' : Number(state.netAmount) + Number(action.payload) - prevDiscount,
                cPayable: state.transactionType === 'Exchange' ? `${Number(state.cPayable.slice(0, -1)) - Number(action.payload) + Number(prevDiscount)}R` : '',
                cPaid: state.transactionType === 'Exchange' ? `${Number(state.cPayable.slice(0, -1)) - Number(action.payload) + Number(prevDiscount)}R` : '',
            }
        }

        // Both
        case "UpdateChargesType" : {
            let oldCharges = state.charges;
            let receivable = '';
            let payable = '';
            if (oldCharges.slice(-1) === 'R') {
                // Convert to gold.
                oldCharges = Math.round(((Number(oldCharges.slice(0, -1)) * 11.664) / Number(state.rate)) * 100) / 100;
                if (state.cPayable !== '') {
                    payable = `${Math.abs(Math.round((state.pure - state.pendingTakeGold - oldCharges - state.takeCashInGold) * 100) / 100)}G`;
                } else {
                    receivable = state.finalGold;
                }
            } else {
                // Convert to cash.
                oldCharges = Math.round((Number(oldCharges.slice(0, -1)) * Number(state.rate)) / 11.664);
                if (state.pendingTakeCash !== '' && state.pendingTakeGold !== '') {
                    if (state.cPayable !== '') {
                        payable = `${Math.abs(state.pureMinusGoldInCash - state.pendingTakeCash - oldCharges)}R`;
                    }
                } else if (state.pendingTakeGold !== '') {
                    receivable = `${state.pureMinusGoldInCash - oldCharges}R`;
                } else if (state.pendingTakeCash !== '') {
                    receivable = `${state.goldInCash - state.pendingTakeCash - oldCharges}R`;
                } else {
                    receivable = `${state.goldInCash - oldCharges}R`;
                }
            }
            return {
                ...state,
                convertCharges: action.payload,
                charges: action.payload === "true" ? `${oldCharges}R` : `${oldCharges}G`,
                cReceivable: receivable,
                cReceived: receivable,
                cPayable: payable
            }
        }

        // Pure Gold Buy And Sell
        case "UpdatePureGoldRateAndStuff": {
            if (action.payload === '') {
                return {
                    ...state,
                    rate: '',
                    amount: '',
                    premium: '',
                    grossAmount: '',
                    cReceivable: '',
                    cPayable: '',
                }
            } else {
                let cashAmount = Math.round((Number(state.pure) * Number(action.payload)) / 11.664);
                let adjustCashAmount = state.transactionType === 'Pure Gold Buy' ? cashAmount + Number(state.premium) : cashAmount - Number(state.premium);
                return {
                    ...state,
                    rate: action.payload,
                    amount: adjustCashAmount,
                    grossAmount: cashAmount,
                    cReceivable: state.transactionType === 'Pure Gold Buy' ? `${adjustCashAmount}R` : `${state.pure}G`,
                    cPayable: state.transactionType === 'Pure Gold Buy' ? `${state.pure}G` : `${adjustCashAmount}R`,
                }
            }
        }

        // Pure Gold Buy And Sell
        case "UpdatePGPremiumAdjustment": {
            let cashAmount = Math.round((Number(state.pure) * Number(state.rate)) / 11.664);
            if (action.payload === '') {
                return {
                    ...state,
                    premium: '',
                    amount: cashAmount,
                    cReceivable: state.transactionType === 'Pure Gold Buy' ? `${cashAmount}R` : `${state.pure}G`,
                    cPayable: state.transactionType === 'Pure Gold Buy' ? `${state.pure}G` : `${cashAmount}R`,
                }
            } else {
                if (state.transactionType === 'Pure Gold Buy') {
                    cashAmount = cashAmount + Number(action.payload);
                } else {
                    cashAmount = cashAmount - Number(action.payload);
                }
                return {
                    ...state,
                    premium: action.payload,
                    amount: cashAmount,
                    cReceivable: state.transactionType === 'Pure Gold Buy' ? `${cashAmount}R` : `${state.pure}G`,
                    cPayable: state.transactionType === 'Pure Gold Buy' ? `${state.pure}G` : `${cashAmount}R`,
                }
            }
        }

        // Bar Exchange In and Out
        case "UpdateBEPremiumAdjustment": {
            if (action.payload === '') {
                return {
                    ...state,
                    premium: '',
                    cPayable: state.transactionType === 'Bar Exchange In' ? `${state.stdWeight}G` :  `${state.egrWeight}G`,
                    cPaid: state.transactionType === 'Bar Exchange In' ? `${state.stdWeight}G` :  `${state.egrWeight}G`,
                    cReceivable: state.transactionType === 'Bar Exchange In' ? `${state.egrWeight}G` :  `${state.stdWeight}G`,
                    cReceived: state.transactionType === 'Bar Exchange In' ? `${state.egrWeight}G` :  `${state.stdWeight}G`
                }
            } else {
                return {
                    ...state,
                    premium: action.payload,
                    cPayable: state.transactionType === 'Bar Exchange In' ? `${state.stdWeight}G` :  `${state.egrWeight}G ${action.payload}R`,
                    cPaid: state.transactionType === 'Bar Exchange In' ? `${state.stdWeight}G` :  `${state.egrWeight}G ${action.payload}R`,
                    cReceivable: state.transactionType === 'Bar Exchange In' ? `${state.egrWeight}G ${action.payload}R` :  `${state.stdWeight}G`,
                    cReceived: state.transactionType === 'Bar Exchange In' ? `${state.egrWeight}G ${action.payload}R` :  `${state.stdWeight}G`
                }
            }
        }

        // Bar Exchange In and Out
        case "UpdateBEWeights": {
            if (action.payload === '') {
                return {
                    ...state,
                    egrWeight: '',
                    cReceivable: '',
                    cReceived: '',
                    cPayable: '',
                    cPaid: '',
                    premium: ''
                }
            } else {
                let premium = '';
                if (state.premium !== '') {
                    premium = ` ${state.premium}R`
                } 
                return {
                    ...state,
                    egrWeight: action.payload,
                    cPayable: state.transactionType === 'Bar Exchange In' ? `${state.stdWeight}G` :  `${action.payload}G` + premium,
                    cPaid: state.transactionType === 'Bar Exchange In' ? `${state.stdWeight}G` :  `${action.payload}G` + premium,
                    cReceivable: state.transactionType === 'Bar Exchange In' ? `${action.payload}G` + premium :  `${state.stdWeight}G`,
                    cReceived: state.transactionType === 'Bar Exchange In' ? `${action.payload}G` + premium :  `${state.stdWeight}G`,
                }
            }
        }

        case "DisplayExistingTransaction": {
            return {
                accountID: action.payload.acco_id || '',
                dateCreated: action.payload.date_created || '',
                dateFinalized: action.payload.date_finalized || '',
                datesModified: action.payload.dates_modified || '',
                accoTranID: action.payload.acco_tran_id || '',
                testID: action.payload.test_id || '',
                simpleTranID: action.payload.use_transaction_id || '',
                firstWeight: action.payload.first_weight || '',
                secondWeight: action.payload.second_weight || '',
                thirdWeight: action.payload.third_weight || '',
                totalWeight: action.payload.total_sample_weight || '',
                points: action.payload.points || '',
                pure: action.payload.pure_weight || '',
                takeCash: action.payload.taken_cash || '',
                takeGold: action.payload.taken_gold || '',
                fees: action.payload.fees || '',
                charges: action.payload.charges || '',
                rate: action.payload.rate || '',
                discount: action.payload.discount || '',
                amount: action.payload.amount || '',
                remarks: action.payload.remarks || '',
                testType: action.payload.test_type || '',
                premium: action.payload.premium || '',
                stdWeight: action.payload.standard_weight || '',
                egrWeight: action.payload.egr_weight || '',
                itemType: action.payload.item_type || '',
                sampleReturned: action.payload.sample_returned || '',
                cReceived: action.payload.received || '',
                cReceivable: action.payload.receivable || '',
                cPaid: action.payload.paid || '',
                cPayable: action.payload.payable || '',
                transactionType: action.payload.transaction_type || '',
                transferredDue: action.payload.transferred || '',
                pendingTakeCash: action.payload.pending_taken_cash || '',
                pendingTakeGold: action.payload.pending_taken_gold || '',
                goldInCash: action.payload.gold_in_cash || '',
                grossAmount: action.payload.gross_amount || '',
                netAmount: action.payload.net_amount || '',
                carriedFees: action.payload.carried_fees || '',
                includeTestFees: action.payload.include_test_fees || '',
                pureMinusGoldInCash: action.payload.pure_minus_gold_in_cash || '',
                takeCashInGold: action.payload.taken_cash_in_gold || '', 
                finalGold: action.payload.final_gold || ''
            }
        }

        // When you click the Finalize button.
        case "UpdateFinalizedDate": {
            const currentDateTime = new Date().toLocaleString().split(', ');
            let pure = state.pure;
            let paid = `${state.cPayable}`
            if (pure !== '') {
                paid = `${state.pure} ${state.cPayable}`
            }
            return {
                ...state,
                cPaid: paid,
                bReceived: paid,
                dateFinalized: `${currentDateTime[0]} ${currentDateTime[1]}`,
                transferred: true
            }
        }

        // Undo effects of having clicked the Finalize button.
        case "UndoFinalizedDate": {
            return {
                ...state,
                cPaid: '',
                bReceived: '',
                dateFinalized: '',
                transferred: false
            }
        }

        // Empty the form.
        case "Reset":
            return action.payload

        default:
            return state;
    }
};

export default transactionReducer;