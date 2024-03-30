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
            } else if (action.index !== undefined) {
                let inventoryItem = state.inventoryDetails[action.index];
                inventoryItem = { ...inventoryItem, points: action.payload };
                let newInventoryDetails = state.inventoryDetails;
                newInventoryDetails[action.index] = inventoryItem;
                return {
                    ...state,
                    // [action.field]: action.payload,
                    inventoryDetails: newInventoryDetails
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
                cPayable: state.fees ? `${state.fees}R` : '',
                cPaid: state.fees ? `${state.fees}R` : '',
                cReceivable: '',
                cReceived: '',
                bReceived: state.fees ? `${state.fees}R` : '',
                pure: '',
                points: '',
                remarks: '',
                takeCash: '',
                takeGold: ''
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
                        totalWeight: Math.round((newWeight + total) * 1000) / 1000,
                        pure: '',
                        cPayable: payable,
                        cPaid: `${fees}R`,
                        bReceived: `${fees}R`
                    };
                } else {
                    return {
                        ...state,
                        [action.field]: newWeight + oldWeight,
                        totalWeight: Math.round((newWeight + total) * 1000) / 1000,
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
                            totalWeight: Math.round((newWeight + total) * 1000) / 1000,
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

        // Testing.
        case 'UpdateMetalSelection': {
            return {
                ...state,
                // eslint-disable-next-line
                remarks: state.remarks === '' ? action.payload.name + '(' + action.payload.symbol + ')' + ': 0' : state.remarks + ', ' + action.payload.name + '(' + action.payload.symbol + ')' + ': 0'
            }
        }

        // Testing.
        case 'ClearCPandBR': {
            return {
                ...state,
                bReceived: '',
                cPaid: ''
            }
        }

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
            console.log(taken_cash)
            return {
                ...state,
                totalWeight: total_sample_weight,
                points: points,
                pure: pure_weight,
                charges: state.transactionType === 'Both' ? `${Math.round(charges * total_sample_weight)}R` : Math.round(charges * total_sample_weight),
                pendingTakeCash: taken_cash || '',
                pendingTakeGold: taken_gold || '',
                carriedFees: fees,
                testTransferredDue: transferred,
                cPayable: state.transactionType === 'Exchange' ? `${Math.round(charges * total_sample_weight)}R` : '',
                cPaid: state.transactionType === 'Exchange' ? `${Math.round(charges * total_sample_weight)}R` : '',
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
                let charges = typeof(state.charges) === 'number' ? state.charges : Number(state.charges.slice(0, -1));
                if (state.pendingTakeCash !== '' && state.pendingTakeGold !== '') {
                    final = `${Math.round((state.pure - state.pendingTakeGold - (charges * 11.664 / action.payload) - pendingTakeCashInGold) * 100) / 100}G`;
                    if (state.convertCharges) {
                        tempAmount = pureMinusPendingGoldInCash - state.pendingTakeCash - charges;
                        if (tempAmount > 0) {
                            receivable = `${tempAmount}R`
                        } else {
                            payable = `${Math.abs(tempAmount)}R`;
                        }
                    } else {
                        tempAmount = state.pure - state.pendingTakeGold - charges - pendingTakeCashInGold;
                        if (tempAmount > 0) {
                            receivable = `${tempAmount}G`
                        } else {
                            payable = `${Math.abs(tempAmount)}G`;
                        }
                    }
                    paid = `${state.pendingTakeGold}G ${state.pendingTakeCash}R`
                } else if (state.pendingTakeCash !== '') {
                    receivable = `${goldToCash - state.pendingTakeCash - charges}R`;
                    paid = `${state.pendingTakeCash}R`;
                    final = (state.pure - pendingTakeCashInGold - Math.round(((charges * 11.664) / Number(action.payload)) * 100) / 100).toFixed(2);
                } else if (state.pendingTakeGold !== '') {
                    receivable = `${pureMinusPendingGoldInCash - charges}R`;
                    paid = `${state.pendingTakeGold}G`;
                    final = (state.pure - state.pendingTakeGold - Math.round(((charges * 11.664) / Number(action.payload)) * 100) / 100).toFixed(2);
                } else {
                    receivable = `${goldToCash - charges}R`
                    final = (state.pure - state.pendingTakeGold - Math.round(((charges * 11.664) / Number(action.payload)) * 100) / 100).toFixed(2);
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
                    grossAmount: '',
                    cReceivable: state.transactionType === 'Pure Gold Buy' ? `${state.premium}R` : `${state.pure}G`,
                    cReceived: state.transactionType === 'Pure Gold Buy' ? `${state.premium}R` : `${state.pure}G`,
                    cPayable: state.transactionType !== 'Pure Gold Buy' ? `${state.premium}R` : `${state.pure}G`,
                    cPaid: state.transactionType !== 'Pure Gold Buy' ? `${state.premium}R` : `${state.pure}G`
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
                    cReceived: state.transactionType === 'Pure Gold Buy' ? `${adjustCashAmount}R` : `${state.pure}G`,
                    cPayable: state.transactionType === 'Pure Gold Buy' ? `${state.pure}G` : `${adjustCashAmount}R`,
                    cPaid: state.transactionType === 'Pure Gold Buy' ? `${state.pure}G` : `${adjustCashAmount}R`
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

        // Bar Exchange In and Out, Pure Gold Buy and Sell
        case "UpdateBEPGType": {
            const itemType = action.payload;
            const itemSubType = (itemType === 'Millat' || itemType === 'Small Pieces' || itemType === 'KBE' || itemType === 'Coins') ? action.metaData.weight_class : '';
            const points = (itemType === 'Millat' || itemType === 'Small Pieces' || itemType === 'KBE' || itemType === '10 Tola Standard Bar') ? '999' : '';
            const pure = (itemType === 'Millat' || itemType === 'Small Pieces' || itemType === 'KBE') ? action.metaData[0].gold_weight : itemType === '10 Tola Standard Bar' ? action.metaData.slice(-1)[0].gold_weight : '';
            const cash = (itemType === 'Millat' || itemType === 'Small Pieces' || itemType === 'KBE') ? action.metaData[0].price : itemType === '10 Tola Standard Bar' ? action.metaData.slice(-1)[0].price : '';
            const count = 1;
            const inventoryItem = {
                itemType: itemType,
                itemSubType: itemSubType,
                points: points,
                pure: pure,
                premium: cash,
                count: count
            };
            let newInventoryDetails = state.inventoryDetails;
            newInventoryDetails[action.index] = inventoryItem;
            const form = {
                ...state,
                inventoryDetails: newInventoryDetails
            };
            if (state.transactionType.includes('Bar')) {
                return {
                    ...form,
                    // cReceivable: state.transactionType === 'Bar Exchange In' ? cash === '' ? '' : `${pure}G ${cash}R` : pure === '' ? '' : `${pure}G`,
                    // cReceived: state.transactionType === 'Bar Exchange In' ? cash === '' ? '' : `${pure}G ${cash}R` : pure === '' ? '' : `${pure}G`,
                    // cPayable: state.transactionType !== 'Bar Exchange In' ? cash === '' ? '' : `${pure}G ${cash}R` : pure === '' ? '' : `${pure}G`,
                    // cPaid: state.transactionType !== 'Bar Exchange In' ? cash === '' ? '' : `${pure}G ${cash}R` : pure === '' ? '' : `${pure}G`,
                }
            } else {
                return {
                    ...form,
                    // cReceivable: state.transactionType === 'Pure Gold Buy' ? cash === '' ? '' : `${cash}R` : pure === '' ? '' : `${pure}G`,
                    // cReceived: state.transactionType === 'Pure Gold Buy' ? cash === '' ? '' : `${cash}R` : pure === '' ? '' : `${pure}G`,
                    // cPayable: state.transactionType !== 'Pure Gold Buy' ? cash === '' ? '' : `${cash}R` : pure === '' ? '' : `${pure}G`,
                    // cPaid: state.transactionType !== 'Pure Gold Buy' ? cash === '' ? '' : `${cash}R` : pure === '' ? '' : `${pure}G`,
                }
            }
        }

        // Bar Exchange In and Out, Pure Gold Buy and Sell
        case "UpdateBEPGSubType": {
            const itemType = state.inventoryDetails[action.index].itemType;
            const itemSubType = action.payload;
            const points = (itemType === 'Millat' || itemType === 'Small Pieces' || itemType === 'KBE' || itemType === '10 Tola Standard Bar') ? '999' : '';
            const pure = (itemType === 'Millat' || itemType === 'Small Pieces' || itemType === 'KBE') ? action.metaData.filter(item => item.weight_class === itemSubType)[0].gold_weight : ''
            const cash = (itemType === 'Millat' || itemType === 'Small Pieces' || itemType === 'KBE') ? action.metaData.filter(item => item.weight_class === itemSubType)[0].price : ''
            const count = 1;
            const inventoryItem = {
                itemType: itemType,
                itemSubType: itemSubType,
                points: points,
                pure: pure,
                premium: cash,
                count: count
            };
            let newInventoryDetails = state.inventoryDetails;
            newInventoryDetails[action.index] = inventoryItem;
            const form = {
                ...state,
                inventoryDetails: newInventoryDetails
            };
            if (state.transactionType.includes('Bar')) {
                return {
                    ...form,
                    // cReceivable: state.transactionType === 'Bar Exchange In' ? cash === '' ? '' : `${pure}G ${cash}R` : pure === '' ? '' : `${pure}G`,
                    // cReceived: state.transactionType === 'Bar Exchange In' ? cash === '' ? '' : `${pure}G ${cash}R` : pure === '' ? '' : `${pure}G`,
                    // cPayable: state.transactionType !== 'Bar Exchange In' ? cash === '' ? '' : `${pure}G ${cash}R` : pure === '' ? '' : `${pure}G`,
                    // cPaid: state.transactionType !== 'Bar Exchange In' ? cash === '' ? '' : `${pure}G ${cash}R` : pure === '' ? '' : `${pure}G`,
                }
            } else {
                return {
                    ...form,
                    // cReceivable: state.transactionType === 'Pure Gold Buy' ? cash === '' ? '' : `${cash}R` : pure === '' ? '' : `${pure}G`,
                    // cReceived: state.transactionType === 'Pure Gold Buy' ? cash === '' ? '' : `${cash}R` : pure === '' ? '' : `${pure}G`,
                    // cPayable: state.transactionType !== 'Pure Gold Buy' ? cash === '' ? '' : `${cash}R` : pure === '' ? '' : `${pure}G`,
                    // cPaid: state.transactionType !== 'Pure Gold Buy' ? cash === '' ? '' : `${cash}R` : pure === '' ? '' : `${pure}G`,
                }
            }
        }

        // Bar Exchange In and Out, Pure Gold Buy and Sell
        case "UpdateBEPGPure": {
            let inventoryItem = state.inventoryDetails[action.index];
            inventoryItem = { ...inventoryItem, pure: action.payload };
            let newInventoryDetails = state.inventoryDetails;
            newInventoryDetails[action.index] = inventoryItem;
            return {
                ...state,
                inventoryDetails: newInventoryDetails
                // cReceivable: action.payload !== '' ? state.transactionType === 'Pure Gold Buy' ? '' : `${action.payload}G` : '',
                // cReceived: action.payload !== '' ? state.transactionType === 'Pure Gold Buy' ? '' : `${action.payload}G` : '',
                // cPayable: action.payload !== '' ? state.transactionType === 'Pure Gold Sell' ? '' : `${action.payload}G` : '',
                // cPaid: action.payload !== '' ? state.transactionType === 'Pure Gold Sell' ? '' : `${action.payload}G` : ''
            }
        }

        // Bar Exchange In and Out, Pure Gold Buy and Sell
        case "UpdateBEPGPremium": {
            let inventoryItem = state.inventoryDetails[action.index];
            inventoryItem = { ...inventoryItem, premium: action.payload };
            let newInventoryDetails = state.inventoryDetails;
            newInventoryDetails[action.index] = inventoryItem;
            return {
                ...state,
                inventoryDetails: newInventoryDetails
                // cReceivable: state.transactionType === 'Bar Exchange In' ? action.payload !== '' ? `${state.pure}G ${action.payload}R` : `${state.pure}G` : state.cReceivable,
                // cReceived: state.transactionType === 'Bar Exchange In' ? action.payload !== '' ? `${state.pure}G ${action.payload}R` : `${state.pure}G` : state.cReceived,
                // cPayable: state.transactionType !== 'Bar Exchange In' ? action.payload !== '' ? `${state.pure}G ${action.payload}R` : `${state.pure}G` : state.cPayable,
                // cPaid: state.transactionType !== 'Bar Exchange In' ? action.payload !== '' ? `${state.pure}G ${action.payload}R` : `${state.pure}G` : state.cPaid
            }
        }

        // Bar Exchange In and Out, Pure Gold Buy and Sell
        case "UpdateBEPGCount": {
            let inventoryItem = state.inventoryDetails[action.index];
            inventoryItem = { ...inventoryItem, count: action.payload };
            let newInventoryDetails = state.inventoryDetails;
            newInventoryDetails[action.index] = inventoryItem;
            return {
                ...state,
                inventoryDetails: newInventoryDetails
                // cReceivable: state.transactionType === 'Pure Gold Buy' ? action.payload !== '' ? `${action.payload}R` : '' : state.cReceivable,
                // cReceived: state.transactionType === 'Pure Gold Buy' ? action.payload !== '' ? `${action.payload}R` : '' : state.cReceived,
                // cPayable: state.transactionType !== 'Pure Gold Buy' ? action.payload !== '' ? `${action.payload}R` : '' : state.cPayable,
                // cPaid: state.transactionType !== 'Pure Gold Buy' ? action.payload !== '' ? `${action.payload}R` : '' : state.cPaid
            }
        }

        // Bar Exchange In and Out, Pure Gold Buy and Sell
        case 'UpdateBEPGCalculations': {
            const inventoryItems = state.inventoryDetails;
            let totalPure = 0;
            let totalCash = 0;
            if (state.transactionType.includes('Bar')) {
                inventoryItems.forEach(item => {
                    totalPure = totalPure + (item.count * item.pure);
                    totalCash = totalCash + (item.count * item.premium);
                });
                return {
                    ...state,
                    cReceivable: state.transactionType === 'Bar Exchange In' ? `${totalPure}G ${totalCash}R` : `${totalPure}G`,
                    cReceived: state.transactionType === 'Bar Exchange In' ? `${totalPure}G ${totalCash}R` : `${totalPure}G`,
                    cPayable: state.transactionType !== 'Bar Exchange In' ? `${totalPure}G ${totalCash}R` : `${totalPure}G`,
                    cPaid: state.transactionType !== 'Bar Exchange In' ? `${totalPure}G ${totalCash}R` : `${totalPure}G`
                }
            } else {
                inventoryItems.forEach(item => {
                    totalPure = totalPure + (item.count * item.pure);
                    totalCash = totalCash + (item.count * item.premium);
                });
                let cashAmount = Math.round((Number(totalPure) * Number(state.rate)) / 11.664);
                let adjustCashAmount = state.transactionType === 'Pure Gold Buy' ? cashAmount + Number(totalCash) : cashAmount - Number(totalCash);
                return {
                    ...state,
                    cReceivable: state.transactionType === 'Pure Gold Buy' ? `${adjustCashAmount}R` : `${totalPure}G`,
                    cReceived: state.transactionType === 'Pure Gold Buy' ? `${adjustCashAmount}R` : `${totalPure}G`,
                    cPayable: state.transactionType === 'Pure Gold Buy' ? `${totalPure}G` : `${adjustCashAmount}R`,
                    cPaid: state.transactionType === 'Pure Gold Buy' ? `${totalPure}G` : `${adjustCashAmount}R`
                }
            }
        }

        // Bar Exchange In and Out, Pure Gold Buy and Sell
        case "UpdateInventoryItemList": {
            return {
                ...state,
                inventoryDetails: [
                    ...state.inventoryDetails,
                    {
                        itemType: '',
                        itemSubType: '',
                        points: '',
                        pure: '',
                        premium: '',
                        count: 1
                    }
                ]
            }
        }

        case "DisplayExistingTransaction": {
            return {
                tranID: action.payload.tran_id || '',
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
                sampleReturned: action.payload.sample_returned || '',
                inventoryDetails: action.payload.inventory_details || '',
                cReceived: action.payload.received || '',
                cReceivable: action.payload.receivable || '',
                cPaid: action.payload.paid || '',
                cPayable: action.payload.payable || '',
                bReceivable: action.payload.payable || '',
                bReceived: action.payload.paid || '',
                bPayable: action.payload.receivable || '',
                bPaid:  action.payload.received || '',
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
                finalGold: action.payload.final_gold || '',
                currBalance: action.payload.current_balance || '',
                prevBalance: action.payload.previous_balance || '',
                globalID: action.payload.global_id || ''
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
        case "Reset": {
            return {
                ...action.payload,
                inventoryDetails: [
                    {
                        itemType: '',
                        itemSubType: '',
                        points: '',
                        pure: '',
                        premium: '',
                        count: 1
                    }
                ]
            }
        }

        default:
            return state;
    }
};

export default transactionReducer;