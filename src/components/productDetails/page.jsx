"use client"
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import { FaShoppingCart } from "react-icons/fa";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import Link from 'next/link';
import { useSelector } from 'react-redux';

function ProductDetailsComponent({ data, tabs, state, description, api }) {
    const {token,isAuthtenticate}=useSelector(state=>state.auth);
    const { cartPrdouctIds,wishlistProdcutIds } = useSelector(state => state.product);
    const [buynowLink,setBuynowLink]=useState();
    const handleClick = (index) => {
        state?.setActiveTab(index);
    }
    const handleAddCart = (item, e) => {
        e.preventDefault();
        let data = {
            productId: item?._id,
            quantity: 1,
            currency: "INR",
            amount: item?.selling_price,
            actual_amount:item?.actual_price
        }
        api.addToCart(data);
    }
    const handleAddWishlist = (productId, e) => {
        e.preventDefault();
        state.setWishlistForm(true);
        state.setWishlistProductId(productId);
    }

    const handleRemoveWishlist = (productId, e) => {
        e.preventDefault();
        let data = {
            productId,
        }
        api.removeFromWishlist(data);
    }
    useEffect(()=>{
        const url= isAuthtenticate ? `/purchase/${data?._id}` : '/signin';
        setBuynowLink(url);
    },[token]);
    return (
        <section className="product-details m-5 lg:m-10">
            <div className='lg:grid  lg:grid-cols-2'>
                <div className='relative'>
                    <div className="image-slider">
                        <Swiper
                            spaceBetween={30}
                            navigation={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false
                            }}
                            pagination={{
                                clickable: true
                            }}
                            modules={[Autoplay, Pagination, Navigation]}
                            className='my-swiper'
                        >
                            {data?.images && data?.images.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <Image id='swiper-image' src={item} width={100} height={100} alt='slider image' />
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                    <div className="button-div md:flex mt-10">
                        {cartPrdouctIds && cartPrdouctIds.includes(data?._id) ? <Link href={"/user/cart"} className='add-cart p-2 px-10 md:mr-8 flex items-center uppercase w-full md:w-fit'><FaShoppingCart />&nbsp;Go to Cart</Link> 
                        : <button className='add-cart p-2 px-10 md:mr-8 flex items-center uppercase w-full md:w-fit' onClick={(e) => {
                            handleAddCart(data, e)
                        }}><FaShoppingCart />&nbsp;Add Cart</button>}

                        {buynowLink && <Link href={buynowLink} className="buy-now p-2 px-10 uppercase mt-4 md:mt-0 w-full md:w-fit ">Buy Now</Link >}
                    </div>
                    <button className={`wishlist ${wishlistProdcutIds && wishlistProdcutIds.includes(data?._id) ? "true" : "false"}`}>
                        {wishlistProdcutIds && wishlistProdcutIds.includes(data?._id) ?
                            <span onClick={(e) => handleRemoveWishlist(data?._id, e)}><IoMdHeart/></span>
                            : <span onClick={(e) => handleAddWishlist(data?._id, e)}><IoIosHeartEmpty /></span>}
                    </button>
                </div>
                <div className="details p-5 pt-2 mt-10 lg:mt-0">
                    <p className="brand my-2 uppercase">{data?.brand}</p>
                    <p className="title my-2 capitalize">{data?.title}</p>
                    <p className="rating p-1 my-4 px-4">&#9733;{data?.average_rating}</p>
                    <div className="price-details flex items-center my-2">
                        <div className='mr-9'>
                            <p className="selling-price">&#8377; {data?.selling_price}</p>
                            <p className="actual-price line-through ">&#8377; {data?.actual_price}</p>
                        </div>
                        <p className="discount p-2 px-4">{data?.discount}</p>
                    </div>
                    <p className="seller my-2">Seller: <span className="uppercase">{data?.seller}</span></p>
                    <div className="tab-div mt-10">
                        <div className="flex tabs">
                            {tabs?.tabs && tabs?.tabs.map((item, index) => {
                                return (
                                    <button className={`${state?.activeTab == index ? "active tab py-3" : "tab py-3"}`} onClick={() => handleClick(index)} key={item}>{item}</button>
                                )
                            })}
                        </div>
                        {tabs?.tabsData && tabs?.tabsData.map((items, index) => {
                            return (
                                <div className={`${index == state?.activeTab ? "active tab-data" : "hidden tab-data"}`} key={items?.value}>
                                    {items?.type == "object" && <div className='details'>
                                        {data[`${items.value}`].length == 0 ? <p className='text-center mt-10 capitalize'>No details here</p> : (
                                            data[`${items.value}`].map((item, i) => {
                                                let key = Object.keys(item)[0];
                                                let value = item[key];
                                                return (
                                                    <>
                                                        {key && value && <p className="detail grid grid-cols-12 pt-3" key={key}><span className="key col-span-5">{key}</span><span className="vlue col-span-7">:&nbsp;&nbsp;&nbsp;{value}</span></p>}
                                                    </>
                                                )
                                            })
                                        )}
                                    </div>}
                                    {items?.value == "description" && <div className='description'>
                                        {description.length == 1 && description[0] == "" ? <p className='text-center mt-10 capitalize'>No description here</p> :
                                            (description.map((item, i) => {
                                                return (
                                                    <>
                                                        {item == "" ? "" : <p className='description pt-3' key={i}>{item}.</p>}
                                                    </>

                                                )
                                            })
                                            )}
                                    </div>}
                                </div>
                            )

                        })}
                    </div>
                </div>
            </div>

        </section>
    )
}

export default ProductDetailsComponent;