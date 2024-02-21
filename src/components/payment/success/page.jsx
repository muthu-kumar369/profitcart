"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { TiTick } from "react-icons/ti";


function PaymentSucess({ state }) {
    const [count, setCount] = useState(5);
    const router = useRouter();

    const handleRedirect = () => {
        if (count == 0) {
            state.redirect ? router.push("/") : null;
        }

    }
    useEffect(() => {
        handleRedirect();
        const interval = setInterval(() => {
            if (count > 0) {
                setCount(prev => prev - 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [count, state.redirect])
    return (
        <section className="payment-success flex items-center justify-center" style={{ height: '100vh' }}>
            <div className='border border-emerald-900 p-5 text-center rounded-md bg-gray-50'>
                <div className=' w-fit mx-auto'>
                    <p className="icon w-20 h-20 bg-emerald-800 rounded-full grid place-items-center"><TiTick color='white' size={60} /></p>
                </div>
                <p className="text font-bold text-xl text-emerald-900 capitalize my-9">Order complted successfully!</p>
                <div className="redirect capitalize text-sm font-semibold text-emerald-900">
                    <p>you will be redirect in {count > 0 ? count : 0}s  </p>
                    <p>or</p>
                    <Link prefetch={false} href={"/"} className=' underline'>click here</Link>
                </div>
            </div>
        </section>
    )
}

export default PaymentSucess