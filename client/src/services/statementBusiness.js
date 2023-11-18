import axios from 'axios';
const baseUrl = '/business_statement';

const getAll = (title, date) => {
    const request = axios.get(`${baseUrl}/${title}/${date}`);
    return request.then(response => response.data);
}

const updateBalances = (balanceObject) => {
    const request = axios.post(`${baseUrl}/balance/`, balanceObject);
    return request.then(response => response.data); 
}

const getLatestBalances = (date) => {
    const request = axios.get(`${baseUrl}/balance/info/${date}`);
    return request.then(response => response.data); 
}

const businessStatmentService = { getAll, getLatestBalances, updateBalances };
export default businessStatmentService;