import React from 'react'
import '../styles/builder-control.css';

const  BuilderControl = (props) => {
  const isUserLoggedIn = props.burgerBuilderProps.isUserLoggedIn;
  const isIngredients = props.burgerBuilderProps.isIngredients;
  const totalPrice = props.burgerBuilderProps.totalPrice;
  const isLettusDisabled = props.burgerBuilderProps.isLettusDisabled;
  const isBaconDisabled = props.burgerBuilderProps.isBaconDisabled;
  const isCheeseDisabled = props.burgerBuilderProps.isCheeseDisabled;
  const isMeatDisabled = props.burgerBuilderProps.isMeatDisabled;  
  const hanldeAddLettuce = props.burgerBuilderProps.hanldeAddLettuce;
  const hanldeRemoveLettuce = props.burgerBuilderProps.hanldeRemoveLettuce;
  const hanldeAddBacon = props.burgerBuilderProps.hanldeAddBacon;
  const hanldeRemoveBacon = props.burgerBuilderProps.hanldeRemoveBacon;
  const hanldeAddCheese = props.burgerBuilderProps.hanldeAddCheese;
  const handleRemoveCheese = props.burgerBuilderProps.handleRemoveCheese;
  const hanldeAddMeat = props.burgerBuilderProps.hanldeAddMeat;
  const handleRemoveMeat = props.burgerBuilderProps.handleRemoveMeat;
  const handleOrder = props.burgerBuilderProps.handleOrder; 

  return (
        <div className="builder-control-container">
        <p>
          Current Price: <strong>$ {totalPrice}</strong>
        </p>
        <div className="builder-control-item">
          <div className="builder-item-label">Lettuce</div>
          <button
            disabled={isLettusDisabled}
            className={`builder-control-btn builder-control-less-btn ${
              isLettusDisabled && "custom-disabled"
            }`}
            onClick={() => hanldeRemoveLettuce()}
          >
            Less
          </button>
          <button
            className="builder-control-btn builder-control-more-btn"
            onClick={() => hanldeAddLettuce()}
          >
            More
          </button>
        </div>
        <div className="builder-control-item">
          <div className="builder-item-label">Bacon</div>
          <button
            disabled={isBaconDisabled}
            className={`builder-control-btn builder-control-less-btn ${
              isBaconDisabled && "custom-disabled"
            }`}
            onClick={() => hanldeRemoveBacon()}
          >
            Less
          </button>
          <button
            className="builder-control-btn builder-control-more-btn"
            onClick={() =>hanldeAddBacon()}
          >
            More
          </button>
        </div>
        <div className="builder-control-item">
          <div className="builder-item-label">Cheese</div>
          <button
            disabled={isCheeseDisabled}
            className={`builder-control-btn builder-control-less-btn ${
              isCheeseDisabled && "custom-disabled"
            }`}
            onClick={() => handleRemoveCheese()}
          >
            Less
          </button>
          <button
            className="builder-control-btn builder-control-more-btn"
            onClick={() => hanldeAddCheese()}
          >
            More
          </button>
        </div>
        <div className="builder-control-item">
          <div className="builder-item-label">Meat</div>
          <button
            disabled={isMeatDisabled}
            className={`builder-control-btn builder-control-less-btn ${
              isMeatDisabled && "custom-disabled"
            }`}
            onClick={() => handleRemoveMeat()}
          >
            Less
          </button>
          <button
            className="builder-control-btn builder-control-more-btn"
            onClick={() => hanldeAddMeat()}
          >
            More
          </button>
        </div>
        <button
        type='button'
          disabled={isIngredients}
          className={`burger-order-btn ${isIngredients && "custom-disabled"}`}
          onClick={() => handleOrder()}
        >
          {" "}
          
          {isUserLoggedIn ? 'order now' : 'sign up to order' }
        </button>
      
      </div> 
  )
}

export default BuilderControl;
