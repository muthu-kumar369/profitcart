import axios from "axios"

export const getAllAddress=async(data)=>{
    try {
        const res=await axios({
            method:"get",
            url:`${process.env.backend_domain}/address/list?page=${data?.page}&size=${data?.size}`,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data
    } catch (error) {
       return error?.response?.data; 
    }
}

export const createAddress=async(data)=>{
    try {
        const res=await axios({
            method:"post",
            url:`${process.env.backend_domain}/address/create`,
            data,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data
    } catch (error) {
       return error?.response?.data; 
    }
}

export const updateAddress=async(data)=>{
    try {
        const res=await axios({
            method:"patch",
            url:`${process.env.backend_domain}/address/update`,
            data,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data
    } catch (error) {
       return error?.response?.data; 
    }
}

export const removeAddress=async(data)=>{
    try {
        const res=await axios({
            method:"delete",
            url:`${process.env.backend_domain}/address/remove/${data?.id}`,
            data,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data
    } catch (error) {
       return error?.response?.data; 
    }
}

export const updateDefaultAddress=async(data)=>{
    try {
        const res=await axios({
            method:"patch",
            url:`${process.env.backend_domain}/address/update-default/${data?.id}`,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data
    } catch (error) {
        return error?.response?.data;
    }
}