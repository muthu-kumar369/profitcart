"use client"
import { addCart, getCartDetails } from '@/app/api/cartAPI';
import { productDetails } from '@/app/api/productAPI';
import { addWishlist, getWishlist, removewishlist } from '@/app/api/wishlistAPI';
import { cartPrdouctIdsAction, wishlistAction, wishlistProdcutIdsAction } from '@/redux/reducers/productReducers';
import ProductDetailsComponent from '@/src/components/productDetails/page';
import WishlistForm from '@/src/components/wishlist/form/page';
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


function ProductDetails({ params }) {

    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);
    const {wishlistProducts}=useSelector(state=>state.product);

    const [id, setId] = useState(params.id);
    const [productData, setProductData] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [wishlistForm,setWishlistForm]=useState(false);
    const [folderId,setFolderId]=useState();
    const [wishlistProductId,setWishlistProductId]=useState();

    const dataFetch = async (id) => {
        const res = await productDetails(id);
        setProductData(res?.data);
    }

    const tabs = {
        tabs: ["Product Details", "Description"],
        tabsData: [
            {
                value: "product_details",
                type: "object"
            },
            {
                value: "description",
                type: "Array"
            }
        ]
    }
    const state = {
        activeTab,
        setActiveTab,
        setWishlistForm,
        setWishlistProductId,
        setFolderId
    }

    const addToCart = async (data) => {
        data.token = token;
        const res = await addCart(data);

        console.log(res);
        if (res?.status == process.env.success) {
            dataFetch(id);
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
      };
    useEffect(() => {
        dataFetch(id);
        handleCartData();
        handleWishlistData();
    }, [id])
    return (
        <>
            {productData == null ? null : <ProductDetailsComponent data={productData?.data} tabs={tabs} state={state} description={productData?.description} api={api} />}
            { wishlistForm && wishlistProducts && <WishlistForm data={wishlistProducts} state={state} api={api}/>}
        </>
    )
}

export default ProductDetails;