import axios from "axios";

export const RetrievePricingDetails=async(data)=>{
    try {
        const res=await axios({
            method:'post',
            url:`${process.env.backend_domain}/stripe/get-pricing`,
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

export const GetSession=async(data)=>{
    try {
        const res=await axios({
            method:"post",
            url:`${process.env.backend_domain}/stripe/get-session`,
            data,
            headers:{
                Authorization:data?.token
            }
        })
        return res.data;
    } catch (error) {
        return error?.response?.data;
    }
}