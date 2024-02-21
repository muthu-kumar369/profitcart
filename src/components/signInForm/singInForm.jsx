"use client";
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha, LoadCanvasTemplateNoReload } from "react-simple-captcha";
import { AiOutlineReload } from "react-icons/ai";
import ecommerce from "../../../public/images/ecommerce.jpg"
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/actions/authActions';
import { login } from '@/redux/reducers/authReducers';
import Link from 'next/link';

const siginSchema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required!").matches(
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Invalid email address"
    ),
    password: yup.string().required("Password required"),
    capcha: yup.string().required("Capcha required")
})

function SingInForm({ handleLogin }) {
    const [capchaError, setCapchaError] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            capcha: ""
        },
        validationSchema: () => siginSchema,    
        onSubmit: async (values,{resetForm}) => {
            if (validateCaptcha(values?.capcha, false) === true) {
                setCapchaError(false)
                handleLogin(values);
                resetForm();
                loadCaptchaEnginge(6);
            } else {
                setCapchaError(true);
            }

        }
    })

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    return (
        <div className="signin-section flex">
            <div className='image' style={{ backgroundImage: `url(${ecommerce?.src})`, width: "60%" }}></div>
            <div className='form py-7'>
                <form onSubmit={formik.handleSubmit} className='signin-form p-5'>
                    <p className='text-xl font-bold uppercase text-center' style={{color:"#025305"}}>Login</p>
                    <div className="email-field pt-3">
                        <label htmlFor="email" className="email-label">Email <span className="star">*</span> </label>
                        <input className='email-input' type="email" id='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik?.values?.email} placeholder='Enter email' />
                        {formik?.touched?.email && <p className="error">{formik?.errors?.email}</p>}
                    </div>
                    <div className="password-field pt-3">
                        <label htmlFor="password" className="password-label">Password <span className="star">*</span> </label>
                        <input className='password-input' type="password" id='password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik?.values?.password} placeholder='Enter password' />
                        <Link className='items-right text-sm text-right' style={{color:"rgb(40 103 196)"}} prefetch={false} href={"#"}> <p>Forget Password?</p></Link>
                        {formik?.touched?.password&&<p className="error ">{formik?.errors?.password}</p>}
                    </div>
                    <div className="capcha-image pt-3">
                        <label>Capcha:</label>
                        <div className='flex'>
                            <div style={{ width: "150px", height: "30px", marginBlock: "5px" }}>
                                <LoadCanvasTemplateNoReload />
                            </div>
                            <button className='reload-capcha mx-4 ' onClick={() => loadCaptchaEnginge(6)}><AiOutlineReload size={20} fontWeight={500} /></button>
                        </div>
                    </div>
                    <div className="capcha-field py-3">
                        <label htmlFor="capcha" className="capcha-label">Enter Capcha <span className="star">*</span> </label>
                        <input className='capcha-input' type="text" id='capcha' name='capcha' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik?.values?.capcha} placeholder='Enter capcha' />
                        {capchaError ? <p className="error">Capcha doesn't match</p> : null}
                        {formik?.touched?.capcha && !capchaError && <p className="error ">{formik?.errors?.capcha}</p>}

                    </div>
                    <button type='submit' className='signin-btn w-full mx-auto'>Sigin</button>
                    <p className='text-sm text-center py-4'>Not have an account? <Link prefetch={false} href={"/register"} style={{color:"rgb(40 103 196)"}}>click here</Link></p>
                </form>
                
            </div>
        </div>
    )
}

export default SingInForm;