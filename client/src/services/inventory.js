import axios from 'axios';
const baseUrl = '/inventory';

const getAllInventoryData = () => {
    const request = axios.get(`${baseUrl}/all`);
    return request.then(response => response.data);
}

const getGoldBalance = () => {
    const request = axios.get(`${baseUrl}/balance`);
    return request.then(response => response.data);
}

const getWeightPriceMeta = () => {
    const request = axios.get(`/meta`);
    return request.then(response => response.data);
}

const updateWeightPriceMeta = weightAndPrice => {
    const request = axios.patch(`/meta`, weightAndPrice);
    return request.then(response => response.data);
}

const inventoryService = { getAllInventoryData, getGoldBalance, getWeightPriceMeta, updateWeightPriceMeta };
export default inventoryService;