"use client"
import { getAllAddress } from '@/app/api/addressAPI';
import { RemoveOrderedFromCart, getCartDetails } from '@/app/api/cartAPI';
import { CreateOrder } from '@/app/api/odersAPI';
import { productDetails } from '@/app/api/productAPI';
import { GetSession, RetrievePricingDetails } from '@/app/api/stripeAPI';
import { checkToken } from '@/redux/actions/authActions';
import { addressDataAction, login, logout } from '@/redux/reducers/authReducers';
import AddressForm from '@/src/components/address/form/page';
import CartPayment from '@/src/components/payment/cartProduct/page';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function PurchaseProduct() {
    const dispatch = useDispatch();
    const router = useRouter();

    const { token, addressData } = useSelector(state => state.auth);
    const [productData, setProductData] = useState();
    const [address, setAddress] = useState();
    const [addressId, setAddressId] = useState();
    const [addressForm, setAddressForm] = useState(false);
    const [pricingDetails, setPricingDetails] = useState();
    const [paymentType, setPaymentType] = useState("card");
    const [overAllData,setOverAllData]=useState();
    const [productIds,setProductIds]=useState();

    const handleData = (data) => {
        let details=[];
        data.map((item) => {
            if (!item?.later) {
                details.push(item);
            }
        });
        setProductData(details);
    }

    const dataFetch = async (page = 1, size = 5) => {
        if (token) {
            let data = {
                token,
                page,
                size
            }
            const res = await getCartDetails(data);
            if (res?.status == process.env.success) {
                handleData(res?.data?.cart?.data[0]?.items);
                setOverAllData(res?.data?.cart?.data[0]); 
                setProductIds(res?.data?.cart?.priceDetails);              
            }
        } else {
            let tokendata = {
                redirect: false,
                router
            }
            dispatch(checkToken(tokendata));
        }
    }

    const handleAddress = async () => {
        let data = {
            page: 1,
            size: 0,
            token
        }
        const res = await getAllAddress(data);
        dispatch(addressDataAction(res?.data?.address));
        let addressDetails = {};
        if (addressId) {
            addressDetails = res?.data?.address.filter(data => data._id == addressId);
            if (addressDetails) {
                setAddress(addressDetails[0]);
            }
        } else {
            addressDetails = res?.data?.address.filter(data => data.default == true);
            if (addressDetails) {
                setAddress(addressDetails[0]);
                setAddressId(addressDetails[0]._id);
            }
        }
    };

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
    const handlePricing = async (price) => {
        if (token) {
            let details=productIds;
            details[0].price+=price;
            let type;
            if(price==40){
                type="charge"
            }
            const data = {
                productIds:details,
                type,
                token
            }
            const res = await RetrievePricingDetails(data);
            setPricingDetails(res?.data);
            console.log("Pricing details: ", data);
        }
    }

    const handleSession = async () => {

        if (paymentType == "cashondelivery") {
            let product= productIds;
            await product.map((item)=>{
                item.shippingAddress=addressId;
                item.product=item.id;
            })
            console.log("Product to order",product);
            let orderData = {
                product,
                paymentMethod: paymentType,
                token
            };
            const orderRes = await CreateOrder(orderData);
            if (orderRes?.status == process.env.success) {
                const remove=await RemoveOrderedFromCart({
                    products:productIds,
                    token,
                    type:"cashondelivery"
                });
                if(remove?.status==process.env.success){
                    router.push('/payment/success');
                }
                
            }
        } else if (paymentType == "card") {
            let data = {
                pricingDetails,
                token,
                addressId,
                cartProducts:productIds
            }
            console.log(data);
            const res = await GetSession(data);
            console.log(res);
            if (res?.status == process.env.success) {
                router.push(`${res?.data?.url}`)
            }
        }

    }
    let state = {
        setAddressForm,
        setAddressId,
        paymentType,
        setPaymentType
    }
    let api = {
        handleSession,
        handlePricing
    }
    useEffect(() => {
        handleToken();
        dataFetch();
        handleAddress();
    }, [addressId, token])
    return (
        <>
            {productData ? <CartPayment data={productData} address={address} state={state} api={api} overAllData={overAllData} /> : null}
            {addressForm && addressData && <AddressForm data={addressData} state={state} />}
        </>
    )
}

export default PurchaseProduct;
