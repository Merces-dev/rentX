import axios from "axios";

const api = axios.create({
    baseURL: 'http://[seu_ip]:3000',
});

export { api };