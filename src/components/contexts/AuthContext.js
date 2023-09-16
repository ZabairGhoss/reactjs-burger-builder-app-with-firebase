import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, onSnapshot, query, addDoc } from "firebase/firestore";

export const UserContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [orderState, setOrderState] = useState({
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
    price: 0,
  });
  const [orders, setOrders] = useState([]);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signinUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  const handleOrderState = (orderData) => {
    if (currentUser) {
      setOrderState({ ...orderData });
    } else {
      console.log("User is not logged in");
    }
  };

  const createOrder = async (ingredients) => {
    let { bacon, cheese, lettuce, meat, price } = ingredients;

    try {
      const docRef = await addDoc(collection(db, "orders"), {
        bacon: bacon,
        cheese: cheese,
        lettuce: lettuce,
        meat: meat,
        price: price,
        userId: currentUser.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const addUser = async (userDetails) => {
    let { country, mode, email, name, street, zipcode } = userDetails;

    console.log("User Details:", userDetails);
    console.log("Current User Id:", currentUser.uid);

    try {
      const docRef = await addDoc(collection(db, "users"), {
        country: country,
        deliveryMode: mode,
        email: email,
        id: currentUser.uid,
        name: name,
        street: street,
        zipcode: zipcode,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchOrders = () => {
    const getQuery = query(collection(db, "orders"));
    const unsubscribe = onSnapshot(getQuery, (querySnapshot) => {
      let ordersArr = [];
      querySnapshot.forEach((order) => {
        ordersArr.push({ ...order.data(), id: order.id });
      });
      setOrders(ordersArr);
    });

    return () => unsubscribe();
  };

  const value = {
    currentUser,
    orderState,
    orders,
    createUser,
    logoutUser,
    signinUser,
    createOrder,
    addUser,
    handleOrderState,
    setOrderState,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Received User:", user?.uid);
      setCurrentUser(user);
      fetchOrders();
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser, orderState]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
