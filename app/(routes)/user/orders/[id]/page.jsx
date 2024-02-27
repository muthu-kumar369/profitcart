"use client"
import { GetOrderProduct } from '@/app/api/odersAPI';
import { checkToken } from '@/redux/actions/authActions';
import { login, logout } from '@/redux/reducers/authReducers';
import OrderDetails from '@/src/components/order/details/page';
import TrackingOrder from '@/src/components/order/track/page';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function OrderDetailsPage({ params }) {

  const dispatch = useDispatch();
  const router = useRouter();
  const {  token } = useSelector(state => state.auth);
  const [orderId, setOrderId] = useState(params.id);
  const searchParams = useSearchParams();
  const [itemId, setItemId] = useState(searchParams.get("item"));
  const [orderData,setOrderData]=useState()
  console.log("Order id: ", orderId, "Item id: ", itemId);

  const handleData=async()=>{
   
    const res=await GetOrderProduct({
      orderId,
      productId:itemId,
      token
    });
    if(res?.status==process.env.success){
      setOrderData(res?.data)
    }
  }

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

  useEffect(() => {
    handleToken();
    handleData();
  }, [token])
  return (
    <>
    {orderData && <OrderDetails data={orderData} />}
    {orderData && <TrackingOrder/>}
    </>
  )
}

export default OrderDetailsPage;