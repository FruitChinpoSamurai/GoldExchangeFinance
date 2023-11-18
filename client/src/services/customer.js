import axios from 'axios';
const baseUrl = '/customers';

const getAllCustomers = () => {
    const request  = axios.get(baseUrl);
    return request.then(response => response.data);
}

const getCustomerAccounts = id => {
    const request  = axios.get(`${baseUrl}/${id}/accounts`);
    return request.then(response => response.data);
}

const updateCustomer = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

const createCustomer = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

// const deleteUser = id => {
//     return axios.delete(`${baseUrl}/${id}`);
// };

const customerService = { getAllCustomers, getCustomerAccounts, updateCustomer, createCustomer };
export default customerService;