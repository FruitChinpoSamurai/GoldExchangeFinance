import axios from 'axios';
const baseUrl = '/rates';

const getRates = () => {
    const request = axios.get(`${baseUrl}`);
    return request.then(response => response.data);
}

const updateRates = body => {
    const request = axios.patch(`${baseUrl}`, body);
    return request.then(response => response.data);
}

const rateService = { getRates, updateRates };
export default rateService;