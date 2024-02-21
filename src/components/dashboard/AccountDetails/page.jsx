import Link from 'next/link'
import React from 'react'

function AccountDetails({ data }) {
    return (
        <section className="account-details lg:flex">
            <div className='w-full lg:w-1/2 border  border-emerald-900 my-6 bg-gray-50 rounded-sm lg:mr-3'>
                <div className="header py-4 border border-t-0 border-r-0 border-l-0 border-emerald-600">
                    <p className="title font-bold text-emerald-900 text-xl uppercase text-center">Account Details</p>
                </div>
                <div className="details py-3 px-4">
                    <div className="detail grid grid-cols-12 text-zinc-700 text-lg font-semibold py-3">
                        <p className="name col-span-5">Name</p>      
                        <p className="account-value col-span-7"> <span className='mr-3'>:</span> <span className='w-full overflow-x-scroll'>{data?.user?.name}</span></p>
                    </div>
                    <div className="detail grid grid-cols-12 text-zinc-700 text-lg font-semibold py-3">
                        <p className="name col-span-5">Email</p>
                        <p className="account-value col-span-7"> <span className='mr-3'>:</span> {data?.user?.email}</p>
                    </div>
                    <div className="detail grid grid-cols-12 text-zinc-700 text-lg font-semibold py-3">
                        <p className="name col-span-5">Ordered Count</p>
                        <p className="account-value col-span-7"> <span className='mr-3'>:</span> {data?.user?.currentOrder}</p>
                    </div>
                </div>
            </div>
            <div className="quick-links w-full lg:w-1/2 border border-emerald-900 my-6 bg-gray-50 rounded-sm lg:mr-3">
                <div className="header py-4 border border-t-0 border-r-0 border-l-0 border-emerald-600 ">
                    <p className="title font-bold text-emerald-900 text-xl uppercase text-center">Quick links</p>
                </div>
                <div className="links  grid md:grid-cols-2 mb-5 md:pb-0">
                    {data?.pages && data?.pages.map((item,index)=>{
                        return (
                            <Link href={`${item?.link}`}  key={index} className='quick-link mx-5 mt-4 bg-gray-500 hover:bg-gray-400 rounded-sm'>
                            <p className='flex items-center px-5 py-3  text-white capitalize text-lg'> <span className='mr-4'>{item?.icon}</span> <span>{item?.text}</span> </p>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default AccountDetails