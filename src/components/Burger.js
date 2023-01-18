import React from "react";
import "../styles/burger.css";
import Modal from "react-bootstrap/Modal";

const Burger = (props) => {
  const totalPrice = props.burgerProps.totalPrice;
  const modalVisible = props.burgerProps.isModalVisible;
  const handleModalClose = props.burgerProps.handleModalClose;
  const handleContinue = props.burgerProps.handleContinue;
  const ingredients = props.burgerProps.ingredients;

  const handleBurger = () => {
    let burger = [];

    for (let i = 0; i < ingredients.lettuce; i++) {
      burger.push(<div key={i} className="burger-ingredient-lettuce"></div>);
    }

    for (let i = 0; i < ingredients.bacon; i++) {
      burger.push(
        <div key={i + 100} className="burger-ingredient-bacon"></div>
      );
    }

    for (let i = 0; i < ingredients.cheese; i++) {
      burger.push(
        <div key={i + 200} className="burger-ingredient-cheese"></div>
      );
    }
    for (let i = 0; i < ingredients.meat; i++) {
      burger.push(<div key={i + 300} className="burger-ingredient-meat"></div>);
    }

    if (
      ingredients.lettuce === 0 &&
      ingredients.bacon === 0 &&
      ingredients.cheese === 0 &&
      ingredients.meat === 0
    ) {
      burger.push(
        <p>
          <strong>No Ingredients Added</strong>
        </p>
      );
    }

    return burger;
  };

  return (
    <>
      <div className="burger-container">
        <Modal show={modalVisible} centered>
          <Modal.Body>
            <div>
              <p>
                <strong>Your Order Summary:</strong>
              </p>

              <ul>
                <li key={1}>Lettuce: {ingredients.lettuce}</li>
                <li key={2}>Bacon: {ingredients.bacon}</li>
                <li key={3}>Cheese: {ingredients.cheese}</li>
                <li key={4}>Meat: {ingredients.meat}</li>
              </ul>

              <p>
                <strong>{`Total Price: $ ${totalPrice}`}</strong>
              </p>
              <p>Continue to checkout?</p>
              <button
                className="check-out-action-btn check-out-action-cancel-btn"
                onClick={() => handleModalClose()}
              >
                Cancel
              </button>
              <button
                className="check-out-action-btn check-out-action-continue-btn"
                onClick={() => handleContinue()}
              >
                Continue
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <div className="buger-patties-container">
          <div className="burger-ingredient-bread-top">
            <div className="burger-ingredient-Seeds1"></div>
            <div className="burger-ingredient-Seeds2"></div>
          </div>

          {handleBurger()}
          <div className="burger-ingredient-bread-bottom"></div>
        </div>
      </div>
    </>
  );
};

export default Burger;
