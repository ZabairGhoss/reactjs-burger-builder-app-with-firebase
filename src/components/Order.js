import React, { useEffect, useState } from "react";
import '../styles/order-styles.css';
import { UserAuth } from "./contexts/AuthContext";


const Order = () => {
  const [userOrders, setUserOrders] = useState([]);
  const {orders, currentUser} = UserAuth();
  const [isOrders, setIsOrders] = useState(false);

  useEffect(()=> {
    console.log('Setting User Orders...');
    let currentUserOrders = orders.filter((order)=> order.userId === currentUser.uid);   //Check for if the current user have placed any Order --> !== for others orders than this current user
    console.log('Current User Orders:', currentUserOrders);
    if(currentUserOrders.length === 0){
      setIsOrders(true);
    } else{
      setIsOrders(false);
    }
     setUserOrders([...currentUserOrders]);
  }, [orders]);


  return (
    <div className="order-sec-container">
    {
      userOrders.map((order) => {
            return (
            <div className="order-item-container" key={order?.id}>
                <div className="order-item">
                    <p>Ingredients: 
                        <span className="order-ingredient">Bacon ({order?.bacon})</span>
                        <span className="order-ingredient">Cheese ({order?.cheese}) </span>
                        <span className="order-ingredient">Lettuce ({order?.lettuce}) </span>
                        <span className="order-ingredient">Meat ({order?.meat}) </span>
                    </p>
                    <p>
                        Price:
                        <strong> USD  {order?.price}</strong>
                    </p>
                </div>
            </div>
            );
      
        })
    }
    {isOrders && <p><strong>You don't placed order(s) yet!</strong></p>}
    </div>)
}

export default Order;
