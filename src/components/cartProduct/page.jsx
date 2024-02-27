"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';


function CartProduct({ data, icon, api, state }) {

    const { wishlistProdcutIds } = useSelector(state => state.product);
    const router = useRouter();

    const [cartProduct, setCartProduct] = useState(data?.cart?.data[0]?.items);
    const [buylater, setBuyLlater] = useState(data?.buylater?.data[0]?.items);

    const handleRemoveCart = (item, e) => {
        e.preventDefault();
        let data = {
            id: item?._id,
            productId: item?.product?._id,
            amount: item?.product?.selling_price,
            actual_amount: item?.product?.actual_price
        }
        api.removeFromCart(data);
    }

    const handleBuyLater = (item, type, e) => {
        e.preventDefault();
        let data = {
            id: item?._id,
            type,
            amount: item?.product?.selling_price,
            actual_amount: item?.product?.actual_price
        };
        api.buyLater(data);
    }
    const handleQuantityUpdate = (item, type, e) => {
        let quantity;
        if (type == "add") {
            quantity = item?.quantity + 1;
        } else if (type == "reduce") {
            quantity = item?.quantity - 1;
        }
        e.preventDefault();
        let data = {
            productId: item?.product?._id,
            amount: item?.product?.selling_price,
            actual_amount: item?.product?.actual_price,
            quantity,
            type
        }
        api.quantityChange(data);
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

    const handleBuy = (id, e) => {
        e.preventDefault();
        router.push(`/purchase/${id}`)
    }
    return (
        <>
            <section className="search-product px-10 xl:px-32">
                <div className='cart-div border border-emerald-900 rounded mt-5 pt-3'>
                    <div className="header py-4 border border-r-0 border-l-0 border-t-0 border-emerald-700">
                        <p className="title px-10 font-bold text-lg uppercase text-emerald-900">Cart items</p>
                    </div>
                    <div>
                        {cartProduct ? cartProduct.map((item, index) => {
                            return (
                                <>
                                    {!item?.later && <Link href={`/products/${item?.product?._id}`} prefetch={true} key={index} >
                                        <div className="card lg:grid lg:grid-cols-12 my-4 mx-5">
                                            <div className="image lg:col-span-4 flex">
                                                <Image src={item?.product?.images[0]} alt='product image' width={100} height={100} />
                                                <button className={`wishlist ${wishlistProdcutIds && wishlistProdcutIds.includes(item?._id) ? "true" : "false"}`}>
                                                    {wishlistProdcutIds && wishlistProdcutIds.includes(item?.product?._id) ?
                                                        <span style={{ color: "#f6345b" }} onClick={(e) => handleRemoveWishlist(item?.product?._id, e)}>{icon?.wishlist}</span>
                                                        : <span onClick={(e) => handleAddWishlist(item?.product?._id, e)}>{icon?.like}</span>}
                                                </button>
                                            </div>
                                            <div className="card-details lg:col-span-8 p-4 `">
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
                                                <div className="footer xl:flex py-3">
                                                    <div className="count-div w-min flex items-center left-1/2 border border-emerald-900 mx-5">
                                                        <button className='px-2 border-r border-emerald-900 text-4xl' onClick={(e) => handleQuantityUpdate(item, "reduce", e)} disabled={item?.quantity <= 1 ? true : false}>-</button>
                                                        <p className='py-1 px-3 font-bold border-r border-emerald-900 text-xl'>{item?.quantity}</p>
                                                        <button className='px-2 text-2xl' onClick={(e) => handleQuantityUpdate(item, "add", e)}>+</button>
                                                    </div>
                                                    <button className="buy-now px-3 py-2 xl:mx-5 uppercase mt-5 md:w-1/2 xl:mt-0 w-full xl:w-fit mx-auto" onClick={(e) => { handleBuyLater(item, "buylater", e) }}>Buy later</button>
                                                    <button className='add-cart w-full xl:w-fit mx-auto md:mx-0 mt-5 md:w-1/2 xl:mt-0  px-3 py-2 xl:mx-5 uppercase flex items-center' onClick={(e) => { handleRemoveCart(item, e) }}>{icon?.cart} &nbsp;Remove from Cart</button>
                                                    <button className="buy-now px-3 py-2 xl:mx-5 uppercase mt-5 md:w-1/2 xl:mt-0 w-full xl:w-fit mx-auto" onClick={(e) => { handleBuy(item?.product?._id, e) }}>Buy Now</button>
                                                </div>
                                            </div>
                                        </div>

                                    </Link>}
                                </>
                            )
                        }) : <div className='no-details flex items-center justify-center min-h-56'>
                            <p className=' font-semibold capitalize text-xl py-5'>Product not available in cart.</p>
                        </div>}
                        {/* {length >= 2 && <div className="pagination flex md:p-5 py-9">
                            <button className='prev p-1' onClick={() => handlePrev()}>Previous</button>
                            {showPageStartStatus && <button className='dot-prev' onClick={() => handleDotPrev()} disabled={page <= 1}><FaAngleLeft /></button>}
                            <div className="dots flex">
                                {Array.from({ length }, (h, index) => {
                                    return (
                                        <>
                                            {index < paginationState?.showPageEnd && index + 1 >= paginationState?.showPageStart && <button key={index} className={`dot mx-2  ${index + 1 == page ? "active" : ""}`} onClick={() => handlePage(index + 1)}>{index + 1}</button>}
                                        </>
                                    )
                                })}
                            </div>
                            {showPageEndStatus && <button className="dot-next" onClick={() => handleDotNext()} disabled={page >= length - 10}><FaAngleRight /></button>}
                            <button className='next p-1' onClick={() => handleNext()}>Next</button>
                        </div>} */}
                    </div>
                </div>
                <div className='cart-div border border-emerald-900 rounded mt-5 py-3 pb-10'>
                    <div className="header py-4 border border-r-0 border-l-0 border-t-0 border-emerald-700">
                        <p className="title px-10 font-bold text-lg uppercase text-emerald-900">Buy later items</p>
                    </div>
                    <div>
                        {buylater ? buylater.map((item, index) => {
                            return (
                                <>
                                    {item?.later && <Link href={`/products/${item?.product?._id}`} prefetch={false} key={index} >
                                        <div className="card lg:grid lg:grid-cols-12 my-4 mx-5">
                                            <div className="image lg:col-span-4">
                                                <Image src={item?.product?.images[0]} alt='product image' width={100} height={100} />
                                                <button className={`wishlist ${wishlistProdcutIds && wishlistProdcutIds.includes(item?._id) ? "true" : "false"}`}>
                                                    {wishlistProdcutIds && wishlistProdcutIds.includes(item?.product?._id) ?
                                                        <span onClick={(e) => handleRemoveWishlist(item?.product?._id, e)} style={{ color: "#f6345b" }}>{icon?.wishlist}</span>
                                                        : <span onClick={(e) => handleAddWishlist(item?.product?._id, e)}>{icon?.like}</span>}
                                                </button>
                                            </div>
                                            <div className="card-details lg:col-span-8 p-4 `">
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
                                                <div className="footer xl:flex py-3">
                                                    <button className='add-cart w-full xl:w-fit mx-auto md:mx-0 mt-5 md:w-1/2 xl:mt-0  px-3 py-2 xl:mx-5 uppercase flex items-center' onClick={(e) => { handleBuyLater(item, "cart", e) }}>{icon?.cart} &nbsp;Move to Cart</button>
                                                    <button className="buy-now px-3 py-2 xl:mx-5 uppercase mt-5 md:w-1/2 xl:mt-0 w-full xl:w-fit mx-auto" onClick={(e) => { handleBuy(item?.product?._id, e) }}>Buy Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>}
                                </>
                            )
                        }) : <div className='no-details flex items-center justify-center min-h-56'>
                            <p className='font-semibold capitalize text-xl py-5'>Product not available here.</p>
                        </div>}
                    </div>
                </div>

            </section>
            <div className='w-full fixed bottom-0 p-3 py-5 border border-emerald-900 bg-white'>
                <div className='flex items-center justify-center'>
                    <p className="total mx-5 text-xl text-emerald-900 font-extrabold">Total: </p>
                    <div className="price-details text-center">
                        <p className="price text-emerald-900 text-xl font-bold">&#8377; {data?.cart?.data[0]?.totalAmount > 0 ? data?.cart?.data[0]?.totalAmount : "---   "}</p>
                        <p className=' line-through text-sm text-emerald-900 font-medium'>&#8377; {data?.cart?.data[0]?.totalActualAmount > 0 ? data?.cart?.data[0]?.totalActualAmount : "---"}</p>
                    </div>
                    <div className='mx-5'>
                        {data?.cart?.data[0]?.totalDiscount ? <p className="discount design px-3 py-1">{data?.cart?.data[0]?.totalDiscount}</p> : null}
                    </div>
                    <div className="btn-div buy-now mx-5 px-6 py-2 cursor-pointer">
                        <Link href={'cart/purchase'} className='capitalize'>Buy now</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartProduct;