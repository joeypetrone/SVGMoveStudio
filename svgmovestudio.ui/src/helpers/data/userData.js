import axios from 'axios';
import {baseUrl} from '../constants.json';

const getUserByFirebasaeUid = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/firebaseUid`)
    .then(response => resolve(response.data))
    .catch(reject)
})

export default { getUserByFirebasaeUid };
