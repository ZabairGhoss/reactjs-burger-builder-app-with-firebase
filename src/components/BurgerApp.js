import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/burger.css";
import { UserAuth } from "../components/contexts/AuthContext";
import BuilderControl from "./BuilderControl";
import Burger from "./Burger";

const BurgerApp = () => {
  const { currentUser, handleOrderState } = UserAuth();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isIngredients, setIsIngredients] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLettusDisabled, setIsLettusDisabled] = useState(false);
  const [isBaconDisabled, setIsBaconDisabled] = useState(false);
  const [isCheeseDisabled, setIsCheeseDisabled] = useState(false);
  const [isMeatDisabled, setIsMeatDisabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localOrder, setLocalOrder] = useState({
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
    price: 0,
  });

  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState({
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });

  const hanldeAddLettuce = () => {
    setIngredients({ ...ingredients, lettuce: ingredients.lettuce + 1 });
  };

  const hanldeRemoveLettuce = () => {
    setIngredients({ ...ingredients, lettuce: ingredients.lettuce - 1 });
  };

  const hanldeAddBacon = () => {
    setIngredients({ ...ingredients, bacon: ingredients.bacon + 1 });
  };

  const hanldeRemoveBacon = () => {
    setIngredients({ ...ingredients, bacon: ingredients.bacon - 1 });
  };

  const hanldeAddCheese = () => {
    setIngredients({ ...ingredients, cheese: ingredients.cheese + 1 });
  };

  const handleRemoveCheese = () => {
    setIngredients({ ...ingredients, cheese: ingredients.cheese - 1 });
  };

  const hanldeAddMeat = () => {
    setIngredients({ ...ingredients, meat: ingredients.meat + 1 });
  };

  const handleRemoveMeat = () => {
    setIngredients({ ...ingredients, meat: ingredients.meat - 1 });
  };

  const handlePrice = () => {
    setTotalPrice(
      1.5 * ingredients.lettuce +
        1.75 * ingredients.bacon +
        2.25 * ingredients.cheese +
        2.75 * ingredients.meat +
        3.0
    );
  };

  const checkIngredients = () => {
    if (
      ingredients.lettuce > 0 ||
      ingredients.bacon > 0 ||
      ingredients.cheese > 0 ||
      ingredients.meat > 0
    ) {
      setIsIngredients(false);
    } else {
      setIsIngredients(true);
    }

    if (ingredients.lettuce === 0) {
      setIsLettusDisabled(true);
    } else {
      setIsLettusDisabled(false);
    }

    if (ingredients.bacon === 0) {
      setIsBaconDisabled(true);
    } else {
      setIsBaconDisabled(false);
    }

    if (ingredients.cheese === 0) {
      setIsCheeseDisabled(true);
    } else {
      setIsCheeseDisabled(false);
    }

    if (ingredients.meat === 0) {
      setIsMeatDisabled(true);
    } else {
      setIsMeatDisabled(false);
    }
  };

  const populateLocalStorage = (data) => {
    console.log("Local Storage Data here:", { ...data });
    localStorage.setItem("loggedout-user-ingredients", JSON.stringify(data));
  };

  const handleOrder = () => {
    if (isUserLoggedIn) {
      setIsModalVisible(true);
      handleOrderState({
        lettuce: ingredients.lettuce,
        bacon: ingredients.bacon,
        cheese: ingredients.cheese,
        meat: ingredients.meat,
        price: totalPrice,
      });
      localStorage.removeItem('loggedout-user-ingredients');
    } else {
      console.log("You don't have Account? Please Register Or Sign-in!");

      setLocalOrder({
        lettuce: ingredients.lettuce,
        bacon: ingredients.bacon,
        cheese: ingredients.cheese,
        meat: ingredients.meat,
        price: totalPrice,
      });
      navigate("/auth");
      populateLocalStorage({
        lettuce: ingredients.lettuce,
        bacon: ingredients.bacon,
        cheese: ingredients.cheese,
        meat: ingredients.meat,
        price: totalPrice,
      });
      setIsModalVisible(false);
    }
  };

  const handleContinue = () => {
    navigate("/checkout");
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    checkIngredients();
    handlePrice();
    if (currentUser?.uid) {
      setIsUserLoggedIn(true);
      // console.log("Current User is", currentUser?.uid);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [currentUser, ingredients]);

  const burgerProps = {
    isUserLoggedIn,
    totalPrice,
    isIngredients,
    ingredients,
    isModalVisible,
    handleModalClose,
    handleContinue,
  };

  const burgerBuilderProps = {
    isUserLoggedIn,
    isIngredients,
    totalPrice,
    isLettusDisabled,
    isCheeseDisabled,
    isBaconDisabled,
    isMeatDisabled,
    hanldeAddLettuce,
    hanldeRemoveLettuce,
    hanldeAddBacon,
    hanldeRemoveBacon,
    hanldeAddCheese,
    handleRemoveCheese,
    hanldeAddMeat,
    handleRemoveMeat,
    handleOrder,
  };

  return (
    <div>
      <Burger burgerProps={burgerProps} />
      <BuilderControl burgerBuilderProps={burgerBuilderProps} />
    </div>
  );
};

export default BurgerApp;
