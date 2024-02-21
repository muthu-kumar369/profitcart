"use client";
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha, LoadCanvasTemplateNoReload } from "react-simple-captcha";
import { AiOutlineReload } from "react-icons/ai";
import ecommerce from "../../../public/images/ecommerce1.jpg"
import Link from 'next/link';

const siginSchema = yup.object().shape({
    name:yup.string().required("User Name is required"),
    email: yup.string().email("Invalid email address").required("Email is required!").matches(
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Invalid email address"
    ),
    password: yup.string().required("Password required").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    confirmpassword:yup.string().required("Cofirm password is required").oneOf([yup.ref('password'),null],"Password must need to mach"),
    capcha: yup.string().required("Capcha required")
})

function RegisterForm({handleRegister}) {
    const [capchaError, setCapchaError] = useState(false);
    const formik = useFormik({
        initialValues: {
            name:"",
            email: "",
            password: "",
            confirmpassword:"",
            capcha: ""
        },
        validationSchema: () => siginSchema,
        onSubmit: (values,{resetForm}) => {
            console.log(values);
            if (validateCaptcha(values?.capcha, false) === true) {
                setCapchaError(false)
                handleRegister(values);
                resetForm();
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
            <div className='form register py-7'>
                <form onSubmit={formik.handleSubmit} className='signin-form p-5'>
                <p className='text-xl font-bold uppercase text-center' style={{color:"#025305"}}>Register</p>
                <div className="username-field pt-3">
                        <label htmlFor="username" className="username-label">User Name <span className="star">*</span> </label>
                        <input className='username-input' type="username" id='name' name='name' onChange={formik.handleChange} onBlur={formik?.handleBlur} value={formik?.values?.name} placeholder='Enter User Name' />
                        {formik?.touched?.name && <p className="error">{formik?.errors?.name}</p>}
                    </div>
                    <div className="email-field pt-3">
                        <label htmlFor="email" className="email-label">Email <span className="star">*</span> </label>
                        <input className='email-input' type="email" id='email' name='email' onChange={formik.handleChange} onBlur={formik?.handleBlur} value={formik?.values?.email} placeholder='Enter email' />
                        {formik?.touched?.email && <p className="error">{formik?.errors?.email}</p>}
                    </div>
                    <div className="password-field pt-3">
                        <label htmlFor="password" className="password-label">Password <span className="star">*</span> </label>
                        <input className='password-input' type="text" id='password' name='password' onChange={formik.handleChange} onBlur={formik?.handleBlur} value={formik?.values?.password} placeholder='Enter password' />
                        {formik?.touched?.password && <p className="error ">{formik?.errors?.password}</p>}
                    </div>
                    <div className="confirmpassword-field pt-3">
                        <label htmlFor="confirmpassword" className="confirmpassword-label">Confirm Password <span className="star">*</span> </label>
                        <input className='confirmpassword-input' type="text" id='confirmpassword' name='confirmpassword' onChange={formik.handleChange} onBlur={formik?.handleBlur} value={formik?.values?.confirmpassword} placeholder='Enter Confirm Password' />
                        {formik?.touched?.confirmpassword && <p className="error ">{formik?.errors?.confirmpassword}</p>}
                    </div>
                    <div className="capcha-image pt-3">
                        <label>Capcha:</label>
                        <div className='flex'>
                            <div style={{width:"150px",height:"30px",marginBlock:"5px"}}>
                                <LoadCanvasTemplateNoReload />
                            </div>
                            <button className='reload-capcha mx-4 ' onClick={() => loadCaptchaEnginge(6)}><AiOutlineReload size={20} fontWeight={500}/></button>
                        </div>
                    </div>
                    <div className="capcha-field py-3">
                        <label htmlFor="capcha" className="capcha-label">Enter Capcha <span className="star">*</span> </label>
                        <input className='capcha-input' type="text" id='capcha' name='capcha' onChange={formik.handleChange} onBlur={formik?.handleBlur} value={formik?.values?.capcha} placeholder='Enter capcha' />
                        {capchaError ? <p className="error">Capcha doesn't match</p> : null}
                        {formik?.touched?.capcha && !capchaError && <p className="error ">{formik?.errors?.capcha }</p>}

                    </div>
                    <button type='submit' className='signin-btn w-full mx-auto'>Register</button>
                    <p className='text-sm text-center py-4'>Already have an account? <Link prefetch={false} href={"/signin"} style={{color:"rgb(40 103 196)"}}>click here</Link></p>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm;