import axios from 'axios';

export const apiURL = 'http://0.0.0.0:8001'

export const apiServer = axios.create({
    baseURL: `${apiURL}/api`,
})
