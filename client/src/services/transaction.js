import axios from 'axios';
const baseUrl = '/transactions';

const createTransaction = newObject => {
    const request = axios.post(baseUrl, newObject);
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

const transactionService = { createTransaction, getAccoTranID, getTranID, getAllAccoTranIDs, getTestingTransaction, getTakenGivenRelateds, getAdvanceLoanTransaction, getOneByIDs };
export default transactionService;