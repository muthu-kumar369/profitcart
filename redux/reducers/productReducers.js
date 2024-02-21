import { createSlice } from "@reduxjs/toolkit";

const initialState={
    topDiscount:null,
    combo:null,
    brand:null,
    typeWear:null,
    search:null,
    cartPrdouctIds:null,
    wishlistProducts:null,
    wishlistProdcutIds:null

}

export const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        topDiscountAction:(state,payload)=>{
            state.topDiscount=payload?.payload
        },
        comboAction:(state,payload)=>{
            state.combo=payload?.payload
        },
        brandAction:(state,payload)=>{
            state.brand=payload?.payload;
        },
        typeWearAction:(state,payload)=>{
            state.typeWear=payload?.payload;
        },
        searchAction:(state,payload)=>{
            state.search=payload?.payload
        },
        cartPrdouctIdsAction:(state,payload)=>{
            state.cartPrdouctIds=payload?.payload
        },
        wishlistAction:(state,payload)=>{
            state.wishlistProducts=payload?.payload
        },
        wishlistProdcutIdsAction: (state, payload) => {
            state.wishlistProdcutIds=payload?.payload
        }
    }

})

export const {topDiscountAction,comboAction,brandAction,typeWearAction,searchAction, cartPrdouctIdsAction,wishlistAction,wishlistProdcutIdsAction}=productSlice.actions;
export default productSlice.reducer;