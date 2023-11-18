import axios from 'axios';
const baseUrl = '/users';

const loginUser = newObject => {
    console.log(newObject);
    const request = axios.post(`${baseUrl}/login`, newObject);
    return request.then(response => response.data);
};

// FOR REFERENCE PURPOSES.
// const createUser = newObject => {
//     const request = axios.post(baseUrl, newObject);
//     return request.then(response => response.data);
// };

// const deleteUser = id => {
//     return axios.delete(`${baseUrl}/${id}`);
// };

// const updateUser = (id, newObject) => {
//     const request = axios.put(`${baseUrl}/${id}`, newObject);
//     return request.then(response => response.data);
// }

const userService = { loginUser };
export default userService;