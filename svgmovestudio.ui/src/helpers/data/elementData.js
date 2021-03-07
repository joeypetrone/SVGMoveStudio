import axios from 'axios';
import {baseUrl} from '../constants.json';

const getDefaultElements = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/elements/default`) 
    .then(response => resolve(response.data))
    .catch(reject)
})

const getElementByElementId = (elementId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/elements/${elementId}`)
    .then(response => resolve(response.data))
    .catch(reject)
})

const getElementsBySVGId = (svgId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/elements/bySvgId/${svgId}`)
    .then(response => resolve(response.data))
    .catch(reject)
})

export default { getDefaultElements, getElementByElementId, getElementsBySVGId };
