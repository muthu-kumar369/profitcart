"use client";
const { createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";
import Cookies from "js-cookie";
// import { useDispatch } from "react-redux";
import { login } from "../reducers/authReducers";


export const loginUser = createAsyncThunk("loginUser", async (credential) => {
    // const dispatch=useDispatch();
    try {
        console.log("Inside the thunk",credential);

        const res = await axios({
            method: "post",
            url: `${process.env.backend_domain}/user/login`,
            data: {
                email:credential?.email,
                password:credential?.password
            }
        }).catch(err => {
            return err.response.data
        });
        console.log(res);
        if (res.data.status == process.env.success) {
            Cookies.set("authtoken", res?.data.data.token, { secure: true, expires: 2 });
            credential.router.push("/");
            return res.data;
        } else {
            return res.data
        }

    } catch (error) {
        return {}
    }
})

export const logoutUser = createAsyncThunk("logoutUser", async (router) => {
    try {
        Cookies.remove("authtoken");
        router.push("/");
        return {};
    } catch (error) {
        console.log(error);
        return {}
    }
})

export const checkToken = createAsyncThunk("checkUser", async (data) => {
    try {
        const token = Cookies.get("authtoken");
        if (token) {
            const res = await axios({
                method: "get",
                url: `${process.env.backend_domain}/user/profile-details`,
                headers: {
                    Authorization: token
                }
            });
            // console.log(res);
            if (res?.data.status == process.env.success) {
                return res?.data?.data
            }
            return token;
        }
        if (data?.redirect) {
            data?.router.push("/signin");
        }
        return {};

    } catch (error) {
        console.log(error);
        return {};
    }
})