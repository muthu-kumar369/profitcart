"use client"
import React, { useEffect, useState } from 'react'
import { Country } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import { createAddress, getAllAddress, removeAddress, updateAddress, updateDefaultAddress } from '@/app/api/addressAPI';
import AddressComponent from '@/src/components/address/page';
import { useRouter } from 'next/navigation';
import { checkToken } from '@/redux/actions/authActions';
import { addressDataAction, login, logout } from '@/redux/reducers/authReducers';
import EmptySingnIn from '@/src/components/EmptySingnIn/page';
import AddressForm from '@/src/components/address/form/page';
function Address() {

  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuthtenticate, token, addressData } = useSelector(state => state.auth);
  const [address, setAddress] = useState();
  const [addressId, setAddressId] = useState();
  const [addressForm, setAddressForm] = useState(false);

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

  const handleAddress = async () => {
    let data = {
      page: 1,
      size: 0,
      token
    }
    const res = await getAllAddress(data);
    console.log("Add :",res);
    if (res?.status == process.env.success) {
      dispatch(addressDataAction(res?.data?.address));
      setAddress(res?.data);

    }
  };

  const handleCreateAddress = async (data) => {
    data.token = token;
    const res = await createAddress(data);
    handleAddress();
  }

  const handleEditAddress = async (data) => {
    data.token = token;
    const res = await updateAddress(data);
    handleAddress();
  }

  const handleDeleteAddress = async (data) => {
    data.token = token;
    const res = await removeAddress(data);
    handleAddress()
  }

  const handleDefaultUpdate = async () => {
    let data = {
      id: addressId,
      token
    }
    const res = await updateDefaultAddress(data);
    handleAddress();
  }
  let state = {
    setAddressForm,
    setAddressId
  }
  let api = {
    handleCreateAddress,
    handleEditAddress,
    handleDeleteAddress,
    handleDefaultUpdate
  }
  useEffect(() => {
    handleToken();
    handleAddress();
  }, [token]);

  console.log(addressForm, addressData);
  return (
    <>
      {isAuthtenticate ? (address && <AddressComponent data={address} api={api} state={state} />) : <EmptySingnIn title="Address" />}
      {addressForm && addressData && <AddressForm data={addressData} state={state} api={api} page={"address"} />}
    </>
  )
}

export default Address;