import axios from "axios";

export const getWishlist=async(data)=>{
    try {
        const res=await axios({
            method:"get",
            url:`${process.env.backend_domain}/wishlist/list?page=${data?.page}&size=${data?.size}`,
            data,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data;
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
}
export const createFolder=async(data)=>{
    try {
        const res=await axios({
            method:"post",
            url:`${process.env.backend_domain}/wishlist/create`,
            data,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data;
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
}
export const updateFolder=async(data)=>{
    try {
        const res=await axios({
            method:"patch",
            url:`${process.env.backend_domain}/wishlist/update`,
            data,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data;
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
}
export const removeFolder=async(data)=>{
    try {
        const res=await axios({
            method:"delete",
            url:`${process.env.backend_domain}/wishlist/remove-folder`,
            data,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data;
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
}
export const addWishlist=async(data)=>{
    try {
        const res=await axios({
            method:"post",
            url:`${process.env.backend_domain}/wishlist/add`,
            data,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data;
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
}
export const removewishlist=async(data)=>{
    try {
        const res=await axios({
            method:"delete",
            url:`${process.env.backend_domain}/wishlist/remove`,
            data,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data;
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
}

