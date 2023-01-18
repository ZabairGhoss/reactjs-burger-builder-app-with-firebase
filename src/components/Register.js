import React, { useEffect, useState } from "react";
import "../styles/forms-styles.css";
import Alert from "react-bootstrap/Alert";
import { UserAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const {createUser, signinUser, currentUser} = UserAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [localUserData, setLocalUserData] = useState({});


  const handleChange = (e) => {
    let type = e.target.type;
    if (type === "email") {
      setError('');
      setUserEmail(e.target.value);
    } else if (type === "password") {
      setError('');
      setPassword(e.target.value);
    }
  };

  // const validateData = (userEmail, password) => {
  //   // let { userEmail, password } = data;
  //    console.log('Validating User Data!');

  //   console.log("Email" + userEmail);
  //   console.log("PSWD" + password);
  //   if (!userEmail) {
  //     setError("Email is required!");
  //   } else if (password.length < 6) {
  //     setError("Password must contain atleast 6 characters.");
  //   } else {
  //     setError("");

  //     // if (isLoggingIn) {
  //     //   console.log("User Sign-In" + userEmail + password);
  //     //   setUserEmail("");
  //     //   setPassword("");
  //     // } else {
  //     //   console.log("User Sign-Up" + userEmail + password);
  //     //   // signup(userEmail, password);
  //     //   setUserEmail("");
  //     //   setPassword("");
  //     // }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoggingIn) {
      console.log("User Sign-In" + userEmail + password);
      try {
        setError("");
        setIsLoading(true);
        await signinUser(userEmail, password);
          console.log('Navigating to Home!');
        //   navigate('/'); 
       } catch (error) {
        setError("Sign-in failed: wrong email or password!");
        console.log("error:" + error);
      }


    } else {
      console.log("User Sign-Up: Credentials=> " + userEmail + password);
      
      try {
        setError("");
        setIsLoading(true);
        await createUser(userEmail, password);
        setUserEmail("");
        setPassword("");
        // navigate('/');
      } catch (error) {
        if(error.code === 'auth/email-already-in-use'){
          setError("Email already exists!");
        } else{
          setError("Password should be at least 6 characters!");
        }
        console.log("error:" + error.code);
      }
      

    }

    setIsLoading(false);
  };

  const getLocalStorageData = () => {
    let userOrder = {};
    userOrder = JSON.parse(localStorage.getItem('loggedout-user-ingredients'))
    // console.log('UserOrder have:', {...userOrder});
    // setLocalUserOrder({...userOrder});
    setLocalUserData({...userOrder});
  }

useEffect(()=>{
getLocalStorageData();
console.log('Local Storage have:', {...localUserData});
  if(currentUser?.uid ){
    if(localUserData?.price){
      // console.log('check1: Checkout');  
      navigate('/checkout');
    } else{
      // console.log('Check 2: Home with Signed-In user');
      navigate('/');
    }
} 

else{
  console.log('Check 3: Home with Signed-In user with No Local Storage Data');
  // navigate('/');
}

}, [currentUser]);

  // useEffect(()=>{
  //   console.log('Order State =>>', orderState);
  //   if(orderState){
  //     // setTest(true);
  //   } else{
  //     // setTest(false);
  //   }
  // },[orderState]);

  return (
    <div className="registeration-sec-container">
      <div className="margin-top-hidded-div"></div>
      <div className="register-form-container">
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-group-container">
            <label className="input-label"></label>
            <input
              type="email"
              required
              className="input-element"
              placeholder="E-mail Address"
              value={userEmail}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-group-container">
            <label className="input-label"></label>
            <input
              type="password"
              className="input-element"
              placeholder="Password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button
            type="submit"
            className="submit-btn"
          >
            Submit
          </button>
        </form>
        <button
          className="register-sign-in-btn"
          onClick={() => setIsLoggingIn(!isLoggingIn)} 
          disabled={isLoading}
        >
          {isLoggingIn ? "Sign In" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default Register;
