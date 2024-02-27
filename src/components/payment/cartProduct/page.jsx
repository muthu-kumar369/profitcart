"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function CartPayment({ data, address, state, api, overAllData }) {
  const [deliveryCharge, setDeliveryCharge] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [savingAmount, setSavingAmount] = useState();

  const calculateDeliveryCharge = () => {
    let sellingAmount = overAllData?.totalAmount;
    let amount = sellingAmount >= 500 ? 0 : 40;
    setDeliveryCharge(parseInt(amount));
    setTotalAmount(parseInt(sellingAmount) + amount);

    let actualAmount = overAllData?.totalActualAmount;
    setSavingAmount(parseInt(actualAmount) - totalAmount);
  }

  const handleSession = () => {
    api.handleSession();
  }

  useEffect(() => {
    calculateDeliveryCharge();
    if (totalAmount && toString(deliveryCharge)) {
      api.handlePricing(deliveryCharge);
    }
  }, [totalAmount,deliveryCharge]);
  return (
    <>
      <section className="search-product m-5 lg:mx-28">
        <div className='w-full border border-emerald-900 rounded-sm' >
          <div className="header py-4 border border-r-0 border-l-0 border-t-0 border-emerald-700">
            <p className="title px-10 font-bold text-lg uppercase text-emerald-900">Product</p>
          </div>
          {data && data.map((item, index) => {
            return (
              <Link href={`/products/${item?.product?._id}`} prefetch={true} >
                <div className="card md:grid md:grid-cols-12 my-3 lg:mx-10">
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
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="address my-4 border border-emerald-900 rounded-sm bg-gray-50">
          <div className="header py-4 border border-r-0 border-l-0 border-t-0 border-emerald-700">
            <p className="title px-10 font-bold text-lg uppercase text-emerald-900 ">Address </p>
          </div>
          {address ? (
            <>
              <div className="address-details px-10 py-2 m-10 border border-gray-300">
                <div className="details  my-1">
                  <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span>{address?.name} ,</span></p>
                </div>
                <div className="details  my-1">
                  <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span>{address?.firstLine} ,</span></p>
                </div>
                {address?.secondLine && <div className="details  my-1">
                  <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span>{address?.secondLine} ,</span></p>
                </div>}
                <div className="details  my-1">
                  <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span>{address?.city} ,</span></p>
                </div>
                <div className="details  my-1">
                  <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span>{address?.state} ,</span></p>
                </div>
                <div className="details  my-1">
                  <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span>{address?.country} ,</span></p>
                </div>

                <div className="details  my-1">
                  <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span className="mr-2">{address?.phoneCode}</span><span>{address?.phone} .</span></p>
                </div>
              </div>
              <div className="change-adress mx-10 mb-5">
                <button className='p-2 bg-emerald-900 text-white rounded-sm' onClick={() => state.setAddressForm(true)}>Change Address</button>
              </div>
            </>
          ) : <>
            <div className='no-details grid items-center min-h-56'>
              <div>
                <div className='flex items-center justify-center'>
                  <p className='font-semibold capitalize text-xl py-5'>Please add address</p>
                </div>
                <div className="change-adress mx-10 mb-5 flex items-center justify-center">
                  <Link href={"/user/address"} className='p-2 bg-emerald-900 text-white rounded-sm'>Add Address</Link>
                </div>
              </div>
            </div>

          </>}
        </div>
        <div className="payment-type my-4 border border-emerald-900 rounded-sm bg-gray-5">
          <div className="header py-4 border border-r-0 border-l-0 border-t-0 border-emerald-700">
            <p className="title px-10 font-bold text-lg uppercase text-emerald-900 ">Payment type </p>
          </div>
          <div className="details md:flex justify-evenly">
            <div className={`flex items-center m-3 p-3 px-6 border bg-gray-200 rounded-md cursor-pointer ${state.paymentType == "card" ? "bg-gray-400" : "hover:bg-gray-300 "}`} onClick={() => state.setPaymentType("card")}>
              <div className={`dot w-3 h-3 border border-emerald-900 rounded-full ${state.paymentType == "card" ? "bg-white" : ""}`}></div>
              <p className="value ps-3">Card</p>
            </div>
            <div className={`flex items-center m-3 p-3 px-6 bg-gray-200 rounded-md cursor-pointer  ${state.paymentType == "cashondelivery" ? "bg-gray-400" : "hover:bg-gray-300"}`} onClick={() => state.setPaymentType("cashondelivery")}>
              <div className={`dot w-3 h-3 border border-emerald-900 rounded-full  ${state.paymentType == "cashondelivery" ? "bg-white" : ""}`}></div>
              <p className="value px-3">Cash on delivery</p>
            </div>
          </div>
        </div>
        <div className="price-details my-4   border border-emerald-900 rounded-sm bg-gray-50" id='price-details'>
          <div className="header py-4 border border-r-0 border-l-0 border-t-0 border-emerald-700">
            <p className="title px-10 font-bold text-lg text-emerald-900 uppercase">Price details </p>
          </div>
          <div className="details lg:grid lg:grid-cols-12 px-6 my-4">
            <p className="title lg:col-span-5 flex font-bold text-emerald-900"><span>Payment Price</span> <span className='flex lg:hidden ml-5'>:</span> </p>
            <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span className='lg:flex hidden mr-5'>:</span><span>
              &#8377; {totalAmount }</span></p>
          </div>
          <div className="details lg:grid lg:grid-cols-12 px-6 my-4">
            <p className="title lg:col-span-5 flex font-bold text-emerald-900"><span>Actual Price</span> <span className='flex lg:hidden ml-5'>:</span> </p>
            <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span className='lg:flex hidden mr-5'>:</span><span>&#8377; {overAllData?.totalActualAmount}</span></p>
          </div>
          <div className="details lg:grid lg:grid-cols-12 px-6 my-4">
            <p className="title lg:col-span-5 flex font-bold text-emerald-900"><span>Delivery Charge</span> <span className='flex lg:hidden ml-5'>:</span> </p>
            {deliveryCharge == 0 ? <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span className='lg:flex hidden mr-5'>:</span><span><del>&#8377; 40</del>  &#8377; {deliveryCharge}</span></p> :
              <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span className='lg:flex hidden mr-5'>:</span><span>&#8377; {deliveryCharge}</span></p>}
          </div>
          <div className="details lg:grid lg:grid-cols-12 px-6 my-4">
            <p className="title lg:col-span-5 flex font-bold text-emerald-900"><span>Total Amount</span> <span className='flex lg:hidden ml-5'>:</span> </p>
            <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span className='lg:flex hidden mr-5'>:</span><span>&#8377; {totalAmount}</span></p>
          </div>
        </div>
        <p className=" mb-28 saving-amnount uppercase text-sm font-bold text-emerald-900">* Your savings upto &#8377; {savingAmount}</p>
      </section>

      <div className='w-full fixed bottom-0 p-3  border border-lime-800 bg-white'>
        <div className='flex items-center justify-center'>
          <div className='mx-5'>
            <div className='flex'>
              <p className="total mr-5 text-xl text-lime-800 font-extrabold">Total: </p>
              <div className="price-details text-center">
                <p className="price text-lime-800 text-xl font-bold">&#8377; {totalAmount}</p>
                <p className=' line-through text-sm text-lime-800 font-medium'>&#8377; {overAllData?.totalActualAmount}</p>
              </div>
              <div className='mx-5'>
                <p className="discount design px-3 py-1">{overAllData?.totalDiscount}</p>
              </div>
            </div>
            <div>
              <Link prefetch={false} href={`${data?._id}/#price-details`} style={{ scrollBehavior: "smooth" }} className=' text-blue-700'>See price details</Link>
            </div>
          </div>
          <div className="btn-div buy-now mx-5">
            <button className='px-6 py-2' onClick={() => { handleSession() }}>Buy now</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default CartPayment;
