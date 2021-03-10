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

const postElements = (arrayOfNewElements) =>  axios.post(`${baseUrl}/elements`, arrayOfNewElements);

const putElements = (arrayOfUpdatedElements) => axios.put(`${baseUrl}/elements`, arrayOfUpdatedElements);

export default { 
  getDefaultElements, 
  getElementByElementId, 
  getElementsBySVGId,
  postElements,
  putElements 
};
