import React from 'react';
import './BasketStyle.css'

export default function Basket(props) {

  const { cartItems, onAdd, onRemove } = props;
  
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 70;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  // const [ saveItems, setSaveItems ] = useState([]);
  // const onSubmitHandler = async (e) => {
  //   e.preventDefault();

  //   const result = await setSaveItems(saveItems);
  //   setItems(items=> [...items, result]);
  // }


  return (
    <aside className="blockCart col-1">
      <h2 className="h2">Cart Items</h2>
      <br></br>
      
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item._id} className="row">
            <div className="col-2">{item.title}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{' '}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            <div className="col-2 text-right">
              {/* {item.qty} x ₹{item.price.toFixed(2)} */}
              ₹{item.qty*item.price.toFixed(2)}            
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <br></br>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">₹{itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">₹{taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
              ₹{shippingPrice.toFixed(2)}
              </div>
            </div>
            
            <br></br>
            <hr></hr>
            <div className="row">
              <div className="col-2">
              <h2 className="h2">Total Price</h2>
              </div>
              <div className="col-1 text-right">
              <h2 className="h2">₹{totalPrice.toFixed(2)}</h2>
              </div>
            </div>
            <hr />
            <div className="buttonRow">
              <button onClick={() => alert('need to implement this')} className="checkoutButton">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
