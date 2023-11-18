import React from "react";

const Record = ({ data, clickHandle }) => {
    return (
        <>
        {
            data.acco_id === undefined ?
                <div className="row card mx-0 my-2" data-bs-toggle="modal" data-bs-target="#recordModalView" style={{cursor:'pointer'}} onClick={() => clickHandle(data)} >
                    <div className="row card-body ms-0">
                        <div className="col-10 card-text mt-2">
                            <span className="fw-semibold">{data.cust_id}</span>
                            <span> :: {data.cust_name} :: {data.cust_primary_number}</span>
                            {
                                data.cust_shop_address !== '' && <span> :: {data.cust_shop_address}</span>
                            }
                        </div>
                        <div className="col text-end">
                            <button className="btn" data-bs-toggle="modal" data-bs-target="#recordModalPost" style={{backgroundColor:"grey", color:"white"}} onClick={() => clickHandle(data)}>Update</button>
                        </div>
                    </div>
                </div> :
                <div className="row card mx-0 my-2" style={{cursor:'pointer'}} onClick={() => clickHandle('Statement', data)} >
                    <div className="row card-body ms-0">
                        <div className="col-10 card-text">
                            <span className="fw-semibold">{data.acco_id}</span>
                            <span className="fst-italic"> :: {data.cust_id}</span>
                            <span> :: {data.cust_name} :: {data.cust_primary_number}</span>
                        </div>
                    </div>
                </div>
        }
        </>
    )
}

export default Record;