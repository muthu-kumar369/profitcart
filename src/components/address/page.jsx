import { Country, State } from 'country-state-city';
import { useFormik } from 'formik';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";
import * as yup from "yup";

const addressSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    firstLine: yup.string().required("First line is required"),
    secondLine: "",
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    postalCode: yup.string().required("Postal code is required"),
    phone: yup.number().required("Phone number is required"),
    phoneCode: yup.string().required("Phone code code is required")
})

function AddressComponent({ data, api,state }) {
    const [type, setType] = useState("");
    const [show, setShow] = useState(false);
    const [country, setCountry] = useState(Country.getAllCountries());
    const [states, setStates] = useState();
    const [id, setId] = useState("");
    const [countryValue, setCountryValue] = useState();
    const [countryEdit, setCountryEdit] = useState(false);

    const formik = useFormik({
        initialValues: ({
            name: "",
            firstLine: "",
            secondLine: "",
            country: "",
            countryCode: "",
            state: "",
            city: "",
            postalCode: "",
            phone: "",
            phoneCode: ""
        }),
        validationSchema: () => addressSchema,
        onSubmit: (values) => {
            switch (type) {
                case "create":

                    values.country = countryValue;
                    api.handleCreateAddress(values)
                    setShow(false);
                    break;

                case "edit":

                    values.addressId = id;
                    if (!countryEdit) {
                        let countryDetails = Country.getCountryByCode(values.countryCode);
                        values.country = countryDetails?.name;
                    } else {
                        values.country = countryValue;
                    }
                    console.log("Values", values);
                    api.handleEditAddress(values);
                    setShow(false);
                    break;
            }
        }
    })
    const handleCreate = () => {
        formik.resetForm();
        setStates(null);
        setType("create");
        setShow(true);
    }
    const handleEdit = (item, e) => {
        e.preventDefault();
        setStates(State.getStatesOfCountry(`${item?.countryCode}`));
        setId(item?._id)
        setType("edit");
        formik.setFieldValue("name", item?.name);
        formik.setFieldValue("firstLine", item?.firstLine);
        formik.setFieldValue("secondLine", item?.secondLine);
        formik.setFieldValue("country", item?.countryCode);
        formik.setFieldValue("countryCode", item?.countryCode);
        formik.setFieldValue("state", item?.state);
        formik.setFieldValue("city", item?.city);
        formik.setFieldValue("postalCode", item?.postalCode);
        formik.setFieldValue("phoneCode", item?.phoneCode);
        formik.setFieldValue("phone", item?.phone);
        setShow(true);
    };

    const handleDelete = (id, e) => {
        e.preventDefault();
        api.handleDeleteAddress({ id });
    }
    const handleCancel = () => {
        setShow(false);
    };

    const handleState = (value) => {
        console.log("I am in", value);
        setStates(State.getStatesOfCountry(`${value}`));

        let countryDetails = Country.getCountryByCode(value);
        formik.setFieldValue('countryCode', value);
        setCountryValue(countryDetails?.name);

        if (countryDetails?.phonecode.includes("+")) {
            formik.setFieldValue('phoneCode', countryDetails?.phonecode);
        } else {
            let code = `+${countryDetails.phonecode}`;
            formik.setFieldValue('phoneCode', code)
        }
        formik.setFieldValue("state", "");
        setCountryEdit(true);
    }

    console.log(states);
    return (
        <>
            <section className="wishlist-folder mx-10 lg:mx-28 mt-6 rounded-sm">
                <div >
                    <div className="header block md:flex justify-between items-center py-5 px-9">
                        <p className="title capitalize font-bold text-xl  font-sans">Your Address</p>
                        <div className='block md:flex items-center my-3'>
                            <button className=' bg-emerald-800 p-2 text-white rounded-sm' onClick={()=>state.setAddressForm(true)}>Change Address</button>
                            <button className="add-folder text-2xl md:text-4xl font-bold ml-5" onClick={() => handleCreate()} >+</button>
                        </div>
                    </div>
                    <div>
                        {data && data?.address.map((item, index) => {
                            return (
                                <>
                                    <div className="address mx-4 md:mx-20  my-4 border border-emerald-900 rounded-sm bg-gray-50">
                                        <div className="address-header px-4 py-3 flex justify-between items-baseline border border-r-0 border-l-0 border-t-0 border-emerald-600">
                                            <p className="number font-bold  ">Address - {index + 1} {item?.default ? <span>(Default)</span>:null }</p>
                                            <div className=' flex mt-5 md:mt-8 lg:mt-0 text-end items-end'>
                                                <button className='text-xl md:text-2xl ml-3 text-blue-600' onClick={(e) => handleEdit(item, e)}><FaEdit /></button>
                                                <button className='text-xl md:text-2xl mx-5 text-red-600' onClick={(e) => handleDelete(item?._id, e)}><MdDelete /></button>
                                            </div>
                                        </div>
                                        <div className="details lg:grid lg:grid-cols-12 px-6 my-4">
                                            <p className="title lg:col-span-5 flex font-bold text-emerald-900"><span>Name</span> <span className='flex lg:hidden ml-5'>:</span> </p>
                                            <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span className='lg:flex hidden mr-5'>:</span><span>{item?.name}</span></p>
                                        </div>
                                        <div className="details lg:grid lg:grid-cols-12 px-6 my-4">
                                            <p className="title lg:col-span-5 flex font-bold text-emerald-900"><span>First Line</span> <span className='flex lg:hidden ml-5'>:</span> </p>
                                            <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span className='lg:flex hidden mr-5'>:</span><span>{item?.firstLine}</span></p>
                                        </div>
                                        {item?.secondLine && <div className="details lg:grid lg:grid-cols-12 px-6 my-4">
                                            <p className="title lg:col-span-5 flex font-bold text-emerald-900"><span>Second Line</span> <span className='flex lg:hidden ml-5'>:</span> </p>
                                            <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span className='lg:flex hidden mr-5'>:</span><span>{item?.secondLine}</span></p>
                                        </div>}
                                        <div className="details lg:grid lg:grid-cols-12 px-6 my-4">
                                            <p className="title lg:col-span-5 flex font-bold text-emerald-900"><span>Country</span> <span className='flex lg:hidden ml-5'>:</span> </p>
                                            <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span className='lg:flex hidden mr-5'>:</span><span>{item?.country}</span></p>
                                        </div>
                                        <div className="details lg:grid lg:grid-cols-12 px-6 my-4">
                                            <p className="title lg:col-span-5 flex font-bold text-emerald-900"><span>State</span> <span className='flex lg:hidden ml-5'>:</span> </p>
                                            <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span className='lg:flex hidden mr-5'>:</span><span>{item?.state}</span></p>
                                        </div>
                                        <div className="details lg:grid lg:grid-cols-12 px-6 my-4">
                                            <p className="title lg:col-span-5 flex font-bold text-emerald-900"><span>City</span> <span className='flex lg:hidden ml-5'>:</span> </p>
                                            <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span className='lg:flex hidden mr-5'>:</span><span>{item?.city}</span></p>
                                        </div>
                                        <div className="details lg:grid lg:grid-cols-12 px-6 my-4">
                                            <p className="title lg:col-span-5 flex font-bold text-emerald-900"><span>Phone Mumber</span> <span className='flex lg:hidden ml-5'>:</span> </p>
                                            <p className="value lg:col-span-7 flex font-semibold text-emerald-900"><span className='lg:flex hidden mr-5'>:</span><span className="mr-2">{item?.phoneCode}</span><span>{item?.phone}</span></p>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>

            </section>
            {show && <div className="folder-form">

                <div className="form-details p-10">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-header">
                            <p className="title font-bold pb-3 text-center uppercase text-xl text-emerald-900 border border-r-0 border-l-0 border-t-0 border-emerald-600">Address</p>
                        </div>
                        <div className="form-inputs mt-5">
                            <div className="form-field block">
                                <label htmlFor="name" >Name <span className="star">*</span> </label>
                                <input type="text" id='name' name='name' className='w-full border-2 border-emerald-900 p-1 px-3 rounded-sm my-4' value={formik?.values?.name} onChange={formik?.handleChange} />
                                {formik?.touched?.name && formik?.errors?.name && <p className="error uppercase py-2">{formik?.errors?.name}</p>}
                            </div>
                            <div className="form-field">
                                <label htmlFor="firstLine">First Line <span className="star">*</span> </label>
                                <input type="text" id='firstLine' name='firstLine' className='w-full border-2 border-emerald-900 p-1 px-3 rounded-sm my-4' value={formik?.values?.firstLine} onChange={formik?.handleChange} />
                                {formik?.touched?.firstLine && formik?.errors?.firstLine && <p className="error uppercase py-2">{formik?.errors?.firstLine}</p>}
                            </div>
                            <div className="form-field">
                                <label htmlFor="secondLine">Second Line</label>
                                <input type="text" id='secondLine' name='secondLine' className='w-full border-2 border-emerald-900 p-1 px-3 rounded-sm my-4' value={formik?.values?.secondLine} onChange={formik?.handleChange} />
                                {formik?.touched?.secondLine && formik?.errors?.secondLine && <p className="error uppercase py-2">{formik?.errors?.secondLine}</p>}
                            </div>
                            <div className="form-field">
                                <label htmlFor="country">Country <span className="star">*</span> </label>
                                <div className='lg:flex'>
                                    <select name="country" id="country" className='w-9/12 border-2 border-emerald-900 p-1 px-3 rounded-sm my-4' value={formik?.values?.country} onChange={(e) => {
                                        formik?.handleChange("country")(e);
                                        handleState(e.target.value)
                                    }}>

                                        <option className='text-center'>--Country--</option>
                                        {country && country.map((item, index) => {
                                            return (
                                                <option value={item?.isoCode} onClick={() => handleCountryCode(item)} key={index}>{item?.name}</option>
                                            )
                                        })}
                                    </select>
                                    <p className='w-1/12'></p>
                                    <input type="text" id='countryCode' name='countryCode' className=' text-center w-3/12 xl:w-2/12  border-2 border-emerald-900 p-1 px-3 rounded-sm my-4' value={formik?.values?.countryCode} onChange={formik?.handleChange} disabled={true} />

                                </div>
                                {formik?.touched?.country && formik?.errors?.country && <p className="error uppercase py-2">{formik?.errors?.country}</p>}
                            </div>
                            <div className="form-field">
                                <label htmlFor="state">State <span className="star">*</span> </label>
                                <select id='state' name='state' value={formik?.values?.state} className='w-full border-2 border-emerald-900 p-1 px-3 rounded-sm my-4' onChange={formik?.handleChange} >

                                    <option className="text-center">--State--</option>
                                    {states && states.map((item, index) => {
                                        return (
                                            <option value={item?.name} onClick={() => handleCountryCode(item)} key={index}>{item?.name}</option>
                                        )
                                    })}

                                </select>
                                {formik?.touched?.state && formik?.errors?.state && <p className="error uppercase py-2">{formik?.errors?.state}</p>}
                            </div>
                            <div className="form-field">
                                <label htmlFor="city" className='w-full'>City <span className="star">*</span> </label>
                                <input type="text" id='city' name='city' className='w-full border-2 border-emerald-900 p-1 px-3 rounded-sm my-4' value={formik?.values?.city} onChange={formik?.handleChange} />
                                {formik?.touched?.city && formik?.errors?.city && <p className="error uppercase py-2">{formik?.errors?.city}</p>}
                            </div>
                            <div className="form-field">
                                <label htmlFor="postalCode">Postal Code <span className="star">*</span> </label>
                                <input type="text" id='postalCode' name='postalCode' className='w-full border-2 border-emerald-900 p-1 px-3 rounded-sm my-4' value={formik?.values?.postalCode} onChange={formik?.handleChange} />
                                {formik?.touched?.postalCode && formik?.errors?.postalCode && <p className="error uppercase py-2">{formik?.errors?.postalCode}</p>}
                            </div>
                            <div className="form-field">
                                <label htmlFor="phone">Phone Number <span className="star">*</span> </label>
                                <div className='lg:flex'>
                                    <input type="text" id='phoneCode' name='phoneCode' className='w-3/12 xl:w-2/12 text-center border-2 border-emerald-900 p-1 px-3 rounded-sm my-4' value={formik?.values?.phoneCode} onChange={formik?.handleChange} />
                                    <p className='w-1/12'></p>
                                    <input type="text" id='phone' name='phone' className=' w-9/12 border-2 border-emerald-900 p-1 px-3 rounded-sm my-4' value={formik?.values?.phone} onChange={formik?.handleChange} />
                                </div>
                                {formik?.touched?.phone && formik?.errors?.phone && <p className="error uppercase py-2">{formik?.errors?.phone}</p>}
                            </div>
                        </div>
                        <div className="btn-group flex justify-between mt-3">
                            <button type='button' className='cancel bg-red-600 text-white p-1 px-4 rounded-sm' onClick={(e) => handleCancel()}>Cancel</button>
                            <button type='submit' className="add text-white bg-emerald-900 p-1 px-4 rounded-sm" >Submit</button>
                        </div>
                    </form>

                </div>

            </div>}
        </>
    )
}

export default AddressComponent;