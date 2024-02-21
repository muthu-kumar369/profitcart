"use client";
import Image from 'next/image';
import banner1 from '../../public/images/banner.jpg';
import banner2 from '../../public/images/banner1.jpg';
import banner3 from '../../public/images/banner2.jpg';
import banner4 from '../../public/images/banner3.jpg';
import BannerSlider from '@/src/components/bannerSlider/page';
import { useDispatch, useSelector } from 'react-redux';
import { checkToken, loginUser, logoutUser } from '@/redux/actions/authActions';
import Cookies from 'js-cookie';
import { login, logout } from '@/redux/reducers/authReducers';
import { use, useEffect, useState } from 'react';
import { getIndexData, getProducts } from '../api/productAPI';
import { topDiscountAction, comboAction, brandAction, typeWearAction, cartPrdouctIdsAction, wishlistAction, wishlistProdcutIdsAction } from '@/redux/reducers/productReducers';
import ProductCards from '@/src/components/productCards.js/page';
const bannerData = [banner1, banner2, banner3, banner4];
import { CiDiscount1 } from "react-icons/ci";
import { IoIosArrowDroprightCircle, IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import Navbar from '@/src/components/navbar/page';
import { useRouter } from 'next/navigation';
import { addCart, getCartDetails } from '../api/cartAPI';
import { addWishlist, getWishlist, removewishlist } from '../api/wishlistAPI';
import WishlistForm from '@/src/components/wishlist/form/page';

export default function Home() {

  const dispatch = useDispatch();
  const { isAuthtenticate, user, token } = useSelector(state => state.auth);
  const { topDiscount, combo, brand, typeWear,wishlistProducts } = useSelector(state => state.product);
  
  const router = useRouter()
  const [discountData, setDiscountData] = useState(topDiscount);
  const [comboData, setComboData] = useState(combo);
  const [brandData, setBrandData] = useState(brand);
  const [typeWearData, setTypeWearData] = useState(typeWear);
  const [call, setCall] = useState(1);
  const [wishlistForm,setWishlistForm]=useState(false);
  const [folderId,setFolderId]=useState();
  const [wishlistProductId,setWishlistProductId]=useState();

  const discountIcons = {
    discount: <CiDiscount1 />,
    arrow: <IoIosArrowDroprightCircle />,
    like: <IoIosHeartEmpty />,
    wishlist: <IoMdHeart />,
    cart: <FaShoppingCart />
  }
  const defaultIcons = {
    arrow: <IoIosArrowDroprightCircle />,
    like: <IoIosHeartEmpty />,
    wishlist: <IoMdHeart />,
    cart: <FaShoppingCart />
  }
  const dataFetch = async (type) => {
    let discount, combo, brand, wear;
    switch (type) {
      case "discount":
        discount = await getIndexData();
        dispatch(topDiscountAction(discount));
        setDiscountData(discount);
        break;
      case "combo":
        combo = await getProducts({
          search: "combo",
          page: 1,
          size: 10
        });
        dispatch(comboAction(combo));
        setComboData(combo);
        break;
      case "brand":
        brand = await getProducts({
          search: "York",
          page: 1,
          size: 10
        })
        dispatch(brandAction(brand));
        setBrandData(brand);
        break;
      case "wear":
        wear = await getProducts({
          search: "topwear",
          page: 1,
          size: 10
        });
        dispatch(typeWearAction(wear))
        setTypeWearData(wear);
        break;
    }
  }
  const addToCart = async (data) => {
    data.token = token;
    const res = await addCart(data);

    console.log(res);
    if (res?.status == process.env.success) {
      dataFetch();
    }
  }
  const handleToken = async () => {
    let data = {
      router: router,
      redirect: false
    }
    const res = await dispatch(checkToken(data));
    if(Object.keys(res?.payload).length!=0){
      dispatch(login(res?.payload));
    }else{
      dispatch(logout());
    }
  }
  const handleCartData = async () => {
    if(token){
      let data = {
        token,
        page: 1,
        size: 5
      }
      const res = await getCartDetails(data);
      await dispatch(cartPrdouctIdsAction(res?.data?.cart?.data[0]?.productIds));
    }
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

  const handleLogout=()=>{
    dispatch(logoutUser());
    dispatch(logout());
  }
  let api={
    addToCart,
    addToWishlist,
    removeFromWishlist
  }

  let state={
    setWishlistForm,
    setWishlistProductId,
    setFolderId
  }
  useEffect(() => {
    if (discountData == null) {
      dataFetch("discount");
    }
    if (comboData == null) {
      dataFetch("combo")
    }
    if (brandData == null) {
      dataFetch("brand");
    }
    if (typeWearData == null) {
      dataFetch("wear");
    }
    if (!token) {
      handleToken();
    }
    handleCartData();
    handleWishlistData();
  }, [token, call])

  return (
    <>
      <Navbar handleLogout={handleLogout}/>
      <BannerSlider data={bannerData} />
      {brandData == null ? null : <ProductCards data={brandData?.data} title={"York Brand Products"} icon={defaultIcons} pageLink={"/search?value=York"} api={api} state={state} />}
      {discountData == null ? null : <ProductCards data={discountData.data} indexPage={true} title={"Top Discounts"} icon={discountIcons} pageLink={"/search?value=topdiscount"} api={api} state={state}/>}
      {comboData == null ? null : <ProductCards data={comboData?.data} title={"Combo Offer"} icon={discountIcons} pageLink={"/search?value=combo"} api={api} state={state} />}
      {typeWearData == null ? null : <ProductCards data={typeWearData?.data} title={"Top Wear Items"} icon={defaultIcons} pageLink={"/search?value=shirts"} api={api} state={state} />}
      { wishlistForm && wishlistProducts && <WishlistForm data={wishlistProducts} state={state} api={api}/>}
    </>
  )
}
