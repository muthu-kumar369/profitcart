"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';


function SearchProductCard({ data, icon, state, paginationState, api }) {

    const { cartPrdouctIds, wishlistProdcutIds } = useSelector(state => state.product);
    const { token, isAuthtenticate } = useSelector(state => state.auth);
    const router=useRouter();

    const [product, setProduct] = useState(data?.product);
    const [length, setLength] = useState(data?.totalPage);
    const [showPageStartStatus, setShowPageStartStatus] = useState(length > 10 ? true : false);
    const [showPageEndStatus, setShowPageEndStatus] = useState(length > 10 ? true : false);
    const [buynowLink, setBuynowLink] = useState();

    const handlePage = (index) => {
        state.setPage(index)
    }
    const handlePrev = () => {
        if (state.page <= length && state.page > 1) {
            state.setPage(state.page - 1)
            paginationState?.setShowPageStart((prev) => prev - 1);
        }
    }
    const handleNext = () => {
        if (state.page >= 1 && state.page < length) {
            state.setPage(state.page + 1);
            paginationState?.setShowPageEnd((prev) => prev + 1)
        }
    }
    const handleDotPrev = () => {
        let value = state.page - 9;
        if (1 < value) {
            paginationState?.setShowPageStart(value);
            paginationState?.setShowPageEnd(state.page);
        } else {
            paginationState?.setShowPageStart(1);
            paginationState?.setShowPageEnd(10);
        }

    }
    const handleDotNext = () => {
        let value = state.page + 9;
        if (length > value) {
            paginationState?.setShowPageStart(state.page);
            paginationState?.setShowPageEnd(value)
        } else {
            paginationState?.setShowPageStart(length - 9);
            paginationState?.setShowPageEnd(length);
        }
    }

    const handleAddCart = (item, e) => {
        e.preventDefault();
        let data = {
            productId: item?._id,
            quantity: 1,
            currency: "INR",
            amount: item?.selling_price,
            actual_amount: item?.actual_price
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
    const handleBuy=(id,e)=>{
        e.preventDefault();
        const url = isAuthtenticate ? `/purchase/${id}` : '/signin';
        router.push(url);
    }
    return (
        <section className="search-product flex m-5">
            <div className='filter  lg:px-32'>

            </div>
            <div>
                {product.length != 0 && product.map((item, index) => {
                    return (
                        <Link href={`/products/${item?._id}`} prefetch={true} key={index} >
                            <div className="card md:grid md:grid-cols-12 mt-3">
                                <div className="image md:col-span-4 w-full">
                                    <Image src={item?.images[0]} width={100} height={100} />
                                    <button className={`wishlist ${wishlistProdcutIds && wishlistProdcutIds.includes(item?._id) ? "true" : "false"}`}>
                                        {wishlistProdcutIds && wishlistProdcutIds.includes(item?._id) ?
                                            <span onClick={(e) => handleRemoveWishlist(item?._id, e)}>{icon?.wishlist}</span>
                                            : <span onClick={(e) => handleAddWishlist(item?._id, e)}>{icon?.like}</span>}
                                    </button>
                                </div>
                                <div className="card-details md:col-span-8 p-4 `">
                                    <p className="brand uppercase font-bold pt-2">{item?.brand ? item?.brand : "Brand"}</p>
                                    <p className="title capitalize font-bold pt-2">{item?.title}</p>
                                    <p className="description my-3">{item?.description}</p>
                                    <p className="rating py-1 px-2 ">&#9733; {item?.average_rating} Ratings</p>
                                    <div className="price-details py-3">
                                        <div className="selling-price flex">
                                            <p className="price font-bold mr-4">&#8377; {item?.selling_price}</p>
                                            <p className="discount px-3 py-1">{item?.discount}</p>
                                        </div>
                                        <p className="actual-price line-through">&#8377;{item?.actual_price}</p>
                                    </div>
                                    <div className="footer flex py-3">
                                        {cartPrdouctIds && cartPrdouctIds.includes(item?._id) ? <Link href={"/user/cart"} className='add-cart px-3 py-2 mr-10 uppercase flex items-center'>{icon?.cart} &nbsp;Go to Cart</Link> : <button className='add-cart px-3 py-2 mr-10 uppercase flex items-center ' onClick={(e) => {
                                            handleAddCart(item, e)
                                        }}>{icon?.cart} &nbsp;Add Cart</button>}

                                        <button onClick={(e)=>handleBuy(item?._id,e)} className="buy-now px-3 py-2 uppercase">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
                <div className="pagination md:flex md:p-5 py-9 w-full lg:w-fit">
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
                </div>
                {product.length == 0 && <div className='empty-data'>
                    <p className='text font-bold text-xl capitalize'>no product available</p>
                </div>}
            </div>
        </section>
    )
}

export default SearchProductCard