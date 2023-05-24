import { createSlice } from "../../node_modules/@reduxjs/toolkit/dist/index";





const reportSlice = createSlice({
    name: "report", 
    initialState: {logs:[]},
    reducers: {
        logInsert: (state, action) => {
          state.logs.push(action.payload);
        }
        
    }

})
export const {logInsert} = reportSlice.actions;

export default reportSlice.reducer;