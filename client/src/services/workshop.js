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

const workshopService = { getWorkshopData, updateWorkshopRow };
export default workshopService;