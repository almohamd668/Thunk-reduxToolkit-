import React, { Fragment, useEffect, useState } from "react";
import { deleteBook, getBooks } from "../../store/bookSlice";

import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import "./book.css";
import { useDispatch, useSelector } from "react-redux";

const PostContainer = () => {
   
  const [slectedBook, setSelectedBook] = useState({});
   
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const { isLoading, books } = useSelector((state) => state.books);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const getBookId = (id) => {
    const selectBook = books.find((item) => item.id === id)
    setSelectedBook((prev) => { 
      
      return  { ...prev,...selectBook} 
    });
    
  };

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList
            isLoading={isLoading}
            books={books}
            isLoggedIn={isLoggedIn}
            deleteBook={deleteBook}
            dispatch={dispatch}
            getBookId={getBookId}
          />
        </div>
        <div className="col side-line">
          <BookInfo info={slectedBook}/>
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
