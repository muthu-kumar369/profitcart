"use client"
import { RemoveOrderedFromCart } from '@/app/api/cartAPI';
import { CreateBulkOrder } from '@/app/api/odersAPI';
import { checkToken } from '@/redux/actions/authActions';
import { login, logout } from '@/redux/reducers/authReducers';
import PaymnentFailed from '@/src/components/payment/failed/page';
import PaymentSucess from '@/src/components/payment/success/page';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function PaymentStatus({ params }) {

  const { token } = useSelector(state => state.auth);
  const [value, setValue] = useState(params?.status);
  const paramsValue = useSearchParams();
  const [orderId, setOrderId] = useState(paramsValue.get("id"));
  const [redirect, setRedirect] = useState(false);

  const router=useRouter();
  const dispatch=useDispatch();

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
  const handleOrder = async () => {
    if (orderId) {
      let data = {
        id: orderId,
        token
      }
      const res=await CreateBulkOrder(data);
      if(res?.status==process.env.success){
        const remove=await RemoveOrderedFromCart({
          stripeOrderId:orderId,
          type:"card",
          token
        })
        if(remove?.status==process.env.success){
          setRedirect(true);
        }
      }
    }else{
      setRedirect(true)
    }
  }
  useEffect(() => {
    if(!token){
      handleToken();
    }
    handleOrder();
  }, [token])

  const state={
    redirect
  }
  return (
    <>
      {value == "success" ? <PaymentSucess state={state} /> : null}
      {value == "failed" ? <PaymnentFailed /> : null}
    </>
  )
}

export default PaymentStatus;