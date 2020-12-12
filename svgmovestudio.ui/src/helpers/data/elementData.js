import axios from 'axios';
import {baseUrl} from '../constants.json';

const getDefaultElements = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/elements/default`) 
    .then(response => resolve(response.data))
    .catch(reject)
})

export default { getDefaultElements };
