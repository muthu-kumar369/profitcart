"use client"
import { addCart, getCartDetails } from '@/app/api/cartAPI';
import { checkToken } from '@/redux/actions/authActions';
import { cartPrdouctIdsAction, wishlistAction, wishlistProdcutIdsAction } from '@/redux/reducers/productReducers';
import WishlistProducts from '@/src/components/wishlist/products/page';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { addWishlist, getWishlist, removewishlist } from '@/app/api/wishlistAPI';

function ProductList({params}) {

  const {id}=params;
  const dispatch=useDispatch();
  const router=useRouter();
  const {wishlistProducts}=useSelector(state=>state.product);
  const {token}=useSelector(state=>state.auth);
  const [wishlistData,setWishlistData]=useState();

  const icons = {
    like: <IoIosHeartEmpty />,
    wishlist: <IoMdHeart />,
    cart: <FaShoppingCart />
  }

  const handleData=async()=>{
    if(wishlistProducts){
      let data=wishlistProducts.filter(data=>data._id==id);
      setWishlistData(data);
    }else{
      if(token){
        let data={
          token,
          page:1,
          size:0
        }
        const res=await getWishlist(data);
        let getData=res?.data?.data.filter(data=>data._id==id);
        setWishlistData(getData);
        dispatch(wishlistAction(res?.data?.data));
        dispatch(wishlistProdcutIdsAction(res?.data?.productIds))
      }else{
        let tokendata={
          redirect:false,
          router
        }
        dispatch(checkToken(tokendata));
      }
    }
  }
  const addToCart=async(data)=>{
    data.token=token;
    const res=await addCart(data);

    console.log(res);
    if(res?.status==process.env.success){
      handleData();
    }
  }
  const handleCartData = async () => {
    let data = {
      token,
      page: 1,
      size: 5
    }
    const res = await getCartDetails(data);
    await dispatch(cartPrdouctIdsAction(res?.data?.cart?.data[0]?.productIds));
  }

  const addToWishlist=async(data)=>{
    data.token=token;
    await addWishlist(data);
    setWishlistData(null);
    handleData();
  }
  const removeFromWishlist=async(data)=>{
    data.token=token;
    const res=await removewishlist(data);
    console.log(res);
    setWishlistData(null);
    handleData();
  }
  let api={
    addToCart,
    addToWishlist,
    removeFromWishlist
  }
  useEffect(()=>{
    handleData();
    handleCartData();
  },[token]);

  console.log(wishlistData);

  return (
    <>
    {wishlistData ? <WishlistProducts data={wishlistData} api={api} icon={icons}/> : null}
    </>
  )
}

export default ProductList;