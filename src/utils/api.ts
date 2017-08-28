import axios from 'axios';
import { NewUser } from 'models/user.model';

const API_URL = 'http://localhost:3000/api/';

export const fetchStructures = () =>
  axios.get(API_URL + 'structures')
    .then(res => res.data)
    .catch(e => Promise.reject(e));

export const loginRequest = (user: NewUser) =>
  axios.post(API_URL + 'auth/login', user)
    .then(res => res.data)
    .catch(e => Promise.reject(e));

export const logoutRequest = () =>
  axios.get(API_URL + 'auth/logout')
    .then(res => res.data)
    .catch(e => Promise.reject(e));
