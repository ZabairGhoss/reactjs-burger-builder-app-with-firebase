import React, { useEffect, useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assests/burger-logo.png';
import '../styles/navbar.css';
import { UserAuth } from './contexts/AuthContext';


const CustomNavbar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);  //false : Recommended
  const navigate = useNavigate();
  const {currentUser, logoutUser} = UserAuth();


  const handleLogout = async () =>{
    try {
      console.log('Logging-out user!');
      // setIsLoading(true);
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.log("error:" + error);
    }
  }

  const handleClick = () => {
    if(isUserLoggedIn){
      handleLogout();
    } else{
      console.log('User Trying to Login');
    }
  }

  useEffect(() =>{
  if(currentUser?.uid){
    setIsUserLoggedIn(true);
    // navigate('/'); 
  }else{
    setIsUserLoggedIn(false);
    // navigate('/checkout');          ---------------------------------------------------------------------------
  }
},[currentUser]);


  return (
    <div className='custom-navbar-container'>
    <Navbar collapseOnSelect expand="lg" className='custom-navbar' fixed='top'>
      <Container>
        <Navbar.Brand>
        <NavLink to="/">
          <div className='burger-builder-logo-container'>
            <img src={logo} alt='burger builder' className='burger-bilder-logo' />
          </div>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <NavLink to='/' className='custom-nav-link'> Burger Builder</NavLink>
            {isUserLoggedIn && 
              <NavLink to="/orders" className='custom-nav-link'>Order</NavLink>
            }
              <NavLink to='/auth' className='custom-nav-link' onClick={() => handleClick()}>{ isUserLoggedIn ? 'Logout' : 'Login'}</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default CustomNavbar;
