import axios from 'axios'

export const getDataAPI = async (url,token)=>{
    const res=await axios.get(`http://127.0.0.1:4000/api/v1/${url}`,{
        headers:{Authorization:token}
    })
    return res
}

export const postDataAPI = async (url,post,token)=>{
    const res=await axios.post(`http://127.0.0.1:4000/api/v1/${url}`,post,{
        headers:{Authorization:token}
    })
    return res
}

export const putDataAPI = async (url,post,token)=>{
    const res=await axios.put(`http://127.0.0.1:4000/api/v1/${url}`,post,{
        headers:{Authorization:token}
    })
    return res
}

export const deleteDataAPI = async (url,token)=>{
    const res=await axios.delete(`http://127.0.0.1:4000/api/v1/${url}`,{
        headers:{Authorization:token}
    })
    return res
}