import axios from 'axios';
import { baseUrl } from '../constants.json';

const getUserSVGs = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/SVGs/user/${userId}`)
    .then(response => resolve(response.data))
    .catch(reject)
})

// Creates a new SVG for the signed-in user and resolves with it (including its new svgId).
const createSvg = (svgName, elements) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/SVGs`, { svgName, isAnimation: false, elements })
    .then(response => resolve(response.data))
    .catch(reject)
})

// Replaces the saved elements of one of the signed-in user's SVGs.
const saveSvgElements = (svgId, elements) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/SVGs/${svgId}/elements`, elements)
    .then(() => resolve())
    .catch(reject)
})

export default { getUserSVGs, createSvg, saveSvgElements };
