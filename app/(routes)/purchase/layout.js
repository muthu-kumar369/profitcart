"use client"
import { logoutUser } from "@/redux/actions/authActions";
import { logout } from "@/redux/reducers/authReducers";
import Navbar from "@/src/components/navbar/page";
import { useEffect } from "react"
import { useDispatch } from "react-redux";

 
export default function Layout({ children }) {
  const dispatch=useDispatch();

  const handleLogout=()=>{
    dispatch(logoutUser());
    dispatch(logout());
  }
  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <main>{children}</main>
    </>
  )
}