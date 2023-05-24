import React from "react";

const BooksList = ({getBookId , isLoading, books, isLoggedIn, deleteBook, dispatch }) => {
  const bookList = books.length
    ? books.map((item) => (
        <li
          className="list-group-item d-flex  justify-content-between align-items-center"
          key={item.id}
        >
          <div>{item.title}</div>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-primary" onClick={() => getBookId(item.id)}>
              Read
            </button>
            <button
              type="button"
              className="btn btn-danger"
              disabled={!isLoggedIn}
              onClick={() => dispatch(deleteBook(item))
              .unwrap()
              .then((data) =>{
                console.log(data);
              }).catch((error) =>{console.log(error);})}
            >
              Delete
            </button>
          </div>
        </li>
      ))
    : "there is no book available!";
  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? "loading ..." : <ul className="list-group">{bookList}</ul>}
    </div>
  );
};

export default BooksList;
