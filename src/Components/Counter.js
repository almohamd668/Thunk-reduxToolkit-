// import {useEffect} from 'react';
import { useCallback, useEffect, useState } from "react";
import {
  useSelector,
  useDispatch,
} from "../../node_modules/react-redux/es/index";

//actions
import { increase, decrease } from "../store/bookSlice";
import { logIn, logOut } from "../store/authSlice";

const Counter = () => {
  const dispatch = useDispatch();

  const counterHandler = useCallback(
    (type, value) => {
      if (type === "increase") {
        dispatch(increase(value));
      } else {
        dispatch(decrease(value));
      }
    },
    [dispatch]
  );

  useEffect(() => counterHandler("increase", 5), [counterHandler]);

  const globalState = useSelector((state) => state);

  // const state = useSelector((state) => state.value);

  //  const toggleState = useSelector((state) => state.showCounter)

  //  const handlerCounterValue = (value) => {
  //    if (value < 1 ) {
  //      return "no number"
  //    }
  //    return value
  //  }

  //  const counterOperation  = useCallback((type , payload) => {
  //    dispatch({type , payload});
  //  },[dispatch])

  //  const toggleCounter = () => {
  //    dispatch({type: "toggleCounter"})
  //  }

  const isLoggedIn = () => {
    return globalState.auth.isLoggedIn;
  };

  const loginHandler = (status) => {
    if (status) {
      dispatch(logOut(5));
    } else {
      dispatch(logIn());
    }
  };

  return (
    <div className="App">
      <h1>Hello Redux Basic</h1>

      {isLoggedIn() && (
        <>
          <div className="counter">counter: {globalState.counter.value} </div>

          <div>
            <button
              className="btn"
              onClick={() => counterHandler("increase", 5)}
            >
              increase +
            </button>
            <button
              className="btn"
              onClick={() => counterHandler("decrease", 4)}
            >
              decrease -
            </button>
          </div>
        </>
      )}

      <div>
        <button className="btn" onClick={() => loginHandler(isLoggedIn())}>
          {isLoggedIn() ? "logout  " : "login"}
        </button>
      </div>
    </div>
  );
};

export default Counter;
