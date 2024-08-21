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
                <span style={{ fontSize: '12px' }}>{data.date_created}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Customer/Account ID:</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{`${data.cust_id}/${new Intl.NumberFormat("en", { minimumIntegerDigits: 6, maximumSignificantDigits: 6, useGrouping: false}).format(data.acco_id)}`}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>{data.cust_name}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.cust_primary_number}</span>
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
                    <span style={{ fontSize: '12px' }}>{global_id} | {data.acco_tran_id}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>Sample Weight: {data.total_sample_weight}g</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Test Fees</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.fees}</span>
                </div>
            </div>
            {
                data.test_type === 'Raw Gold' ?
                    <>
                        <div className="row" >
                            <div className="col">
                                <span style={{ fontSize: '12px' }}>Labour Charges</span>
                            </div>
                            <div className="col" style={{ textAlignLast: 'right' }}>
                                <span style={{ fontSize: '12px' }}>{data.charges}/g</span>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col">
                                <span style={{ fontSize: '12px' }}>Advance Cash</span>
                            </div>
                            <div className="col" style={{ textAlignLast: 'right' }}>
                                <span style={{ fontSize: '12px' }}>{data.taken_cash ? data.taken_cash : 'NA'}</span>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col">
                                <span style={{ fontSize: '12px' }}>Advance Gold</span>
                            </div>
                            <div className="col" style={{ textAlignLast: 'right' }}>
                                <span style={{ fontSize: '12px' }}>{data.taken_gold ? data.taken_gold : 'NA'}</span>
                            </div>
                        </div>
                    </> : <></>
            }
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Please return in 60 minutes.</span>
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
                    <span style={{ fontSize: '12px' }}>{global_id} | {data.acco_tran_id}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>Sample Weight: {data.total_sample_weight}g</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Test Fees</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.fees}</span>
                </div>
            </div>
            <div className="row">
                <span style={{ fontSize: '12px' }}>Metal Composition:</span>
                {
                    (data.remarks.split(', ')).map((metal) => (
                        <span>   - {(metal.match(/.*:/))[0]} {(parseFloat((metal.match(/[\d]+/))[0]) / 10).toFixed(1)}% - {parseFloat(data.total_sample_weight * parseFloat((metal.match(/[\d]+/))[0]) / 1000).toFixed(3)}g</span>
                    ))
                }
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Thank you!</span>
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
                    <span style={{ fontSize: '12px' }}>{global_id} | {data.acco_tran_id}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>Sample Weight: {data.total_sample_weight}g</span>
                </div>
            </div>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Opening Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {prevBalance[0]} | Gold: {prevBalance[1]} | Sample: {prevBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Points</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.points}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Pure Weight</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.pure_weight}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Test Fees</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.fees}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Labour Charges Per Gram</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.charges}/g</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Total Labour Charges</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{Math.round(data.charges * data.total_sample_weight)}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Advance Cash</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.taken_cash ? data.taken_cash : 'NA'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Advance Gold</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.taken_gold ? data.taken_gold : 'NA'}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Closing Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {currBalance[0]} | Gold: {currBalance[1]} | Sample: {currBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            {
                latestBalance.length !== 0 &&
                    <>
                        <br/>
                        <hr style={{ margin: '0rem 0' }}/>
                        <div className="row" style={{ textAlignLast: 'center' }}>
                            <span style={{ fontSize: '12px' }}>Latest Balance</span>
                        </div>
                        <div className="row" style={{ textAlignLast: 'center' }}>
                            <span style={{ fontSize: '12px' }}>Cash: {latestBalance[0]} | Gold: {latestBalance[1]} | Sample: {latestBalance[2]}</span>
                        </div>
                        <hr style={{ margin: '0rem 0' }}/>
                    </>
            }
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Thank you!</span>
            </div>
        </>
    );
}

