import React, { useState } from "react";
import Record from "../Record";
import customerService from "../../services/customer";
import RecordModalView from "./RecordModalView";
import RecordModalPost from "./RecordModalPost";
import RecordModalCreate from "./RecordModalCreate";

const CustomersRecords = ({ customers, searched, updateCustomers }) => {
    const [clickedCustomer, setClickedCustomer] = useState({});
    const [accounts, setAccounts] = useState([]);

    const clickHandle = (customer_clicked) => {
        setClickedCustomer(customer_clicked);
        customerService
          .getCustomerAccounts(customer_clicked.cust_id)
          .then(accs => {
            setAccounts(accs);
        });
    }

    const updateAccounts = (value) => {
        setAccounts(value);
    }

    const clearCustomer = () => {
        setClickedCustomer({});
    }

    const customersFiltered = customers
                                .filter(customer => (
                                    (customer.cust_id).includes(searched) ||
                                    ((customer.cust_name).toLocaleLowerCase()).includes(searched.toLocaleLowerCase()) ||
                                    (customer.cust_primary_number).includes(searched) ||
                                    (customer.cust_alternate_number).includes(searched) ||
                                    (customer.cust_nic).includes(searched) ||
                                    ((customer.cust_email).toLocaleLowerCase()).includes(searched.toLocaleLowerCase()) ||
                                    (customer.cust_ptclf_number).includes(searched) ||
                                    (customer.cust_ptcls_number).includes(searched) ||
                                    ((customer.cust_shop_address).toLocaleLowerCase()).includes(searched.toLocaleLowerCase()) ||
                                    ((customer.cust_reference).toLocaleLowerCase()).includes(searched.toLocaleLowerCase())
                                ))

    return (
        <div className="col mt-5 mb-2 mx-3">
            {
                searched === '' && customers.length !== 0 ?
                    customers
                        .map(customer => (
                            <Record key={customer.cust_id} data={customer} clickHandle={clickHandle} />
                        )) :
                    customersFiltered
                        .map(customer => (
                            <Record key={customer.cust_id} data={customer} clickHandle={clickHandle} />
                        ))
            }
            {
                customersFiltered.length === 0 &&
                    <div className="text-center fs-1">  
                        No relevant records found.
                    </div>
            }

            {/* Clicking on a record should show all customer details. */}
            <RecordModalView customer={clickedCustomer} accounts={accounts} handleAccounts={updateAccounts} />

            {/* Update a customer's details. */}
            <RecordModalPost customer={clickedCustomer} handleCustomer={clearCustomer} updateCustomers={updateCustomers} accounts={accounts} handleAccounts={updateAccounts} />

            {/* Create a new customer. */}
            <RecordModalCreate updateCustomers={updateCustomers} />
        </div>
    )
}

export default CustomersRecords;