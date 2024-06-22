import { Br, Cut, Line, Printer, Row, Text, render } from 'react-thermal-printer';

async function printShopLegend() {
    const commands = await render(
        <Printer type="epson">
            <Text size={{ width: 2, height: 4 }} align='center'>Eastern Gold</Text>
            {/* <Text size={{ width: 2, height: 1 }} align='center' underline="1dot-thick" bold={true}>Refiners & Assayers</Text>
            <Text size={{ width: 1, height: 1 }} align='center' bold={true}>Shop 1-13 Ground Floor Parr Street, Sarah Sunar</Text>
            <Text size={{ width: 1, height: 1 }} align='center' bold={true}>Center Saddar, Karachi. Tel: 35657951-2</Text> */}
        </Printer>
    );
    return commands;
}

async function printHeaderNormal(data) {
    const commands = await render(
        <Printer type="epson">
            <Br />
            <Text align='center'>{data.date_created}</Text>
            <Line character="-"/>
            <Row left="Customer/Account ID:" right={`${data.cust_id}/${new Intl.NumberFormat("en", { minimumIntegerDigits: 6, maximumSignificantDigits: 6, useGrouping: false}).format(data.acco_id)}`}/>
            <Row left={data.cust_name} right={data.cust_primary_number}/>
            <Line character="-"/>
        </Printer>
    );
    return commands;
}

async function printHeaderSuggested(data) {
    const commands = await render(
        <Printer type="epson">
            <Br />
            <Row left={`Suggested: ${data.transaction_id}`} right={data.transaction_date}/>
            <Line character="-"/>
            <Row left={data.customer_name} right={data.contact}/>
            <Line character="-"/>
            <Br />
            <Line character="-"/>
            <Row left="Sample Weight" right={data.sample_weight}/>
            <Row left="Expected Points" right={data.expected_points}/>
            <Row left="Expected Pure" right={data.expected_pure}/>
            <Row left="Discussed Rate" right={data.discussed_rate}/>
            <Line character="-"/>
            <Br />
            {
                data.remarks &&
                    <>
                        <Line character="-"/>
                        <Text bold={true}>Remarks:</Text>
                        <Text>{data.remarks}</Text>
                    </>
            }
            <Line character="-"/>
            <Br />
            <Text align='center' bold={true} underline="1dot-thick">Thank you!</Text>
            <Cut />
        </Printer>
    );
    return commands;
}

async function printTestingPrePoints(global_id, data) {
    const commands = await render(
        <Printer type="epson">
            <Br />
            <Row left={<Text bold={true}>{global_id} | {data.acco_tran_id}</Text>} right={<Text size={{ width: 1, height: 1 }} underline="1dot-thick">Sample Weight: {data.total_sample_weight}g</Text>} />
            <Line character="-"/>
            <Row left='Test Fees' right={<Text>{data.fees}</Text>} />
            {
                data.test_type === 'Raw Gold' ?
                    <>
                        <Row left='Labour Charges' right={<Text>{data.charges}/g</Text>} />
                        <Row left='Advance Cash' right={<Text>{data.taken_cash ? data.taken_cash : 'NA'}</Text>} />
                        <Row left='Advance Gold' right={<Text>{data.taken_gold ? data.taken_gold : 'NA'}</Text>} />
                    </> : <></>
            }
            <Line character="-"/>
            <Br />
            <Text align='center' bold={true} underline="1dot-thick">Please return in 60 minutes.</Text>
            <Cut />
        </Printer>
    );
    return commands;
}

async function printTestingOtherPostPoints(global_id, data) {
    const commands = await render(
        <Printer type="epson">
            <Br />
            <Row left={<Text bold={true}>{global_id} | {data.acco_tran_id}</Text>} right={<Text size={{ width: 1, height: 1 }} underline="1dot-thick">Sample Weight: {data.total_sample_weight}g</Text>} />
            <Line character="-"/>
            <Row left='Test Fees' right={<Text>{data.fees}</Text>} />
            <Text>Metal Composition:</Text>
            {
                (data.remarks.split(', ')).map((metal) => (
                    <Text>   - {(metal.match(/.*:/))[0]} {(parseFloat((metal.match(/[\d]+/))[0]) / 10).toFixed(1)}% - {parseFloat(data.total_sample_weight * parseFloat((metal.match(/[\d]+/))[0]) / 1000).toFixed(3)}g</Text>
                ))
            }
            <Line character="-"/>
            <Br />
            <Text align='center' bold={true} underline="1dot-thick">Thank you!</Text>
            <Cut />
        </Printer>
    );
    return commands;
}

