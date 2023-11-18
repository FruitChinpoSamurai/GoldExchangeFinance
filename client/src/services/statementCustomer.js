import axios from 'axios';
const baseUrl = '/customer_statement';

const getAllByID = id => {
    const request = axios.get(`${baseUrl}/${Number(id)}`);
    return request.then(response => response.data);
}

const updateCustomerBalances = (balanceObject, id) => {
    const request = axios.post(`${baseUrl}/balance/${id}`, balanceObject);
    return request.then(response => response.data); 
}

const customerStatmentService = { getAllByID, updateCustomerBalances };
export default customerStatmentService;