"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';


function AllofOrder({ data }) {
  console.log("data ",data);
  const router = useRouter();
  return (
    <section className="search-product m-5 xl:mx-32">
      <div>
        {data && data.map((items) => {
          return (
            <div key={items?._id} className='block'>
              {items?.items.length != 0 && items?.items.map((item, index) => {
                return (
                  <Link href={`/user/orders/${items?._id}?item=${item?.product?._id}`} prefetch={true} key={index}>
                    <div className="card md:grid md:grid-cols-12 mt-3">
                      <div className="image md:col-span-4 w-full">
                        <Image src={item?.product?.images[0]} width={100} height={100} />
                      </div>
                      <div className="card-details md:col-span-8 p-4 `">
                        <p className="brand uppercase font-bold pt-2">{item?.product?.brand ? item?.product?.brand : "Brand"}</p>
                        <p className="title capitalize font-bold pt-2">{item?.product?.title}</p>
                        <p className="description my-3">{item?.product?.description}</p>
                        <p className="rating py-1 px-2 ">&#9733; {item?.product?.average_rating} Ratings</p>
                        <div className="price-details py-3">
                          <div className="selling-price flex">
                            <p className="price font-bold mr-4">&#8377; {item?.product?.selling_price}</p>
                            <p className="discount px-3 py-1">{item?.product?.discount}</p>
                          </div>
                          <p className="actual-price line-through">&#8377;{item?.product?.actual_price}</p>
                        </div>
                        <div className='md:flex block'>
                        <p className="delivery-data text-slate-700 md:w-1/2">Expected delivery on  {(new Date(item?.deliveryDate).toLocaleDateString(undefined,{ locale: 'en-IN'}))}</p>
                          <p className="status text-green-900 font-bold text-lg capitalize ">{item?.status}!</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )
        })}
      </div>
      {/* <div className="pagination md:flex md:p-5 py-9 w-full lg:w-fit">
                    <button className='prev p-1' onClick={() => handlePrev()}>Previous</button>
                    <div className='flex my-5'>
                        {showPageStartStatus && <button className='dot-prev block ' onClick={() => handleDotPrev()} disabled={state.page <= 1}><FaAngleLeft /></button>}
                        <div className="dots md:flex">
                            {Array.from({ length }, (h, index) => {
                                return (
                                    <>
                                        {index < paginationState?.showPageEnd && index + 1 >= paginationState?.showPageStart && <button key={index} className={`dot mx-2 mt-2 md:mt-0  ${index + 1 == state.page ? "active" : ""}`} onClick={() => handlePage(index + 1)}>{index + 1}</button>}
                                    </>
                                )
                            })}
                        </div>
                        {showPageEndStatus && <button className="dot-next" onClick={() => handleDotNext()} disabled={state.page >= length - 10}><FaAngleRight /></button>}
                    </div>
                    <button className='next p-1' onClick={() => handleNext()}>Next</button>
                </div> */}
      {data.length == 0 && <div className='empty-data min-h-96'>
        <p className='text font-bold text-xl capitalize'>no order available</p>
      </div>}
    </section>
  )
}

export default AllofOrder;