async function printTestingPostPoints(global_id, data, latestBal) {
    const prevBalance = data.previous_balance.split(' ');
    const currBalance = data.current_balance.split(' ');
    const latestBalance = latestBal ? latestBal.split(' ') : [];
    const commands = await render(
        <Printer type="epson">
            <Br />
            <Row left={<Text bold={true}>{global_id} | {data.acco_tran_id}</Text>} right={<Text size={{ width: 1, height: 1 }} underline="1dot-thick">Sample Weight: {data.total_sample_weight}g</Text>} />
            <Br />
            <Line character="-"/>
            <Text align='center'>Opening Balance</Text>
            <Text align='center'>Cash: {prevBalance[0]} | Gold: {prevBalance[1]} | Sample: {prevBalance[2]}</Text>
            <Line character="-"/>
            <Br />
            <Line character="-"/>
            <Row left='Points' right={<Text>{data.points}</Text>} />
            <Row left='Pure Weight' right={<Text>{data.pure_weight}g</Text>} />
            <Row left='Test Fees' right={<Text>{data.fees}</Text>} />
            <Row left='Labour Charges Per Gram' right={<Text>{data.charges}/g</Text>} />
            <Row left='Total Labour Charges' right={<Text>{Math.round(data.charges * data.total_sample_weight)}</Text>} />
            <Row left='Advance Cash' right={<Text>{data.taken_cash ? data.taken_cash : 'NA'}</Text>} />
            <Row left='Advance Gold' right={<Text>{data.taken_gold ? data.taken_gold : 'NA'}</Text>} />
            <Line character="-"/>
            <Br />
            <Line character="-"/>
            <Text align='center'>Closing Balance</Text>
            <Text align='center'>Cash: {currBalance[0]} | Gold: {currBalance[1]} | Sample: {currBalance[2]}</Text>
            <Line character="-"/>
            {
                latestBalance.length !== 0 && 
                    <>
                        <Br />
                        <Line character="-"/>
                        <Text align='center'>Latest Balance</Text>
                        <Text align='center'>Cash: {latestBalance[0]} | Gold: {latestBalance[1]} | Sample: {latestBalance[2]}</Text>
                        <Line character="-"/>
                    </>
            }
            <Text align='center' bold={true} underline="1dot-thick">Thank you!</Text>
            <Cut /> 
        </Printer>
    );
    return commands;
}

// async function printClosingBalanceAndCut(balances) {
//     const commands = await render(
//         <Printer type='epson'>
//             <Line character="-"/>
//             <Text align='center'>Closing Balance</Text>
//             <Text align='center'>Cash: {balances.cash} | Gold: {balances.gold} | Sample: {balances.sample}</Text>
//             <Line character="-"/>
//             <Text align='center' bold={true} underline="1dot-thick">Please return in 60 minutes.</Text>
//             <Cut />
//         </Printer>
//     );
//     return commands;
// }

async function printer(device, commands) {
    await device.open();
    await device.selectConfiguration(1);
    await device.claimInterface(0);
    await device.transferOut(
        device.configuration.interfaces[0].alternate.endpoints.find(obj => obj.direction === 'out').endpointNumber,
        commands
    );
    await device.close();
}

