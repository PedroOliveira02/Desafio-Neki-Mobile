import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tangy-regions-flash.loca.lt',
  // timeout: 10000,
});

export {api};