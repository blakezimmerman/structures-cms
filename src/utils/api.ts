const API_URL = 'http://localhost:3000/api/';

export const fetchStructures = () =>
  fetch(API_URL + 'structures')
    .then(res => res.json());
