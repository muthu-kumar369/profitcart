import axios from "axios";

export const GetOrderList=async(data)=>{
    try {
        
        const res=await axios({
            method:"get",
            url:`${process.env.backend_domain}/order/list?page=${data.page}&size=${data?.size}`,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data;
    } catch (error) {
        return error?.response?.data;
    }
}
export const CreateOrder=async(data)=>{
    try {
        
        const res=await axios({
            method:"post",
            url:`${process.env.backend_domain}/order/create`,
            data,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data;
    } catch (error) {
        return error?.response?.data;
    }
}

export const CancelOrder=async(data)=>{
    try {
        
        const res=await axios({
            method:"patch",
            url:`${process.env.backend_domain}/order/update`,
            data,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data;
    } catch (error) {
        return error?.response?.data;
    }
}
export const UpdateOrder=async(data)=>{
    try {
        
        const res=await axios({
            method:"patch",
            url:`${process.env.backend_domain}/order/update`,
            data,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data;
    } catch (error) {
        return error?.response?.data;
    }
}
export const CreateBulkOrder=async(data)=>{
    try {
        
        const res=await axios({
            method:"post",
            url:`${process.env.backend_domain}/order/create-bulk`,
            data,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data;
    } catch (error) {
        return error?.response?.data;
    }
}
export const GetOrderProduct=async(data)=>{
    try {
        
        const res=await axios({
            method:"get",
            url:`${process.env.backend_domain}/order/get-product/${data?.orderId}/${data?.productId}`,
            headers:{
                Authorization:data?.token
            }
        })
        return res?.data;
    } catch (error) {
        return error?.response?.data;
    }
}