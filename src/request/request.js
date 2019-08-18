import axios from './axios'

export const login = (params)=>{
    return axios.post('/user/login',params)
};
export const register = (params)=>{
    return axios.post('/user/register',params)
};
export const articleCreate = (params)=>{
    return axios.post('/article/create',params)
};
export const articleUpdate = (params)=>{
    return axios.post('/article/update',params)
};
export const articleDelete = (params)=>{
    return axios.delete('/article/delete',{params})
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

export const articleLike = (params)=>{
    return axios.post('/favor/like',params)
};
export const articleDislike = (params)=>{
    return axios.post('/favor/dislike',params)
};
export const articleLikeStatus = (params)=>{
    return axios.get('/favor/isStatus',{params})
};
export const commentsAdd = (params)=>{
    return axios.post('/comment/add',params)
};
export const commentsList = (params)=>{
    return axios.get('/comment/list',{params})
};
export const replyCommentsAdd = (params)=>{
    return axios.post('/reply/add',params)
};
