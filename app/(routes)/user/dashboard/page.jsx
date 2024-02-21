"use client"
import { getCartDetails } from '@/app/api/cartAPI';
import { getWishlist } from '@/app/api/wishlistAPI';
import { checkToken } from '@/redux/actions/authActions';
import { login, logout } from '@/redux/reducers/authReducers';
import { cartPrdouctIdsAction, wishlistAction, wishlistProdcutIdsAction } from '@/redux/reducers/productReducers';
import AccountDetails from '@/src/components/dashboard/AccountDetails/page';
import PieChartComponent from '@/src/components/dashboard/PieChart/page';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHome , FaHeart,FaRegAddressCard  } from "react-icons/fa";
import {  PiPackageBold } from "react-icons/pi";
import EmptySingnIn from '@/src/components/EmptySingnIn/page';


function Dashboard() {

  const dispatch = useDispatch();
  const router = useRouter();
  const {isAuthtenticate,userDetails,token } = useSelector(state => state.auth);
  const { cartPrdouctIds, wishlistProdcutIds } = useSelector(state => state.product);
  let chartData= [
      { title: 'Ordered', value: 10, color: '#025305' },
      { title: 'Cart', value: cartPrdouctIds ? cartPrdouctIds.length : 1, color: '#E38627' },
      { title: 'Wishlist', value:wishlistProdcutIds? wishlistProdcutIds.length :0, color: '#FF3131' },
      { title: 'Return', value: 5, color: '#D22B2B' },
  
    ]

  let accountDetails={
    user:userDetails,
    pages:[
      {
        icon:<FaHome />,
        text:"Home",
        link:"/"
      },
      {
        icon:<FaRegAddressCard />,
        text:"Address details",
        link:"/user/address"
      },
      {
        icon:<FaHeart color='red'/>,
        text:"Wish List",
        link:"/user/wishlist"
      },
      {
        icon:<PiPackageBold />,
        text:"Orders",
        link:"/user/orders"
      }
    ]
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
  const handleCartData = async () => {
    if (token) {
      let data = {
        token,
        page: 1,
        size: 5
      }
      const res = await getCartDetails(data);
      await dispatch(cartPrdouctIdsAction(res?.data?.cart?.data[0]?.productIds));
    }
  }

  const handleWishlistData = async () => {
    if (token) {
      let data = {
        token,
        page: 1,
        size: 0
      }
      const res = await getWishlist(data);
      dispatch(wishlistAction(res?.data?.data));
      dispatch(wishlistProdcutIdsAction(res?.data?.productIds))
    }
  }

  useEffect(() => {
    handleToken();
    handleCartData();
    handleWishlistData();
  }, [token])
  return (
    <>
      {isAuthtenticate ? (
        <div className='m-8 lg:mx-24'>
        <AccountDetails data={accountDetails} />
        <div>
          {chartData && <PieChartComponent data={chartData} />}
        </div>
      </div>
      ):<EmptySingnIn title="Dashboard details"/>}
      
    </>
  )
}

export default Dashboard;