"use client";
import { useFormik } from 'formik'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../public/logo.png'
import { FaSearch, FaShoppingCart, FaUser, FaAngleDown, FaHeart, FaAngleUp } from "react-icons/fa";
import { CiDeliveryTruck, CiLogout } from "react-icons/ci";
import { BsShop } from "react-icons/bs";
import { PiSignInLight, PiPackageBold } from "react-icons/pi";
import { MdDashboard, MdOutlineMenu, MdClose } from "react-icons/md";

const data = {
  logo,
  url: "/",
  arrow: {
    up: <FaAngleUp />,
    down: <FaAngleDown />
  },
  menu: {
    open: <MdOutlineMenu />,
    close: <MdClose />
  },
  searchIcon: <FaSearch />,
  cart: {
    icon: <FaShoppingCart />,
    text: "Cart",
    url: "/user/cart"
  },
  seller: {
    icon: <BsShop />,
    text: "Wanna Seller",
    url: "#",
    item: [
      {
        icon: <CiDeliveryTruck />,
        text: "delivery partner",
        url: "#"
      }
    ]
  },

  signin: {
    icon: <PiSignInLight />,
    text: "Sign in",
    url: "/signin",
  },
  user: {
    icon: <FaUser />,
    text: "user",
    url: "#",
    item: [
      {
        icon: <MdDashboard />,
        url: "/user/dashboard",
        text: "dashboard"
      },
      {
        icon: <PiPackageBold />,
        url: "/user/orders",
        text: "Orders"
      },
      {
        icon: <FaHeart />,
        url: "/user/wishlist",
        text: "wishlist"
      },
      {
        icon: <CiLogout />,
        url: "#",
        text: "logout"
      }
    ]
  }
}

function Navbar({handleLogout}) {

  const dispatch=useDispatch();
  const {isAuthtenticate,userDetails,token}=useSelector(state=>state.auth);
  const [userData,setUserData]=useState(userDetails);
  const router=useRouter();
  const searchSchema = yup.object().shape({
    search: yup.string()
  })
  const formik = useFormik({
    initialValues: {
      search: ""
    },
    validationSchema: () => searchSchema,
    onSubmit: (values) => {
      if(values?.search){
        router.push(`/search?value=${values.search}`)
      }
    },
  });

  const [seller, setSeller] = useState(false);
  const [user, setUser] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleSeller = () => {
    setSeller((prev) => !prev);
  }

  const handleUser = (item=null) => {
    setUser((prev) => !prev);
    if(item?.text=="logout"){
      handleLogout();
    }
  }
  const handleBlur = () => {
    setUser(false);
    setSeller(false);
  }
  const handleToggle = () => {
    setToggle((prev) => !prev)
  }

  return (
    <div className="navbar ">
      <nav className=' flex py-2 md:py-0 justify-between mx-4 lg:mx-0 lg:justify-evenly'>
        <Link prefetch={false} href={data?.url} className="logo" >
          <Image alt='logo' src={data?.logo} className='w-16 sm:w-28 md:w-40' />
        </Link>
        <div className="search-form w-2/4  lg:w-4/12 xl:w-2/4">
          <form onSubmit={formik.handleSubmit}>
            <input id='search' name='search' onChange={formik.handleChange} value={formik.values.search} placeholder='Search here' type="search" className='search-input  w-full' />
            <button type='submit' className='search-icon text-xl'>{data?.searchIcon}</button>
          </form>
        </div>
        <Link prefetch={false} href={data?.cart?.url} className="cart hidden lg:flex">
          <p className='text-xl'>{data?.cart?.icon}</p>
          <p className='cart-text'>{data?.cart?.text}</p>
        </Link>
        <Link prefetch={false} href={data?.seller?.url} className="seller hidden lg:flex" onBlur={() => handleBlur()}>
          <p className="text-xl">{data?.seller?.icon}</p>
          <p className='seller-text'>{data?.seller?.text}</p>
          <button className='left-border' onClick={() => handleSeller()} >{seller ? <p className="text-xl">{data?.arrow?.up}</p> : <p className="text-xl">{data?.arrow?.down}</p> }</button>
          {seller && <div className='seller-drop-down' >
            {data?.seller?.item && data?.seller?.item.map((item, i) => {
              return (
                <Link prefetch={false} href={item?.url} className='drop-down-item ' onClick={() => handleSeller()} key={i}>
                  <p className="text-2xl">{item.icon}</p>
                  <p className='text'>{item?.text}</p>
                </Link>
              )
            })}
          </div>}
        </Link>
        {!isAuthtenticate && <Link prefetch={false} href={data?.signin?.url} className="sigin hidden lg:flex" >
          <p className="text-xl">{data?.signin?.icon}</p>
          <p className='singin-text'>{data?.signin?.text}</p>
        </Link>}
        <Link prefetch={false} href={data?.user?.url} className="user hidden lg:flex" >
          <p className="text-xl">{data?.user?.icon}</p>
          {userData?.name ? <p className='user-text'>{userData?.name.split(" ")[0]}</p> : <p className='user-text'>{data?.user?.text}</p> }
          <button className='left-border' onClick={() => handleUser()} >{user ? <p className="text-xl">{data?.arrow?.up}</p> : <p className="text-xl">{data?.arrow?.down}</p>}</button>
          {user && <div className='user-drop-down' >

            {data?.user?.item && data?.user?.item.map((item, i) => {
              return (
                <Link prefetch={false} href={item?.url} className='drop-down-item ' onClick={() => handleUser(item)} key={i}>
                  <p className="text-xl">{item?.icon}</p>
                  <p className='text '>{item?.text}</p>
                </Link>
              )
            })}
          </div>}
        </Link>

        <button className='flex lg:hidden' onClick={() => handleToggle()}> <p className="text-3xl">{data?.menu?.open}</p> </button>
        {toggle && <div className=' bg-white mobile-menu lg:hidden w-3/4 p-5'>
          <div className='flex justify-between'>
            <Link prefetch={false} href={data?.url} className="logo" >
              <Image alt='logo' src={data?.logo} className='w-28 ' />
            </Link>
            <button onClick={() => handleToggle()} ><p className="text-2xl">{data?.menu?.close}</p></button>
          </div>
          <Link prefetch={false} href={data?.cart?.url} className="cart flex my-5 w-3/4 mx-auto">
            <p className='text-xl'>{data?.cart?.icon}</p>
            <p className='cart-text'>{data?.cart?.text}</p>
          </Link>
          <div className="seller flex justify-between mt-5 w-3/4 mx-auto">
            <Link prefetch={false} href={data?.seller?.url} className="flex">
              <p className="text-xl">{data?.seller?.icon}</p>
              <p className='seller-text'>{data?.seller?.text}</p>
            </Link>
            <button className='left-border' onClick={() => handleSeller()} onBlur={() => handleBlur()}>{seller ? <p className="text-xl">{data?.arrow?.up}</p> : <p className="text-xl">{data?.arrow?.down}</p>}</button>
          </div>
          {seller && <div className='s-drop-down block w-3/4 mx-auto'>
            {data?.seller?.item && data?.seller?.item.map((item, i) => {
              return (
                <Link prefetch={false} href={"#"} className='drop-down-item flex py-3 items-center' key={i}>
                  <p className="text-2xl">{item.icon}</p>
                  <p className='text ml-3'>{item?.text}</p>
                </Link>
              )
            })}
          </div>}
          {!isAuthtenticate && <Link prefetch={false} href={data?.signin?.url} className="sigin hidden md:flex  w-3/4 mx-auto mt-5" >
          <p className="text-xl">{data?.signin?.icon}</p>
          <p className='singin-text'>{data?.signin?.text}</p>
        </Link>}
          <div className="user flex justify-between mt-5 w-3/4 mx-auto ">
            <Link prefetch={false} href={data?.user?.url} className='flex'>
              <p className="text-xl">{data?.user?.icon}</p>
              {userData?.name ? <p className='user-text'>{userData?.name.split(" ")[0]}</p> : <p className='user-text'>{data?.user?.text}</p> }
            </Link>
            <button className='left-border' onClick={() => handleUser()} >{user ? <p className="text-xl">{data?.arrow?.up}</p> : <p className="text-xl">{data?.arrow?.down}</p>}</button>
          </div>
          {user && <div className='u-drop-down block w-3/4 mx-auto '>
            {data?.user?.item && data?.user?.item.map((item, i) => {
              return (
                <Link prefetch={false} href={item?.url} className='drop-down-item flex py-3 items-center' key={i}>
                  <p className="text-xl">{item?.icon}</p>
                  <p className='text ml-3'>{item?.text}</p>
                </Link>
              )
            })}
          </div>}
        </div>}
      </nav>
    </div>
  )
}

export default Navbar;