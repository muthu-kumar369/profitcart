"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';


function OrderDetails({ data }) {
  console.log("data ", data);
  const router = useRouter();

  return (
    <section className="search-product m-5 xl:mx-32">
      <div>
        <div className='block'>
          {data.length != 0 && data.map((item, index) => {
            return (
              <Link href={`/products/${item?.product?._id}`} prefetch={true} key={item?._id}>
                <div className="card md:grid md:grid-cols-12 mt-3">
                  <div className=" md:col-span-4 w-full">
                    <Image src={item?.product?.images[0]} width={100} height={100} className='mx-auto mt-2'/>
                  </div>
                  <div className="card-details md:col-span-8 p-4 `">
                    <p className="brand uppercase font-bold pt-2">{item?.product?.brand ? item?.product?.brand : "Brand"}</p>
                    <p className="title capitalize font-bold pt-2">{item?.product?.title}</p>
                    <div className="quantity mt-2">
                    <p className="text text-slate-700"><span className='capitalize'>quantity :</span><strong className='mx-2'>{item?.quantity}</strong></p>
                  </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default OrderDetails;