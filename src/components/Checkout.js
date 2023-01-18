import React, { useEffect, useState } from "react";
import Burger from "./Burger";
import "../styles/checkout-styles.css";
import { UserAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { orderState, setOrderState, createOrder, addUser } = UserAuth();
  const [showUserDataForm, setShowUserDataForm] = useState(false);
  const [isUserDataSet, setIsUserDataSet] = useState(true);
  const [error, setError] = useState({
    nameError: "",
    streetError: "",
    zipcodeError: "",
    countryError: "",
    emailError: "",
  });

  const [userDetails, setUserDetails] = useState({
    name: "",
    street: "",
    zipcode: "",
    country: "",
    email: "",
    mode: "",
  });

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [totalPrice, setTotalPrice] = useState(orderState.price);
  const [isIngredients, setIsIngredients] = useState(false);
  const [localUserOrder, setLocalUserOrder] = useState({});

  const [ingredients, setIngredients] = useState({
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
    price: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    switch (name) {
      case "name":
        if (value.length === 0) {
          setError({
            ...error,
            nameError: "Please enter a valid Name",
          });
          // setName("");
          setUserDetails({ ...userDetails, name: "" });
          setIsUserDataSet(true);
        } else {
          setError({
            ...error,
            nameError: "",
          });
          // setName(e.target.value);
          setUserDetails({ ...userDetails, name: e.target.value });
          setIsUserDataSet(false);
        }
        break;
      case "street":
        if (value.length === 0) {
          setError({
            ...error,
            streetError: "Please enter a valid Street",
          });
          // setStreet("");
          setUserDetails({ ...userDetails, street: "" });
          setIsUserDataSet(true);
        } else {
          setError({
            ...error,
            streetError: "",
          });
          // setStreet(e.target.value);
          setUserDetails({ ...userDetails, street: e.target.value });
          setIsUserDataSet(false);
        }

        break;
      case "zipcode":
        if (value.length === 0) {
          setError({
            ...error,
            zipcodeError: "Please enter a valid Zipcode",
          });
          // setZipcode("");
          setUserDetails({ ...userDetails, zipcode: "" });
          setIsUserDataSet(true);
        } else {
          setError({
            ...error,
            zipcodeError: "",
          });
          // setZipcode(e.target.value);
          setUserDetails({ ...userDetails, zipcode: e.target.value });
          setIsUserDataSet(false);
        }
        break;
      case "country":
        if (value.length === 0) {
          setError({
            ...error,
            countryError: "Please enter a valid Country",
          });
          // setCountry("");
          setUserDetails({ ...userDetails, country: "" });
          setIsUserDataSet(true);
        } else {
          setError({
            ...error,
            countryError: "",
          });
          // setCountry(e.target.value);
          setUserDetails({ ...userDetails, country: e.target.value });
          setIsUserDataSet(false);
        }
        break;
      case "email":
        if (value.length === 0) {
          setError({
            ...error,
            emailError: "Please enter a valid Email",
          });
          // setEmail("");
          setUserDetails({ ...userDetails, email: "" });
          setIsUserDataSet(true);
        } else {
          setError({
            ...error,
            emailError: "",
          });
          // setEmail(e.target.value);
          setUserDetails({ ...userDetails, email: e.target.value });
          setIsUserDataSet(false);
        }
        break;
      case "mode":
        // setMode(e.target.value);
        setUserDetails({ ...userDetails, mode: e.target.value });
        setIsUserDataSet(false);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    console.log("Submitting!");

    console.log("User Details:", userDetails);
    createOrder(ingredients);
    console.log("User Order Ingredient:", ingredients);
    addUser(userDetails);
    navigate("/");

    setUserDetails({
      name: "",
      street: "",
      zipcode: "",
      country: "",
      email: "",
      mode: "fastest",
    });
  };

  const handleCancel = () => {
    setShowUserDataForm(false);
    navigate(-1);
  };

  const getLocalStorageData = () => {
    let userOrder = {};
    userOrder = JSON.parse(localStorage.getItem("loggedout-user-ingredients"));
    console.log("UserOrder have:", { ...userOrder });
    setLocalUserOrder({ ...userOrder });

    if (userOrder?.price) {
      console.log("Setting loggedOut user Order!", { ...userOrder });
      // setIngredients({
      //   lettuce: userOrder?.lettuce,
      //   bacon: userOrder?.bacon,
      //   cheese: userOrder?.cheese,
      //   meat: userOrder?.meat,
      //   price: userOrder?.price,
      // });
      setIngredients({ ...userOrder });
      localStorage.removeItem("loggedout-user-ingredients");
    } else {
      console.log("Setting Logged-In user Order!", { ...orderState });
      setIngredients({
        lettuce: orderState?.lettuce,
        bacon: orderState?.bacon,
        cheese: orderState?.cheese,
        meat: orderState?.meat,
        price: orderState?.price,
      });

      setOrderState({
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
        price: 0,
      });
    }
  };

  useEffect(() => {
    getLocalStorageData();
  }, []);

  const burgerProps = {
    isUserLoggedIn,
    totalPrice,
    isIngredients,
    ingredients,
  };

  return (
    <div className="check-out-container">
      <div className="check-out-summary-sec">
        <h1>We hope it tastes well!</h1>
        <div className="check-out-summary-burger-conatiner">
          <Burger burgerProps={burgerProps} />
        </div>
        <button
          className="check-out-action-btn check-out-action-cancel-btn"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        <button
          className="check-out-action-btn check-out-action-continue-btn"
          onClick={() => setShowUserDataForm(true)}
        >
          Continue
        </button>
        <div
          className={
            showUserDataForm ? "order-form-visible" : "user-data-form-container"
          }
        >
          <h4>Enter your Contact Data</h4>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-group">
              <label className="input-group-label"></label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={userDetails.name}
                // value={name}
                onChange={(e) => handleChange(e)}
                className="input-group-input"
              />
              {error?.nameError && (
                <div className="error-container">{error?.nameError}</div>
              )}
            </div>
            <div className="input-group">
              <label className="input-group-label"></label>
              <input
                type="text"
                name="street"
                placeholder="Street"
                // value={street}
                value={userDetails.street}
                onChange={(e) => handleChange(e)}
                className="input-group-input"
              />
              {error?.streetError && (
                <div className="error-container">{error?.streetError}</div>
              )}
            </div>
            <div className="input-group">
              <label className="input-group-label"></label>
              <input
                type="text"
                name="zipcode"
                placeholder="Zip Code"
                // value={zipcode}
                value={userDetails.zipcode}
                onChange={(e) => handleChange(e)}
                className="input-group-input"
              />
              {error?.zipcodeError && (
                <div className="error-container">{error?.zipcodeError}</div>
              )}
            </div>
            <div className="input-group">
              <label className="input-group-label"></label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                // value={country}
                value={userDetails.country}
                onChange={(e) => handleChange(e)}
                className="input-group-input"
              />
              {error?.countryError && (
                <div className="error-container">{error?.countryError}</div>
              )}
            </div>
            <div className="input-group">
              <label className="input-group-label"></label>
              <input
                type="email"
                name="email"
                placeholder="email"
                required
                // value={email}
                value={userDetails.email}
                onChange={(e) => handleChange(e)}
                className="input-group-input"
              />
              {error?.emailError && (
                <div className="error-container">{error?.emailError}</div>
              )}
            </div>
            <div className="input-group">
              <label className="input-group-label"></label>
              <select
                // defaultValue="fastest"
                name="mode"
                // value={mode}
                value={userDetails.mode}
                className="input-group-select"
                onChange={(e) => handleChange(e)}
              >
                <option value="fastest" selected>
                  Fastest
                </option>
                <option value="Cheapest">Cheapest</option>
              </select>
            </div>
            <button
              disabled={isUserDataSet}
              className="order-btn"
              // onClick={() => createOrder()}
            >
              order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
