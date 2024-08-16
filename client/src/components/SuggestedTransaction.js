import React, { useEffect, useRef, useReducer, useState} from "react";
import suggestedTransactionReducer from "../reducers/suggestedTransactionReducer";
import suggestedTransactionService from "../services/suggestedTransaction";
import print from 'print-js';

const initialFormState = {
    date: '',
    name: '',
    contact: '',
    sample_weight: '',
    expected_points: '',
    expected_pure: '',
    discussed_rate: '',
    remarks: ''
}

const SuggestedTransaction = ({ setGlobalReceipt }) => {
    const closeModal = useRef(null);
    const [formData, dispatch] = useReducer(suggestedTransactionReducer, initialFormState);
    const [create, setCreate] = useState(false);
    const [counts, setCounts] = useState('');
    const [suggestedTransactions, setSuggestedTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searched, setSearched] = useState('');
    
    useEffect(() => {
        const currentDate = new Date().toLocaleString().split(', ');
        dispatch({
            type: 'setCurrentDate',
            payload: currentDate[0]
        })
        suggestedTransactionService.getSuggestedCounts()
            .then(response => {
                setCounts(response);
            })
            .catch(response => {
                console.log(response);
            })
        suggestedTransactionService.getAll()
            .then(response => {
                setSuggestedTransactions(response);
            })
            .catch(response => {
                console.log(response);
            })
    }, [create]);

    useEffect(() => {
        if (suggestedTransactions.length > 0) {
            const filtered = suggestedTransactions.filter(transaction => (
                (transaction.suggested_transaction_id && transaction.suggested_transaction_id === Number(searched)) ||
                (transaction.transaction_date.split(' ')[0]).includes(searched) ||
                (transaction.customer_name.toLowerCase()).includes(searched.toLowerCase()) ||
                (transaction.contact).includes(searched) ||
                (transaction.sample_weight && transaction.sample_weight === searched) ||
                (transaction.expected_points && transaction.expected_points === Number(searched)) ||
                (transaction.expected_pure && transaction.expected_pure === searched) ||
                (transaction.discussed_rate && transaction.discussed_rate === Number(searched))
            ))
            setFilteredTransactions(filtered)
        }
    }, [suggestedTransactions, searched])

    const handleTextChange = (e) => {
        dispatch({
            type: "UpdateText",
            field: e.target.name,
            payload: e.target.value
        });
    };

    const handlePointsAndPure = (e) => {
        dispatch({
            type: "UpdatePointsAndPure",
            field: e.target.name,
            payload: e.target.value
        })
    }

    const setNullerAndCreationDate = () => {
        const cleanedFormData = structuredClone(formData);
        Object.keys(cleanedFormData).forEach((key) => {
            if (cleanedFormData[key] === '') {
                cleanedFormData[key] = null;
            }
        }, cleanedFormData);
        return cleanedFormData;
    }

    const resetFields = () => {
        setTimeout(() => {
            dispatch({
                type: 'Reset',
                payload: initialFormState
            });
            const currentDate = new Date().toLocaleString().split(', ');
            dispatch({
                type: 'setCurrentDate',
                payload: currentDate[0]
            });
            setCreate(false);
        }, 750)
    }

    const submitForm = (e) => {
        e.preventDefault();
        const data = setNullerAndCreationDate();
        const createBody = {
            transaction_id: counts,
            transaction_date: data.date,
            customer_name: data.name,
            contact: data.contact,
            sample_weight: data.sample_weight,
            expected_points: data.expected_points,
            expected_pure: data.expected_pure,
            discussed_rate: data.discussed_rate,
            remarks: data.remarks,
        };
        suggestedTransactionService.createSuggestedTransaction(createBody)
            .then(response => {
                resetFields();
                setGlobalReceipt({ reprint: false, displayData: createBody, latestBalance: 'none' })
                setTimeout(() => {
                    print({printable: 'printreceipt', type: 'html', targetStyles: ["*"], font_size: '', style: '.hide-me { display: block !important; }'})
                }, 1500);
            })
            .catch(response => {
                console.log(response);
            })
    }

    const modalBodyForm = () => {
        return (
            <form id="suggestedTransactionForm" onSubmit={submitForm}>
                <div className="row my-2">
                    <div className="col">
                        <input type="text" required className="form-control" name="date" placeholder="Date" value={formData.date} onInput={(e) => handleTextChange(e)} pattern="\d{1,2}\/\d{1,2}\/\d{4}" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <input type="text" required className="form-control" name="name" placeholder="Name" value={formData.name} onInput={(e) => handleTextChange(e)} minLength={3} maxLength={50} />
                    </div>
                    <div className="col">
                        <input type="text" required className="form-control" name="contact" placeholder="Contact" value={formData.contact} onInput={(e) => handleTextChange(e)} maxLength={15} pattern="\+92\d+|0\d+" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <input type="text" required className="form-control" name="sample_weight" placeholder="Sample Weight" value={formData.sample_weight} onInput={(e) => handleTextChange(e)} pattern="\d+.\d{2}" />
                    </div>
                    <div className="col">
                        <input type="text" required className="form-control" name="expected_points" placeholder="Expected Points" value={formData.expected_points} onInput={(e) => handlePointsAndPure(e)} pattern="\d{1,3}.\d{2}" />
                    </div>
                    <div className="col">
                        <input type="text" required className="form-control" name="expected_pure" placeholder="Expected Pure" value={formData.expected_pure} onInput={(e) => handleTextChange(e)} readOnly={true} />
                    </div>
                    <div className="col">
                        <input type="text" required className="form-control" name="discussed_rate" placeholder="Discussed Rate" value={formData.discussed_rate} onInput={(e) => handleTextChange(e)} pattern="\d{1,6}" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <textarea className="form-control" required rows={3} name='remarks' placeholder="Remarks..." value={formData.remarks} onInput={(e) => handleTextChange(e)}></textarea>
                    </div>
                </div>
            </form>
        );
    };

    const modalBodyList = () => {
        return (
            <>
                {
                    filteredTransactions.length > 0 ?
                        <div className="accordion" id="accordionSuggestedTransaction" style={{ maxHeight: '700px', overflowY: 'scroll' }}>
                            {
                                filteredTransactions.map((transaction) => (
                                    <div key={transaction.suggested_transaction_id} className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${transaction.suggested_transaction_id}`} aria-expanded="true" aria-controls={`${transaction.suggested_transaction_id}`}>
                                                {transaction.suggested_transaction_id} | { transaction.customer_name } | { transaction.contact }
                                            </button>
                                        </h2>
                                        <div id={`${transaction.suggested_transaction_id}`} className="accordion-collapse collapse" data-bs-parent="#accordionSuggestedTransaction">
                                            <div className="accordion-body">
                                                <b>Date: </b><span>{transaction.transaction_date}</span><br/>
                                                <b>Sample Weight: </b><span>{transaction.sample_weight}</span><br/>
                                                <b>Expected Points: </b><span>{transaction.expected_points}</span><br/>
                                                <b>Expected Pure: </b><span>{transaction.expected_pure}</span><br/>
                                                <b>Discussed Rate: </b><span>{transaction.discussed_rate}</span><br/>
                                                <b>Remarks: </b><span>{transaction.remarks}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div> :
                        <p style={{ textAlign: 'center' }}>No relevant transactions found.</p>
                }
            </>
        );
    };

    return (
        <div className="modal fade" id="transactionSuggested" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Suggested Transactions | {counts}</h1>
                        <button ref={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => resetFields()}></button>
                    </div>
                    <div className="modal-body">
                        {
                            create ?
                                modalBodyForm() :
                                modalBodyList()
                        }
                    </div>
                    <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
                        {
                            create ?
                                <button className="btn" form='suggestedTransactionForm' type="submit" style={{backgroundColor:"grey", color:"white"}}>Save</button> :
                                <>
                                    <input type="text" className="form-control" style={{ maxWidth: '500px' }} placeholder="Search..." value={searched} onInput={(e) => setSearched(e.target.value)} />
                                    <button className="btn" type="button" style={{backgroundColor:"grey", color:"white"}} onClick={() => setCreate(true)}>New</button>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuggestedTransaction;