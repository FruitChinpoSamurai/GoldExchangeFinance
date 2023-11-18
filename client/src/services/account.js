import axios from 'axios';
const baseUrl = '/accounts';

const getAllAccounts = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const createAccount = id => {
    const request = axios.post(baseUrl, id);
    return request.then(response => response.data);
}

const getAccount = id => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const accountService = { getAllAccounts, createAccount, getAccount };
export default accountService;