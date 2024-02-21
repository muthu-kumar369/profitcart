"use client";
import { Provider } from "react-redux";
import { store } from "../store/store.js";
import { useEffect } from "react";
import { hydrate } from "react-dom";
import Navbar from '@/src/components/navbar/page'
import logo from '../public/logo.png'
import { FaSearch, FaShoppingCart, FaUser, FaAngleDown, FaHeart, FaAngleUp } from "react-icons/fa";
import { CiDeliveryTruck, CiLogout } from "react-icons/ci";
import { BsShop } from "react-icons/bs";
import { PiSignInLight, PiPackageBold } from "react-icons/pi";
import { MdDashboard, MdOutlineMenu, MdClose } from "react-icons/md";

const navData = {
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
export function AuthProvider({ children}) {
    useEffect(() => {
        console.log("I am provider");
    }, []);
    return <Provider store={store}>
        <Navbar data={navData}/>
        {children}
        
        </Provider>;
}