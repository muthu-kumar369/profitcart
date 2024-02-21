import axios from "axios";

export const getCartDetails = async (data)=>{
    try {
        const res = await axios({
            method: "get",
            url: `${process.env.backend_domain}/cart/list?page=${data?.page}&size=${data?.size}`,
            headers: {
                Authorization: data?.token
            }
        });
        return res?.data
    } catch (error) {
        console.log(error);
        return error?.response?.data
    }
}

export const addCart=async(data)=>{
    try {
        const res=await axios({
            method:"post",
            url:`${process.env.backend_domain}/cart/add-cart`,
            data,
            headers:{
                Authorization:data?.token
            }
        });

        return res?.data;
    } catch (error) {
        return error?.response?.data
    }
}

export const removeCart=async(data)=>{
    try {
        const res=await axios({
            method:"delete",
            url:`${process.env.backend_domain}/cart/remove`,
            data,
            headers:{
                Authorization:data?.token
            }
        });

        return res?.data;
    } catch (error) {
        return error?.response?.data
    }
}

export const updateLater=async(data)=>{
    try {
        const res=await axios({
            method:"patch",
            url:`${process.env.backend_domain}/cart/update-buy-later`,
            data,
            headers:{
                Authorization:data?.token
            }
        });

        return res?.data;
    } catch (error) {
        return error?.response?.data
    }
}

export const quantityUpdate=async(data)=>{
    try {
        const res=await axios({
            method:"patch",
            url:`${process.env.backend_domain}/cart/update-quantity`,
            data,
            headers:{
                Authorization:data?.token
            }
        });

        return res?.data;
    } catch (error) {
        return error?.response?.data
    }
}

export const RemoveOrderedFromCart=async(data)=>{
    try {
        const res=await axios({
            method:"delete",
            url:`${process.env.backend_domain}/cart/remove-products`,
            data,
            headers:{
                Authorization:data?.token
            }
        });

        return res?.data;
    } catch (error) {
        return error?.response?.data
    }
}