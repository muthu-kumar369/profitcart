"use client"
import { loginUser } from '@/redux/actions/authActions';
import { login } from '@/redux/reducers/authReducers';
import SingInForm from '@/src/components/signInForm/singInForm';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

function SignIn() {
    const dispatch=useDispatch();
    const router=useRouter();

    const handleLogin=async(data)=>{
        console.log("Login data",data);
        data.router=router;
        const res=await dispatch(loginUser(data));
        console.log(res);
        if(res.payload?.status==process.env.success){
          dispatch(login(res.payload?.data))
        }else if(res.payload?.status==process.env.error){
          console.log(res.payload);
        }
    }
  return (
    <>
    <SingInForm handleLogin={handleLogin}/>
    </>
  )
}

export default SignIn;