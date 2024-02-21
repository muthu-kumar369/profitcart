"use client"
import { checkToken } from '@/redux/actions/authActions';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/navigation";
import EmptySingnIn from '@/src/components/EmptySingnIn/page';
import { addCart, getCartDetails, quantityUpdate, removeCart, updateLater } from '@/app/api/cartAPI';
import CartProduct from '@/src/components/cartProduct/page';
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import WishlistForm from '@/src/components/wishlist/form/page';
import { addWishlist, getWishlist, removewishlist } from '@/app/api/wishlistAPI';
import { wishlistAction, wishlistProdcutIdsAction } from '@/redux/reducers/productReducers';
function Cart() {

  const {isAuthtenticate,token}=useSelector(state=>state.auth);
  const { wishlistProducts } = useSelector(state => state.product);


  const [cartData,setCartData]=useState();
  const [page, setPage] = useState(1);
  const [showPageEnd, setShowPageEnd] = useState(5);
  const [showPageStart, setShowPageStart] = useState(0);
  const [wishlistForm,setWishlistForm]=useState(false);
  const [folderId,setFolderId]=useState();
  const [wishlistProductId,setWishlistProductId]=useState();

  const icons = {
    like: <IoIosHeartEmpty />,
    wishlist: <IoMdHeart />,
    cart: <FaShoppingCart />
  }

  const paginationState = {
    showPageStart,
    setShowPageStart,
    showPageEnd,
    setShowPageEnd
  }

  const router=useRouter();
  const dispatch=useDispatch();

 
  const dataFetch=async(page=1,size=5)=>{
    if(token){
      let data={
        token,
        page,
        size
      }
      const res=await getCartDetails(data);
      // console.log(res?.data);
      setCartData(res?.data);
      
    }else{
      let tokendata={
        redirect:false,
        router
      }
      dispatch(checkToken(tokendata));
    }
  }

  const addToCart=async(data)=>{
    data.token=token;
    const res=await addCart(data);

    console.log(res);
    dataFetch(page);
  }

  const removeFromCart=async(data)=>{
    data.token=token;
    const res=await removeCart(data);
    console.log(res);
    dataFetch(page);
  };

  const buyLater=async(data)=>{
    data.token=token;
    const res=await updateLater(data);
    console.log(res);
    if(res?.status==process.env.success){
      dataFetch(page);
    }
  }
  const quantityChange=async(data)=>{
    data.token=token;

    const res=await quantityUpdate(data);
    dataFetch();
  }
  const handleWishlistData=async()=>{
    if(token){
      let data={
        token,
        page:1,
        size:0
      }
      const res=await getWishlist(data);
      dispatch(wishlistAction(res?.data?.data));
      dispatch(wishlistProdcutIdsAction(res?.data?.productIds))
    }
  }
  const addToWishlist=async()=>{
    setTimeout(async() => {
      let data={
        productId: wishlistProductId,
        id: folderId,
        token
      }
      await addWishlist(data);
    }, 500);
  }
  const removeFromWishlist=async(data)=>{
    data.token=token;
    let folder=wishlistProducts.filter((result)=>result.productIds.includes(data?.productId));
    data.id=folder[0]._id
    const res=await removewishlist(data);
    console.log(res?.data);
  }

  let api={
    addToCart,
    removeFromCart,
    buyLater,
    quantityChange,
    addToWishlist,
    removeFromWishlist
  }

  let state={
    setWishlistForm,
    setWishlistProductId,
    setFolderId
  }

  useEffect(()=>{
    dataFetch(page);
    handleWishlistData();
  },[token,page])

  return (
    <>
    {isAuthtenticate ? (cartData ? <CartProduct data={cartData} icon={icons} api={api} state={state}  /> :"") : <EmptySingnIn title="Cart"/> }
    { wishlistForm && wishlistProducts && <WishlistForm data={wishlistProducts} state={state} api={api}/>}
    </>
  )
}

export default Cart;