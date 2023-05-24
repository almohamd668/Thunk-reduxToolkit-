import { configureStore } from "../../node_modules/@reduxjs/toolkit/dist/index";
import auth from "./autherSlise"
import books from "./bookSlice";
import report from './reportSlice'

export default configureStore({
  reducer: { 
    books, auth, report
   },
});


