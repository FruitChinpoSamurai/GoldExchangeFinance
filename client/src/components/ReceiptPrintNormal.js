import './Receipt.css';

const printShopLegend = () => {
    return (
        <>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '25px', fontWeight: 'bold' }}>Eastern Gold</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
        </>
    );
}

const printHeaderNormal = (data) => {
    return (
        <>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '10px' }}>{data.date_created}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>Customer/Account ID:</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{`${data.cust_id}/${new Intl.NumberFormat("en", { minimumIntegerDigits: 6, maximumSignificantDigits: 6, useGrouping: false}).format(data.acco_id)}`}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>{data.cust_name}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.cust_primary_number}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>       
        </>
    )
}

const printTestingPrePoints = (global_id, data) => {
    return (
        <>
            <br/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>{global_id} | {data.acco_tran_id}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>Sample Weight: {data.total_sample_weight}g</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>Test Fees</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.fees}</span>
                </div>
            </div>
            {
                data.test_type === 'Raw Gold' ?
                    <>
                        <div className="row" >
                            <div className="col">
                                <span style={{ fontSize: '10px' }}>Labour Charges</span>
                            </div>
                            <div className="col" style={{ textAlignLast: 'right' }}>
                                <span style={{ fontSize: '10px' }}>{data.charges}/g</span>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col">
                                <span style={{ fontSize: '10px' }}>Advance Cash</span>
                            </div>
                            <div className="col" style={{ textAlignLast: 'right' }}>
                                <span style={{ fontSize: '10px' }}>{data.taken_cash ? data.taken_cash : 'NA'}</span>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col">
                                <span style={{ fontSize: '10px' }}>Advance Gold</span>
                            </div>
                            <div className="col" style={{ textAlignLast: 'right' }}>
                                <span style={{ fontSize: '10px' }}>{data.taken_gold ? data.taken_gold : 'NA'}</span>
                            </div>
                        </div>
                    </> : <></>
            }
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '10px' }}>Please return in 60 minutes.</span>
            </div>
        </>
    );
}

const printTestingOtherPostPoints = (global_id, data) => {
    return (
        <>
            <br/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>{global_id} | {data.acco_tran_id}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>Sample Weight: {data.total_sample_weight}g</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>Test Fees</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.fees}</span>
                </div>
            </div>
            <div className="row">
                <span style={{ fontSize: '10px' }}>Metal Composition:</span>
                {
                    (data.remarks.split(', ')).map((metal) => (
                        <span>   - {(metal.match(/.*:/))[0]} {(parseFloat((metal.match(/[\d]+/))[0]) / 10).toFixed(1)}% - {parseFloat(data.total_sample_weight * parseFloat((metal.match(/[\d]+/))[0]) / 1000).toFixed(3)}g</span>
                    ))
                }
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '10px' }}>Thank you!</span>
            </div>
        </>
    );
}

const printTestingPostPoints = (global_id, data, latestBal) => {
    const prevBalance = data.previous_balance.split(' ');
    const currBalance = data.current_balance.split(' ');
    const latestBalance = latestBal ? latestBal.split(' ') : [];
    return (
        <>
            <br/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>{global_id} | {data.acco_tran_id}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>Sample Weight: {data.total_sample_weight}g</span>
                </div>
            </div>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '10px' }}>Opening Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '10px' }}>Cash: {prevBalance[0]} | Gold: {prevBalance[1]} | Sample: {prevBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>Points</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.points}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>Test Fees</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.fees}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>Labour Charges Per Gram</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.charges}/g</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>Labour Charges Per Gram</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.charges}/g</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>Total Labour Charges</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{Math.round(data.charges * data.total_sample_weight)}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>Advance Cash</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.taken_cash ? data.taken_cash : 'NA'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>Advance Gold</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.taken_gold ? data.taken_gold : 'NA'}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '10px' }}>Closing Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '10px' }}>Cash: {currBalance[0]} | Gold: {currBalance[1]} | Sample: {currBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            {
                latestBalance.length !== 0 &&
                    <>
                        <br/>
                        <hr style={{ margin: '0rem 0' }}/>
                        <div className="row" style={{ textAlignLast: 'center' }}>
                            <span style={{ fontSize: '10px' }}>Latest Balance</span>
                        </div>
                        <div className="row" style={{ textAlignLast: 'center' }}>
                            <span style={{ fontSize: '10px' }}>Cash: {latestBalance[0]} | Gold: {latestBalance[1]} | Sample: {latestBalance[2]}</span>
                        </div>
                        <hr style={{ margin: '0rem 0' }}/>
                    </>
            }
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '10px' }}>Thank you!</span>
            </div>
        </>
    );
}

const printHeaderSuggested = (data) => {
    return (
        <>
            <br/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>{`Suggested: ${data.transaction_id}`}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.transaction_date}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>{data.customer_name}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.contact}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>Sample Weight</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.sample_weight}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>Expected Points</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.expected_points}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>Expected Pure</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.expected_pure}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '10px' }}>Discussed Rate</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '10px' }}>{data.discussed_rate}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            {
                data.remarks && 
                    <>
                        <hr style={{ margin: '0rem 0' }}/>
                        <div className="row">
                            <p style={{ fontSize: '10px' }}>Remarks:</p>
                        </div>
                        <div className="row">
                            <p style={{ fontSize: '10px' }}>{data.remarks}</p>
                        </div>
                    </>
            }
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '10px' }}>Thank you!</span>
            </div>
        </>
    )
}


const ReceiptPrintDisplay = ({reprint, displayData, latestBalance}) => {
    console.log(reprint, displayData, latestBalance);
    return (
        <>
            <div className="col hide-me" style={{ width: '280px' }} id="printreceipt">
                {
                    displayData ?
                        <>
                            { printShopLegend() }
                            {
                                displayData.customer_name ?
                                    printHeaderSuggested(displayData) :
                                    <>
                                        { printHeaderNormal(displayData.header) }
                                        {
                                            displayData.is_testing &&
                                                displayData.transaction.points ?
                                                    <>{ printTestingPostPoints(displayData.global_transaction_id, displayData.transaction, latestBalance) }</> :
                                                    (displayData.transaction.test_type === 'Other' && displayData.transaction.remarks) ?
                                                        <>{ printTestingOtherPostPoints(displayData.global_transaction_id, displayData.transaction) }</> :
                                                        <>{ printTestingPrePoints(displayData.global_transaction_id, displayData.transaction) }</>
                                        }
                                    </>
                            }
                        </>
                        : <></>
                }
            </div>
        </>
    );
};

export default ReceiptPrintDisplay;