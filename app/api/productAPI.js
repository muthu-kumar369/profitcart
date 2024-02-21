import axios from "axios";

export const getIndexData=async()=>{
    try {
        const res=await axios({
            method:"get",
            url:`${process.env.backend_domain}/products/index`
        })
        return res?.data;
    } catch (error) {
        console.log(error);
        return error?.response?.data
    }
}

export const getProducts=async(data)=>{
    try {
        const res=await axios({
            method:"get",
            url:`${process.env.backend_domain}/products/list?search=${data?.search}&page=${data?.page}&size=${data?.size}`
        })
        return res?.data;
    } catch (error) {
        console.log(error);
        return error?.response?.data
    }
}

export const productDetails=async(id)=>{
    try {
        const res=await axios({
            method:"get",
            url:`${process.env.backend_domain}/products/details/${id}`
        })
        return res?.data;
    } catch (error) {
        return error?.response?.data
    }
}

