import {
  createSlice,
  createAsyncThunk,
} from "../../node_modules/@reduxjs/toolkit/dist/index";
import { logInsert } from "./reportSlice";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await fetch("http://localhost:9000/books"),
        data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (bookData, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    try {
      bookData.userName = getState().auth.name;
      const res = await fetch("http://localhost:9000/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      const data = await res.json();

      // you can dispatch action or thunk here 
      dispatch(logInsert({name: "insertBook", status: "success"}))
      return data;
    } catch (error) {
      dispatch(logInsert({name: "insertBook", status: "failed"}))
      return rejectWithValue(error.massage);
    }
  }
);


export const deleteBook = createAsyncThunk(
  "book/deleteBook",

  async (item,thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
     
        await fetch(`http://localhost:9000/books/${item.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      
      return item;
    } catch (error) {
      return rejectWithValue(error.massage);
    }
  }
);

// @ts-ignore
const bookSlice = createSlice({
  name: "book",
  initialState: { books: [], isLoading: false, error: null },
  extraReducers: {
    // get books
    // @ts-ignore
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    // @ts-ignore
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    // @ts-ignore
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // insert book
    [insertBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [insertBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    },
    [insertBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

      //delate book




    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((el) => el.id !== action.payload.id)
      
    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

  },
});

export default bookSlice.reducer;