const printImpure = (global_id, data) => {
    const prevBalance = data.previous_balance.split(' ');
    const currBalance = data.current_balance.split(' ');
    return (
        <>
            <br/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>{global_id} | {data.acco_tran_id}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>Testing ID: {data.test_id}</span>
                </div>
            </div>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Opening Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {prevBalance[0]} | Gold: {prevBalance[1]} | Sample: {prevBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Sample Weight</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.total_sample_weight}g</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Points</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.points}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Pure Weight</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.pure_weight}g</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Test Fees (if included)</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.include_test_fees ? data.carried_fees : '0'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Charges</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.charges}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Rate</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.rate}/tola</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Previous amount to be paid</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.pending_taken_cash ? data.taken_cash : 'NA'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Receivable</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.receivable ? data.receivable : 'NA'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Received</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.received ? data.receivable: 'NA'}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Closing Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {currBalance[0]} | Gold: {currBalance[1]} | Sample: {currBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Thank you!</span>
            </div>
        </>
    );
}

const printExchange = (global_id, data) => {
    const prevBalance = data.previous_balance.split(' ');
    const currBalance = data.current_balance.split(' ');
    return (
        <>
            <br/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>{global_id} | {data.acco_tran_id}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>Testing ID: {data.test_id}</span>
                </div>
            </div>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Opening Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {prevBalance[0]} | Gold: {prevBalance[1]} | Sample: {prevBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Total Weight</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.total_sample_weight}g</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Points</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.points}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Pure Weight</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.pure_weight}g</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Charges</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.charges}R</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Payable</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.payable}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Paid</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.paid}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Closing Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {currBalance[0]} | Gold: {currBalance[1]} | Sample: {currBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Thank you!</span>
            </div>
        </>
    );
}

const printBoth = (global_id, data) => {
    const prevBalance = data.previous_balance.split(' ');
    const currBalance = data.current_balance.split(' ');
    return (
        <>
            <br/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>{global_id} | {data.acco_tran_id}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>Testing ID: {data.test_id}</span>
                </div>
            </div>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Opening Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {prevBalance[0]} | Gold: {prevBalance[1]} | Sample: {prevBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Total Weight</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.total_sample_weight}g</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Points</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.points}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Pure Weight</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.pure_weight}g</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Test Fees (if included)</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.include_test_fees ? data.carried_fees : '0'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Charges</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.charges}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Rate</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.rate}/tola</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Previous amount to be paid</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.pending_taken_cash ? data.taken_cash : 'NA'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Previous gold to be paid</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.pending_taken_gold ? data.taken_gold : 'NA'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Receivable</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.receivable ? data.receivable : 'NA'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Received</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.received ? data.received : 'NA'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Payable</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.payable ? data.payable : 'NA'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Paid</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.paid ? data.paid : 'NA'}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Closing Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {currBalance[0]} | Gold: {currBalance[1]} | Sample: {currBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Thank you!</span>
            </div>
        </>
    );
}

const printTezab = (global_id, data) => {
    const prevBalance = data.previous_balance.split(' ');
    const currBalance = data.current_balance.split(' ');
    return (
        <>
            <br/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>{global_id} | {data.acco_tran_id}</span>
                </div>
            </div>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Opening Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {prevBalance[0]} | Gold: {prevBalance[1]} | Sample: {prevBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Total Weight</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.total_sample_weight}g</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Points</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.points}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Pure Weight</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.pure_weight}g</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Charges</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.charges}R</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Receivable</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.receivable ? data.receivable : 'NA'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Received</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.received ? data.received : 'NA'}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Closing Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {currBalance[0]} | Gold: {currBalance[1]} | Sample: {currBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Thank you!</span>
            </div>
        </>
    );
}

