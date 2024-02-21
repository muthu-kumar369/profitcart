"use client"
import { checkToken, logoutUser } from "@/redux/actions/authActions";
import { login, logout } from "@/redux/reducers/authReducers";
import Navbar from "@/src/components/navbar/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

 
export default function Layout({ children }) {
  const {isAuthenticate,userDetails,token}=useSelector(state=>state.auth)
  const dispatch=useDispatch();
  const router=useRouter();
  const handleLogin=async()=>{
   if(!userDetails){
    const res=await dispatch(checkToken(router));
    if(Object.keys(res?.payload).length!=0){
      dispatch(login(res?.payload));
    }else{
      dispatch(logout());
    }
   }
  }

  const handleLogout=()=>{
    dispatch(logoutUser());
    dispatch(logout());
  }
  useEffect(()=>{
    handleLogin()
  },[userDetails])
  return (
    <>
      <Navbar handleLogout={handleLogout}/>
      <main>{children}</main>
    </>
  )
}