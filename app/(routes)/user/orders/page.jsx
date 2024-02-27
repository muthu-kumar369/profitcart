"use client"
import { GetOrderList } from '@/app/api/odersAPI';
import { checkToken } from '@/redux/actions/authActions';
import { login, logout } from '@/redux/reducers/authReducers';
import { totalOrderedProductAction, totalReturnProductAction } from '@/redux/reducers/productReducers';
import EmptySingnIn from '@/src/components/EmptySingnIn/page';
import AllofOrder from '@/src/components/order/all/page';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Orders() {

  const dispatch = useDispatch();
  const router = useRouter();
  const {isAuthtenticate,userDetails,token } = useSelector(state => state.auth);
  const [orderData,setOrderData]=useState();

  const handleToken = async () => {
    let data = {
      router: router,
      redirect: false
    }
    const res = await dispatch(checkToken(data));
    if (Object.keys(res?.payload).length != 0) {
      dispatch(login(res?.payload));
    } else {
      dispatch(logout());
    }
  }

  const handleOrderData=async()=>{
    if(token){
      const res=await GetOrderList({
        page:1,
        size:100,
        token
      });
      if(res?.status==process.env.success){
        setOrderData(res?.data)
        dispatch(totalOrderedProductAction(res?.data?.totalOrderedProduct));
        dispatch(totalReturnProductAction(res?.data?.totalReturnProduct))
      }
    }
  }
  useEffect(()=>{
    handleToken();
    handleOrderData();
  },[token])
  console.log("Oreded data:",orderData);
  return (
   <>
    
    {isAuthtenticate ? (orderData ? <AllofOrder data={orderData?.order}/> :null): <EmptySingnIn title="Order details"/>}
   </>
  )
}

export default Orders;