const printPGBPGSBEIBEO = (global_id, data) => {
    const prevBalance = data.previous_balance.split(' ');
    const currBalance = data.current_balance.split(' ');
    return (
        <>
            <br/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>{global_id} | {data.acco_tran_id}</span>
                </div>
            </div>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Opening Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {prevBalance[0]} | Gold: {prevBalance[1]} | Sample: {prevBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            {
                data.inventory_details.map((item) => (
                    <>
                        <div className="row" >
                            <div className="col">
                                <span style={{ fontSize: '12px' }}>Type:</span>
                            </div>
                            <div className="col" style={{ textAlignLast: 'right' }}>
                                <span style={{ fontSize: '12px' }}>{item.itemType}</span>
                            </div>
                        </div>
                        {
                            item.itemSubType && 
                                <>
                                    <div className="row" >
                                        <div className="col">
                                            <span style={{ fontSize: '12px' }}>Sub Type:</span>
                                        </div>
                                        <div className="col" style={{ textAlignLast: 'right' }}>
                                            <span style={{ fontSize: '12px' }}>{item.itemSubType}</span>
                                        </div>
                                    </div>
                                </>
                        }
                        <div className="row" >
                            <div className="col">
                                <span style={{ fontSize: '12px' }}>Count:</span>
                            </div>
                            <div className="col" style={{ textAlignLast: 'right' }}>
                                <span style={{ fontSize: '12px' }}>{item.count}</span>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col">
                                <span style={{ fontSize: '12px' }}>Points:</span>
                            </div>
                            <div className="col" style={{ textAlignLast: 'right' }}>
                                <span style={{ fontSize: '12px' }}>{item.points}</span>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col">
                                <span style={{ fontSize: '12px' }}>Premium:</span>
                            </div>
                            <div className="col" style={{ textAlignLast: 'right' }}>
                                <span style={{ fontSize: '12px' }}>{item.premium}</span>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col">
                                <span style={{ fontSize: '12px' }}>Pure:</span>
                            </div>
                            <div className="col" style={{ textAlignLast: 'right' }}>
                                <span style={{ fontSize: '12px' }}>{item.pure}</span>
                            </div>
                        </div>
                        <br/>
                        <hr style={{ margin: '0rem 0' }}/>
                    </>
                ))
            }
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            {
                data.rate && 
                    <>
                        <div className="row" >
                            <div className="col">
                                <span style={{ fontSize: '12px' }}>Rate</span>
                            </div>
                            <div className="col" style={{ textAlignLast: 'right' }}>
                                <span style={{ fontSize: '12px' }}>{data.rate}</span>
                            </div>
                        </div>
                    </>
            }
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Payable</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.payable ? data.payable : 'NA'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Paid</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.paid ? data.paid: 'NA'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Receivable</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.receivable ? data.receivable : 'NA'}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Received</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.received ? data.received: 'NA'}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Closing Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {currBalance[0]} | Gold: {currBalance[1]} | Sample: {currBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Thank you!</span>
            </div>
        </>
    );
}

const printGivenLoan = (global_id, data) => {
    const prevBalance = data.previous_balance.split(' ');
    const currBalance = data.current_balance.split(' ');
    return (
        <>
            <br/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>{global_id} | {data.acco_tran_id}</span>
                </div>
            </div>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Opening Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {prevBalance[0]} | Gold: {prevBalance[1]} | Sample: {prevBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Against Receipts:</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.use_transaction_id ? data.use_transaction_id : 'NA'}</span>
                </div>
            </div>
            {
                data.remarks && 
                    <>
                        <div className="row">
                            <span style={{ fontSize: '12px' }}>Remarks:</span>
                        </div>
                        <div className="row">
                            <span style={{ fontSize: '12px' }}>{data.remarks}</span>
                        </div>
                    </>
            }
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Received</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.received}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Closing Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {currBalance[0]} | Gold: {currBalance[1]} | Sample: {currBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Thank you!</span>
            </div>
        </>
    );
}

