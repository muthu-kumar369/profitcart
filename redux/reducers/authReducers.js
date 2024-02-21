const { createSlice } = require("@reduxjs/toolkit");


const initialState={
    isAuthtenticate:false,
    userDetails:null,
    token:null,
    addressData:null
}

export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login (state,payload){
            console.log("I am in slices");
            state.isAuthtenticate=true;
            state.userDetails=payload?.payload;
            state.token=payload?.payload?.token;
        },
        logout(state){
            state.isAuthtenticate=false;
            state.userDetails=null;
            state.token=null;
        },
        addressDataAction:(state,payload)=>{
            state.addressData=payload?.payload;
        }
    },
    extraReducers(builder){
        
    }
});

export const {login , logout,addressDataAction}=authSlice.actions; 
export default authSlice.reducer;