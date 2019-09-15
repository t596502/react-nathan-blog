import axios from './axios'

export const login = (params)=>{
    return axios.post('/user/login',params)
};
export const register = (params)=>{
    return axios.post('/user/register',params)
};
export const getCode = (params)=>{
    return axios.post('/user/verify',params)
};

export const articleList = (params)=>{
    return axios.get('/article/list',{params})
};
export const archiveList = (params)=>{
    return axios.get('/article/archiveList',params)
};
export const articleDetail = (params)=>{
    return axios.get('/article/detail',{params})
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
export const getAuthorInfo = ()=>{
    return axios.get('/private/getInfo')
};


// 后台
export const articleCreate = (params)=>{
    return axios.post('/article/create',params)
};
export const articleUpdate = (params)=>{
    return axios.post('/article/update',params)
};
export const articleDelete = (params)=>{
    return axios.delete('/article/delete',{params})
};
export const categoryList = (params)=>{
    return axios.get('/category/getList',{params})
};
export const tagList = (params)=>{
    return axios.get('/tags/getList',{params})
};

export const upload = (params)=>{
    return axios.post('/private/sumbit',params)
};
export const userList = (params)=>{
    return axios.post('/user/list',params)
};
