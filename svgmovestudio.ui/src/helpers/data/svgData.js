import axios from 'axios';
import { baseUrl } from '../constants.json';

const getUserSVGs = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/SVGs/user/${userId}`)
    .then(response => resolve(response.data))
    .catch(reject)
})

export default { getUserSVGs };
