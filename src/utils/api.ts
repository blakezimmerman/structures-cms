import axios from 'axios';
const API_URL = 'http://localhost:3000/api/';

export const fetchStructures = () =>
  axios.get(API_URL + 'structures')
    .then(res => res.data)
    .catch(e => Promise.reject(e));
