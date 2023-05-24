
import { createSlice } from "../../node_modules/@reduxjs/toolkit/dist/index";


const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false , name: "mohammed"},
    reducers: { 
        logInOut: (state) => {
        state.isLoggedIn = !state.isLoggedIn;
        }
        
    }
});

export const {logInOut} = authSlice.actions;

export default authSlice.reducer;