const printTakenAdvance = (global_id, data) => {
    const prevBalance = data.previous_balance.split(' ');
    const currBalance = data.current_balance.split(' ');
    return (
        <>
            <br/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>{global_id} | {data.acco_tran_id}</span>
                </div>
            </div>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Opening Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {prevBalance[0]} | Gold: {prevBalance[1]} | Sample: {prevBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Against Receipts:</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.use_transaction_id ? data.use_transaction_id : 'NA'}</span>
                </div>
            </div>
            {
                data.remarks && 
                    <>
                        <div className="row">
                            <span style={{ fontSize: '12px' }}>Remarks:</span>
                        </div>
                        <div className="row">
                            <span style={{ fontSize: '12px' }}>{data.remarks}</span>
                        </div>
                    </>
            }
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Paid</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.paid}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Closing Balance</span>
            </div>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Cash: {currBalance[0]} | Gold: {currBalance[1]} | Sample: {currBalance[2]}</span>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Thank you!</span>
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
                    <span style={{ fontSize: '12px' }}>{`Suggested: ${data.transaction_id}`}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.transaction_date}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>{data.customer_name}</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.contact}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <hr style={{ margin: '0rem 0' }}/>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Sample Weight</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.sample_weight}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Expected Points</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.expected_points}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Expected Pure</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.expected_pure}</span>
                </div>
            </div>
            <div className="row" >
                <div className="col">
                    <span style={{ fontSize: '12px' }}>Discussed Rate</span>
                </div>
                <div className="col" style={{ textAlignLast: 'right' }}>
                    <span style={{ fontSize: '12px' }}>{data.discussed_rate}</span>
                </div>
            </div>
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            {
                data.remarks && 
                    <>
                        <hr style={{ margin: '0rem 0' }}/>
                        <div className="row">
                            <p style={{ fontSize: '12px' }}>Remarks:</p>
                        </div>
                        <div className="row">
                            <p style={{ fontSize: '12px' }}>{data.remarks}</p>
                        </div>
                    </>
            }
            <hr style={{ margin: '0rem 0' }}/>
            <br/>
            <div className="row" style={{ textAlignLast: 'center' }}>
                <span style={{ fontSize: '12px' }}>Thank you!</span>
            </div>
        </>
    )
}

const ReceiptPrintDisplay = ({reprint, displayData, latestBalance}) => {
    console.log(displayData)
    return (
        <>
            <div className="col hide-me" style={{ color: 'black' }} id="printreceipt">
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
                                            displayData.is_testing ?
                                                displayData.transaction.points ?
                                                    <>{ printTestingPostPoints(displayData.global_transaction_id, displayData.transaction, latestBalance) }</> :
                                                    (displayData.transaction.test_type === 'Other' && displayData.transaction.remarks) ?
                                                        <>{ printTestingOtherPostPoints(displayData.global_transaction_id, displayData.transaction) }</> :
                                                        <>{ printTestingPrePoints(displayData.global_transaction_id, displayData.transaction) }</>
                                                :   <>
                                                        { displayData.transaction.transaction_type === 'Impure' && printImpure(displayData.global_transaction_id, displayData.transaction) }
                                                        { displayData.transaction.transaction_type === 'Exchange' && printExchange(displayData.global_transaction_id, displayData.transaction) }
                                                        { displayData.transaction.transaction_type === 'Both' && printBoth(displayData.global_transaction_id, displayData.transaction) }
                                                        { displayData.transaction.transaction_type === 'Tezab' && printTezab(displayData.global_transaction_id, displayData.transaction) }
                                                        { 
                                                            (displayData.transaction.transaction_type === 'Pure Gold Buy' || displayData.transaction.transaction_type === 'Pure Gold Sell' || displayData.transaction.transaction_type === 'Bar Exchange In' || displayData.transaction.transaction_type === 'Bar Exchange Out') &&
                                                                printPGBPGSBEIBEO(displayData.global_transaction_id, displayData.transaction)
                                                        }
                                                        { (displayData.transaction.transaction_type === 'Given' || displayData.transaction.transaction_type === 'Loan') && printGivenLoan(displayData.global_transaction_id, displayData.transaction) }
                                                        { (displayData.transaction.transaction_type === 'Taken' || displayData.transaction.transaction_type === 'Advance') && printTakenAdvance(displayData.global_transaction_id, displayData.transaction) }
                                                    </>
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