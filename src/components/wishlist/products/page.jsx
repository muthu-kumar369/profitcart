"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';


function WishlistProducts({ data, icon, api }) {

  const { cartPrdouctIds, wishlistProdcutIds } = useSelector(state => state.product);
  const router=useRouter();

  const [product, setProduct] = useState(data[0]?.products);

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
    let data = {
      productId,
      id
    };
    api.addToWishlist(data)
  }

  const handleRemoveWishlist=(productId,id,e)=>{
    e.preventDefault();
    let data={
      productId,
      id
    }
    api.removeFromWishlist(data);
  }
  const handleBuy=(id,e)=>{
    e.preventDefault();
    router.push(`/purchase/${id}`);
  }
  return (
    <section className="search-product flex mx-4 md:mx-24 mt-5">
      <div className='w-full'>
        {product.length != 0 && product.map((item, index) => {
          return (
            <Link href={`/products/${item?._id}`} prefetch={true} key={index} >
              <div className="card grid md:grid-cols-12 mt-3">
                <div className="image md:col-span-4">
                  <Image src={item?.images[0]} width={100} height={100} />
                  <button className={`wishlist ${wishlistProdcutIds.includes(item?._id) ? "true" : "false"}`}>
                    {wishlistProdcutIds.includes(item?._id) ?
                      <span onClick={(e) => handleRemoveWishlist(item?._id, data[0]?._id,e)}>{icon?.wishlist}</span>
                      : <span onClick={(e) => handleAddWishlist(item?._id, data[0]?._id,e)}>{icon?.like}</span>}
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

                    <button className="buy-now px-3 py-2 uppercase" onClick={(e)=>{handleBuy(item?._id,e)}}>Buy Now</button>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
        {product.length == 0 && <div className='empty-data'>
            <p className='text font-bold text-xl capitalize'>no product available</p>
        </div> }
      </div>
    </section>
  )
}

export default WishlistProducts;