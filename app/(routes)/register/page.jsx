"use client"
import RegisterForm from '@/src/components/registerForm/registerForm';
import React from 'react'
import { useDispatch } from 'react-redux';
import { register } from '../../api/userAPI';
import { useRouter } from 'next/navigation';

function Register() {
  const router=useRouter();
  const handleRegister=async(data)=>{
    const res=await register(data);
    if(res?.status==process.env.success){
      router.push("/signin");
    }else if(res?.status==process.env.error){
      console.log(res);
    }
    console.log(res);
  }
  return (
    <>
    <RegisterForm handleRegister={handleRegister}/>
    </>
  )
}

export default Register;