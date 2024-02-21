"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md";


function PaymnentFailed() {
    const [count,setCount]=useState(5);
    const router=useRouter();

    const handleRedirect=()=>{
      if(count==0){
          router.push("/")
      }
      
  }
  useEffect(()=>{
      handleRedirect();   
      const interval=setInterval(() => {
          setCount(prev=>prev-1);
      },1000);
      return ()=>clearInterval(interval);     
  },[count])
    return (
        <section className="payment-success flex items-center justify-center" style={{ height: '100vh' }}>
            <div className='border border-emerald-900 p-5 text-center rounded-md bg-gray-50 w-1/4'>
                <div className=' w-fit mx-auto'>
                    <p className="icon w-20 h-20 bg-red-700 rounded-full grid place-items-center"><MdClose color='white' size={60} /></p>
                </div>
                <p className="text font-bold text-xl text-red-700 capitalize my-9">Order failed!</p>
                <p className="redirect capitalize text-sm font-semibold text-emerald-900">you will be redirect in {count>0 ? count : 0}s</p>
            </div>
        </section>
    )
}

export default PaymnentFailed;