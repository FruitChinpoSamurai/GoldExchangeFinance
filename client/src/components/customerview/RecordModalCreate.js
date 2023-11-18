import React, { useState } from "react";
import customerService from "../../services/customer";

const RecordModalCreate = ({ updateCustomers }) => {
    const [name, setName] = useState('');
    const [primNum, setPrimNum] = useState('');
    const [altNum, setAltNum] = useState('');
    const [nic, setNic] = useState('');
    const [email, setEmail] = useState('');
    const [ptclNum, setPtclNum] = useState('');
    const [altPtclNum, setAltPtclNum] = useState('');
    const [address, setAddress] = useState('');
    const [reference, setReference] = useState('');
    const [fees, setFees] = useState('250');
    const [charges, setCharges] = useState('15');
    const [message, setMessage] = useState('');
    const [errorColor, setErrorColor] = useState('text-danger');

    const onSubmitForm = (e) => {
        e.preventDefault();
        const nullSets = emptyNuller([altNum, nic, email, ptclNum, altPtclNum, address, reference])
        const createParams = { cust_name: name, cust_primary_number: primNum, cust_alternate_number: nullSets[0], cust_nic: nullSets[1], cust_email: nullSets[2], cust_ptclf_number: nullSets[3], cust_ptcls_number: nullSets[4], cust_shop_address: nullSets[5], cust_reference: nullSets[6], cust_test_fees: fees, cust_pg_charges: charges };
        customerService
            .createCustomer(createParams)
            .then(response => {
                if (response.status) { 
                    setErrorColor('text-success')
                    setTimeout(() => {
                        customerService
                            .getAllCustomers()
                            .then(customers => {
                                const updated = customers
                                updateCustomers(updated);
                            })
                    }, 2000)
                }
                setMessage(response.message);
            })
            .catch(() => setMessage("Something went wrong."));
    }

    const resetModal = () => {
        setMessage('');
        setName('');
        setPrimNum('');
        setAltNum('');
        setNic('');
        setEmail('');
        setPtclNum('');
        setAltPtclNum('');
        setAddress('');
        setReference('');
        setFees('250');
        setCharges('15');
        setErrorColor('text-danger');
    }

    const emptyNuller = (values) => {
        const cleaned = values.map(value => {
            if (value === '') { return null }
            else { return value }
        });
        return cleaned;
    }

    return (
        <div className="modal fade" id="recordModalCreate" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Add a new customer</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => resetModal()} ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onSubmitForm}>
                            <div className="row">
                                <div className="col">
                                <span className="fw-semibold">Name: </span><br/>
                                    <input className="form-control" type="text" required maxLength="50" value={name ?? ''} onChange={e => setName(e.target.value)} /><br/>
                                    <span className="fw-semibold">Primary Number:</span><br/>
                                    <input className="form-control" type="text" required maxLength="15" value={primNum ?? ''} onChange={e => setPrimNum(e.target.value)} /><br/>
                                    <span className="fw-semibold">NIC:</span><br/>
                                    <input className="form-control" type="text" maxLength="13" minLength="13"value={nic ?? ''} onChange={e => setNic(e.target.value)} /><br/>
                                    <span className="fw-semibold">PTCL Number:</span><br/>
                                    <input className="form-control" type="text" value={ptclNum ?? ''} maxLength="15" onChange={e => setPtclNum(e.target.value)} /><br/>
                                    <span className="fw-semibold">Shop Address:</span><br/>
                                    <input className="form-control" type="text" value={address ?? ''} maxLength="500" onChange={e => setAddress(e.target.value)} /><br/>
                                    <span className="fw-semibold">Test Fees:</span><br/>
                                    <input className="form-control" type="text" required value={fees ?? ''} maxLength="4" onChange={e => setFees(e.target.value)} /><br/>
                                </div>
                                <div className="col">
                                <div style={{height:'86px'}}></div>
                                    <span className="fw-semibold">Alternate Number:</span><br/>
                                    <input className="form-control" type="text" maxLength="15" value={altNum ?? ''} onChange={e => setAltNum(e.target.value)} /><br/>
                                    <span className="fw-semibold">Email:</span><br/>
                                    <input className="form-control" type="email" value={email ?? ''} maxLength="50" onChange={e => setEmail(e.target.value)} /><br/>
                                    <span className="fw-semibold">Alternate PTCL Number:</span><br/>
                                    <input className="form-control" type="text" value={altPtclNum ?? ''} maxLength="15" onChange={e => setAltPtclNum(e.target.value)} /><br/>
                                    <span className="fw-semibold">Reference:</span><br/>
                                    <input className="form-control" type="text" value={reference ?? ''} maxLength="255" onChange={e => setReference(e.target.value)} /><br/>
                                    <span className="fw-semibold">Charges Per Gram:</span><br/>
                                    <input className="form-control" type="text" required value={charges ?? ''} maxLength="4" onChange={e => setCharges(e.target.value)} /><br/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn" style={{backgroundColor:"grey", color:"white"}}>Add customer</button>
                            </div>
                        </form>
                        {
                            message !== '' && <p className={"text-center " + errorColor}>{message}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecordModalCreate;