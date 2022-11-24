import axios from 'axios'

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});


export default instance //if default import then we can call anything import "anyname" from './axios' in any file