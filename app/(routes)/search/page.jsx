"use client"
import { getProducts } from '@/app/api/productAPI';
import { cartPrdouctIdsAction, searchAction, wishlistAction, wishlistProdcutIdsAction } from '@/redux/reducers/productReducers';
import SearchProductCard from '@/src/components/searchProductCard/page';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { addCart, getCartDetails } from '@/app/api/cartAPI';
import { addWishlist, getWishlist, removewishlist } from '@/app/api/wishlistAPI';
import WishlistForm from '@/src/components/wishlist/form/page';

function Search() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const{token}=useSelector(state=>state.auth);
  const {wishlistProducts}=useSelector(state=>state.product);


  const { search } = useSelector(state => state.product)
  const [searchValue, setSearchValue] = useState();
  const [searchData, setSearchData] = useState(null);
  const [page, setPage] = useState(1);
  const [showPageEnd, setShowPageEnd] = useState(10);
  const [showPageStart, setShowPageStart] = useState(0);
  const [wishlistForm,setWishlistForm]=useState(false);
  const [folderId,setFolderId]=useState();
  const [wishlistProductId,setWishlistProductId]=useState();

  const icons = {
    like: <IoIosHeartEmpty />,
    wishlist: <IoMdHeart />,
    cart: <FaShoppingCart />
  }
  let value = searchParams.get('value');
  value = value.split(" ").join("");

  const paginationState = {
    showPageStart,
    setShowPageStart,
    showPageEnd,
    setShowPageEnd
  }
  const dataFetch = async (page = 1, size = 10) => {
    setSearchData(null)
    const res = await getProducts({
      search: value,
      page,
      size
    });
    dispatch(searchAction(res));
    setSearchData(res);
    console.log(searchData?.data?.totalLength);
   
  }

  const addToCart=async(data)=>{
    data.token=token;
    const res=await addCart(data);

    console.log(res);
    if(res?.status==process.env.success){
      dataFetch();
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
    addToWishlist,
    removeFromWishlist
  }

  let state={
    page,
    setPage,
    setWishlistForm,
    setWishlistProductId,
    setFolderId
  }
  useEffect(() => {
    if(searchValue!=value){
      setPage(1);
      setShowPageStart(0);
      setShowPageEnd(10);
    }
    setSearchValue(value);
    dataFetch(page);
    handleCartData();
    handleWishlistData();
  }, [value, page]);
  return (
    <>
      {searchData == null ? null : <SearchProductCard data={searchData?.data} icon={icons} pageLink={"#"} state={state}  paginationState={paginationState} api={api}/>}
      { wishlistForm && wishlistProducts && <WishlistForm data={wishlistProducts} state={state} api={api}/>}
    </>
  )
}

export default Search;