const receiptPrint = (reprint, displayData, latestBalance) => {
    const filters = [
        { vendorId: 0x0fe6 }
    ];
    navigator.usb.getDevices().then((devices) => {
        if (devices.length === 0) {
            navigator.usb.requestDevice({ filters })
                .then((device) => {
                    printShopLegend().then((shopLegend) => {
                        printer(device, shopLegend).then(() => {
                            // if (!reprint) {
                                if (displayData.customer_name) {
                                    printHeaderSuggested(displayData).then((receiptData) => {
                                        printer(device, receiptData)
                                    })
                                } else {
                                    printHeaderNormal(displayData.header).then((header) => {
                                        printer(device, header).then(() => {
                                            if (displayData.is_testing) {
                                                // If points was entered, generate Post-Points slip/report.
                                                if (displayData.transaction.points) {
                                                    printTestingPostPoints(displayData.global_transaction_id, displayData.transaction, latestBalance).then((transaction) => {
                                                        printer(device, transaction)
                                                    })
                                                } else { // Otherwise, generate Pre-Points slip.
                                                    if (displayData.transaction.test_type === 'Other' && displayData.transaction.remarks) {
                                                        printTestingOtherPostPoints(displayData.global_transaction_id, displayData.transaction).then((transaction) => {
                                                            printer(device, transaction)
                                                        })
                                                    } else {
                                                        printTestingPrePoints(displayData.global_transaction_id, displayData.transaction).then((transaction) => {
                                                            printer(device, transaction)
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    })
                                }
                            // }
                        })
                    })
                })
                .catch((error) => console.log(error))
        } else {
            devices.forEach((device) => {
                if (device.vendorId === 0x0fe6) {
                    printShopLegend().then((shopLegend) => {
                        printer(device, shopLegend).then(() => {
                            // if (!reprint) {
                                if (displayData.customer_name) {
                                    printHeaderSuggested(displayData).then((receiptData) => {
                                        printer(device, receiptData)
                                    })
                                } else {
                                    printHeaderNormal(displayData.header).then((header) => {
                                        printer(device, header).then(() => {
                                            if (displayData.is_testing) {
                                                // If points was entered, generate Post-Points slip/report.
                                                if (displayData.transaction.points) {
                                                    printTestingPostPoints(displayData.global_transaction_id, displayData.transaction, latestBalance).then((transaction) => {
                                                        printer(device, transaction)
                                                    })
                                                } else { // Otherwise, generate Pre-Points slip.
                                                    if (displayData.transaction.test_type === 'Other' && displayData.transaction.remarks) {
                                                        printTestingOtherPostPoints(displayData.global_transaction_id, displayData.transaction).then((transaction) => {
                                                            printer(device, transaction)
                                                        })
                                                    } else {
                                                        printTestingPrePoints(displayData.global_transaction_id, displayData.transaction).then((transaction) => {
                                                            printer(device, transaction)
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    })
                                }
                            // }
                        })
                    })
                    .catch((error) => console.log(error))
                } else {
                    navigator.usb.requestDevice()
                        .then((device) => {
                            printShopLegend().then((shopLegend) => {
                                printer(device, shopLegend).then(() => {
                                    // if (!reprint) {
                                        if (displayData.customer_name) {
                                            printHeaderSuggested(displayData).then((receiptData) => {
                                                printer(device, receiptData)
                                            })
                                        } else {
                                            printHeaderNormal(displayData.header).then((header) => {
                                                printer(device, header).then(() => {
                                                    if (displayData.is_testing) {
                                                        // If points was entered, generate Post-Points slip/report.
                                                        if (displayData.transaction.points) {
                                                            printTestingPostPoints(displayData.global_transaction_id, displayData.transaction, latestBalance).then((transaction) => {
                                                                printer(device, transaction)
                                                            })
                                                        } else { // Otherwise, generate Pre-Points slip.
                                                            if (displayData.transaction.test_type === 'Other' && displayData.transaction.remarks) {
                                                                printTestingOtherPostPoints(displayData.global_transaction_id, displayData.transaction).then((transaction) => {
                                                                    printer(device, transaction)
                                                                })
                                                            } else {
                                                                printTestingPrePoints(displayData.global_transaction_id, displayData.transaction).then((transaction) => {
                                                                    printer(device, transaction)
                                                                })
                                                            }
                                                        }
                                                    }
                                                })
                                            })
                                        }
                                    // }
                                })
                            })
                        })
                        .catch((error) => console.log(error))
                }
            });
        }
    });
}

// const closeReceiptWithBalanceAndPrint = (balances) => {
//     navigator.usb.getDevices()
//         .then((devices) => {
//             printClosingBalanceAndCut(balances).then((closing) => {
//                 printer(devices[0], closing);
//             })
//         })
// }

const printService = { receiptPrint };
export default printService;