import axios from './axios'

export const login = (data)=>{
    return axios.post('/user/login',data)
};
export const register = (data)=>{
    return axios.post('/user/register',data)
};
export const articleCreate = (data)=>{
    return axios.post('/article/create',data)
};

export const articleList = (params)=>{
    return axios.get('/article/list',{params})
};

export const articleDetail = (params)=>{
    return axios.get('/article/detail',{params})
};

export const categoryList = (params)=>{
    return axios.get('/category/getList',{params})
};

