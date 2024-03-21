import axios from 'axios';
const baseUrl = '/management';

const getAllManagementData = () => {
    const request = axios.get(`${baseUrl}`);
    return request.then(response => response.data);
}

const managementService = { getAllManagementData };
export default managementService;