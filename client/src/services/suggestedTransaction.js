import axios from 'axios';
const baseUrl = '/suggested_transaction';

const getAll = () => {
    const request = axios.get(`${baseUrl}`);
    return request.then(response => response.data);
}

const createSuggestedTransaction = transactionObject => {
    const request = axios.post(`${baseUrl}`, transactionObject);
    return request.then(response => response.data); 
}

const getSuggestedCounts = () => {
    const request = axios.get(`${baseUrl}/counts`);
    return request.then(response => response.data);
}

const suggestedTransactionService = { getAll, createSuggestedTransaction, getSuggestedCounts };
export default suggestedTransactionService;