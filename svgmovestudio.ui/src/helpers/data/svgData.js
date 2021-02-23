import axios from 'axios';
import { baseUrl } from '../constants.json';

const getUserSVGs = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user/${userId}`)
    .then(response => resolve(response.data))
    .catch(reject)
})

export default { getUserSVGs };
