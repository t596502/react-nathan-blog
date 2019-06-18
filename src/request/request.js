import axios from './axios'

export const login = (data)=>{
    return axios.post('/user/login',data)
};

export const articleCreate = (data)=>{
    return axios.post('/article/create',data)
};

export const articleList = (data)=>{
    return axios.get('/article/list',data)
};

export const articleDetail = (params)=>{
    return axios.get('/article/detail',{params})
};
