import axios from 'axios';
const baseUrl = '/transactions';

const createTransaction = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const updateTransaction = newObject => {
    const request = axios.patch(baseUrl, newObject);
    return request.then(response => response.data);
}

const getAccoTranID = (type, id) => {
    if (id === '') {
        id = '0';
    }
    const request = axios.get(`${baseUrl}/${type}/${id}`);
    return request.then(response => response.data);
}

const getTranID = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const getAllAccoTranIDs = id => {
    if (id === '') {
        id = '0';
    }
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const getTestingTransaction = (accountID, testID) => {
    const request = axios.get(`${baseUrl}/${accountID}/testing/${testID}`);
    return request.then(response => response.data);
}

const getTakenGivenRelateds = (accountID, transaction) => {
    const request = axios.get(`${baseUrl}/${accountID}/relateds/${transaction}`);
    return request.then(response => response.data);
}

const getAdvanceLoanTransaction = (accountID, transaction) => {
    const request = axios.get(`${baseUrl}/${accountID}/all/${transaction}`);
    return request.then(response => response.data);
}

const getOneByIDs = (accountID, transaction) => {
    const request = axios.get(`${baseUrl}/${accountID}/one/${transaction}`);
    return request.then(response => response.data);
}

const updateTransactionClosingBalance = (acco_id, acco_tran_id, balance) => {
    const request = axios.patch(`${baseUrl}/${acco_id}/${acco_tran_id}`, balance);
    return request.then(response => response.data);
}

const getWeightPriceMeta = () => {
    const request = axios.get(`/meta`);
    return request.then(response => response.data);
}

const transactionService = { 
    createTransaction,
    updateTransaction,
    getAccoTranID,
    getTranID,
    getAllAccoTranIDs,
    getTestingTransaction,
    getTakenGivenRelateds,
    getAdvanceLoanTransaction,
    getOneByIDs,
    updateTransactionClosingBalance,
    getWeightPriceMeta
};
export default transactionService;