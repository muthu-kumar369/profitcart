const { configureStore } = require("@reduxjs/toolkit");
import authReducers from "../reducers/authReducers";
import productReducers from "../reducers/productReducers";

export  const store= configureStore({
    reducer:{
        auth:authReducers,
        product:productReducers,
    }
});