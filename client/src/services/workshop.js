import axios from 'axios';
const baseUrl = '/workshop';

const getWorkshopData = () => {
    const request = axios.get(`${baseUrl}`);
    return request.then(response => response.data);
}

const updateWorkshopRow = body => {
    const request = axios.patch(`${baseUrl}`, body);
    return request.then(response => response.data);
}

const getFinalizedTransactions = () => {
    const request = axios.get(`${baseUrl}/finalized`);
    return request.then(response => response.data);
}

const updateWorkshopSendoffs = body => {
    const request = axios.patch(`${baseUrl}/sendoff`, body);
    return request.then(response => response.data);
}

const workshopService = { getWorkshopData, updateWorkshopRow, getFinalizedTransactions, updateWorkshopSendoffs };
export default workshopService;