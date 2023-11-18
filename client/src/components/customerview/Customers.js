import React, { useState, useEffect } from "react";
import CustomersHeader from "./CustomersHeader";
import CustomersRecords from "./CustomersRecords";
import customerService from "../../services/customer";

const Customers = ({ returnClickHandle }) => {
    const [customers, setCustomers] = useState([]);
    const [searched, setSearched] = useState('');

    useEffect(() => {
        customerService
          .getAllCustomers()
          .then(customers => {
            setCustomers(customers);
            console.log(customers);
          })
      }, []);

    const searchHandle = (e) => {
        setSearched(e.target.value);
    };

    const updateCustomers = (updated) => {
        setCustomers(updated);
    };

    return (
        <div className="container">
            <div className="mx-auto border border-3 rounded mt-5 mb-5" style={{backgroundColor:"#D3C074"}}>
                <CustomersHeader
                    returnClickHandle={returnClickHandle}
                    searched={searched}
                    searchHandle={searchHandle}
                    updateCustomers={updateCustomers}
                />
                <CustomersRecords 
                    customers={customers}
                    searched={searched}
                    updateCustomers={updateCustomers}
                />
            </div>
        </div>
    )
}

export default Customers;