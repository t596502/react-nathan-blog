import axios from './axios'
export const login = (data)=>{
    return axios.post('/user/login',data)
};
