import React from "react";
const BookInfo = ({ info }) => {

  return (
    <>
      <h2>Book Details</h2>
      { Object.keys(info).length > 0 ? (
        <div>
          <p className="fw-bold">Title: {info.title}</p>
          <p className="fw-bold">Inserted by: {info.userName}</p>
          <p className="fw-light">Description: {info.description}</p>
          <p className="fst-italic">Price: {info.price}</p>
        </div>
      ) : (
        <div className="alert alert-secondary" role="alert">
          There is no book selected yet. Please select!
        </div>
      )}
    </>
  );
};

export default BookInfo;
