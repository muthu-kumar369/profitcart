import axios from "axios";
export const register=async(data)=>{
    try {
        const resData=await axios({
            method:"post",
            url:`${process.env.backend_domain}/user/register`,
            data
        });
        console.log(resData);
        return resData?.data;
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
}

export const profileDetails=async(token)=>{
    try {
        const res=await axios({
            method:"get",
            url:`${process.env.backend_domain}/user/profile-details`,
            headers:{
                Authorization:token
            }
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
        return error?.response?.data
    }
}