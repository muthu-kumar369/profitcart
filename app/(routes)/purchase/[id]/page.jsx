"use client"
import { getAllAddress } from '@/app/api/addressAPI';
import { CreateOrder } from '@/app/api/odersAPI';
import { productDetails } from '@/app/api/productAPI';
import { GetSession, RetrievePricingDetails } from '@/app/api/stripeAPI';
import { checkToken } from '@/redux/actions/authActions';
import { addressDataAction, login, logout } from '@/redux/reducers/authReducers';
import AddressForm from '@/src/components/address/form/page';
import ConfirmPayment from '@/src/components/payment/confirm/page';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function PurchaseProduct({ params }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const { token, addressData } = useSelector(state => state.auth);
    const [id, setId] = useState(params.id);
    const [productData, setProductData] = useState(null);
    const [address, setAddress] = useState();
    const [addressId, setAddressId] = useState();
    const [addressForm, setAddressForm] = useState(false);
    const [pricingDetails,setPricingDetails]=useState();
    const [paymentType, setPaymentType] = useState("card");

    const dataFetch = async (id) => {
        const res = await productDetails(id);
        setProductData(res?.data);
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
            const data = {
                productIds: [
                    {
                        id,
                        quantity: 1,
                        price
                    }
                ],
                token
            }
            const res = await RetrievePricingDetails(data);
            setPricingDetails(res?.data);
            console.log("Pricing details: ", res?.data);
        }
    }

    const handleSession=async()=>{
        
        if(paymentType=="cashondelivery"){
            let orderData={
                product:[
                    {
                        product:id,
                        quantity:1,
                        title:productData?.data?.title,
                        shippingAddress:addressId,
                    }
                ],
               
                paymentMethod:paymentType,
                token
            };
            const orderRes=await CreateOrder(orderData);
            if(orderRes?.status==process.env.success){
                router.push('/payment/success')
            }
        }else if(paymentType=="card"){
            let data={
                pricingDetails,
                token
            }
            console.log(data);
            const res=await GetSession(data);
            console.log(res);
            if(res?.status==process.env.success){
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
    let api={
        handleSession,
        handlePricing
    }
    useEffect(() => {
        handleToken();
        dataFetch(id);
        handleAddress();
    }, [id, addressId, token])
    return (
        <>
            {productData ? <ConfirmPayment data={productData?.data} address={address} state={state} api={api} /> : null}
            {addressForm && addressData && <AddressForm data={addressData} state={state} />}
        </>
    )
}

export default PurchaseProduct;
