"use client"
import { checkToken } from '@/redux/actions/authActions';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/navigation";
import EmptySingnIn from '@/src/components/EmptySingnIn/page';
import { createFolder, getWishlist, removeFolder, updateFolder } from '@/app/api/wishlistAPI';
import WishlistFolder from '@/src/components/wishlist/folder/page';
import { wishlistAction, wishlistProdcutIdsAction } from '@/redux/reducers/productReducers';
function Cart() {

  const {isAuthtenticate,token}=useSelector(state=>state.auth);
  const [folderData,setFolderData]=useState();


  const router=useRouter();
  const dispatch=useDispatch();

 
  const dataFetch=async(page=1,size=0)=>{
    if(token){
      let data={
        token,
        page,
        size
      }
      const res=await getWishlist(data);
      setFolderData(res?.data);
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

  const createWhishlistFolder=async(data)=>{
    data.token=token;
    const res=await createFolder(data);
    dataFetch();
  };

  const updateWishlistFolder=async(data)=>{
    data.token=token;
    const res=await updateFolder(data);
    dataFetch();
  }

  const deleteWishlistfolder=async(data)=>{
    data.token=token;
    const res=await removeFolder(data);
    dataFetch();
  };
  const api={
    createWhishlistFolder,
    updateWishlistFolder,
    deleteWishlistfolder
  }
  useEffect(()=>{
    dataFetch();
  },[token])

  return (
    <>
    {isAuthtenticate? (folderData ? <WishlistFolder data={folderData?.data} api={api}  /> :"") : <EmptySingnIn title="Wishlist"/> }
    </>
  )
}

export default Cart;