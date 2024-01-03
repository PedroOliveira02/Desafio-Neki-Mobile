import axios from 'axios';

const api = axios.create({
  baseURL: 'https://metal-drinks-remain.loca.lt',
});

export {api};