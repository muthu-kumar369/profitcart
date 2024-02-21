"use client"
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function ProductCards({ data, indexPage, title, icon, pageLink, search, api, state }) {
    const { cartPrdouctIds, wishlistProdcutIds } = useSelector(state => state.product);
    const [product, setProduct] = useState(data?.product);
    useEffect(() => {
        if (indexPage == true) {
            setProduct(data?.product.slice(1, 10));
        }
    }, []);

    const handleAddCart = (item, e) => {
        e.preventDefault()
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

    return (
        <>
            {product && product.length != 0 && <div className="product-cards m-5 mx-7 " key={title}>
                <div className="title-div flex p-3">
                    <div className="flex ">
                        <p className='icon grid place-items-center pr-2'>{icon?.discount}</p>
                        <p className='title capitalize  text-xl font-bold grid place-items-center'>{title}</p>
                    </div>
                    <Link href={pageLink} prefetch={true} className='arrow'>{icon?.arrow}</Link>
                </div>
                <div className="cards-div grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 pt-5" >
                    {product && product.map((item, index) => {
                        return (
                            <>
                                {item?.images[0] && <Link prefetch={false} href={`/products/${item?._id}`} >
                                    <div className="card m-2" key={index}>
                                        <div className="image-section">
                                            <Image src={item?.images[0]} width={100} height={100} alt='Product image'></Image>
                                            <button className={`wishlist ${wishlistProdcutIds && wishlistProdcutIds.includes(item?._id) ? "true" : "false"}`}>
                                                {wishlistProdcutIds && wishlistProdcutIds.includes(item?._id) ?
                                                    <span onClick={(e) => handleRemoveWishlist(item?._id, e)}>{icon?.wishlist}</span>
                                                    : <span onClick={(e) => handleAddWishlist(item?._id, e)}>{icon?.like}</span>}
                                            </button>
                                        </div>
                                        <div className="card-details p-2">
                                            <div className="price-details flex">
                                                <div className="price px-2 mr-10">
                                                    <p className="selling_price font-bold text-lg">&#8377; {item?.selling_price}</p>
                                                    <p className="actual-price line-through text-base text-gray-600">&#8377;{item?.actual_price}</p>
                                                </div>
                                                <div className="discount">
                                                    <p className="text p-1 px-2">{item?.discount}</p>
                                                </div>
                                            </div>
                                            <p className="card-title capitalize pt-2 font-bold">{item?.title}</p>
                                            <div className="bottom-card flex justify-between p-2">
                                                <div className=' grid place-items-center'>
                                                    <p className="rating px-1">&#9733; {item?.average_rating}</p>
                                                </div>
                                                {cartPrdouctIds && cartPrdouctIds.includes(item?._id) ? <Link href={"/user/cart"} className='add-cart p-1 px-2 flex items-center'>{icon?.cart}&nbsp;Go to Cart </Link> : <button className="add-cart p-1 px-2 flex items-center " onClick={(e) => {
                                                    handleAddCart(item, e)
                                                }}>{icon?.cart}&nbsp;Add Cart</button>}
                                            </div>
                                        </div>
                                    </div>
                                </Link>}
                            </>

                        )
                    })}
                </div>
                <div className="bottom text-end py-3 px-2">
                    <Link href={pageLink} prefetch={true} className='text p-1 font-bold'>View  all</Link>
                </div>
            </div>}
        </>
    )
}

export default ProductCards