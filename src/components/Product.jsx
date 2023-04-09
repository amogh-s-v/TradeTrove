import {useState } from 'react';
import React from 'react';
import './Header/BasketStyle.css'
import styled from 'styled-components';

export default function Product(props) {
  const { product, onAdd, status, changeStatus, user, updateUser, item, setItem, items, setItems } = props;
  const SidebarNav = styled.nav`
  background: #15171c;
  width:500px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;
const [sidebar, setSidebar] = useState(false);

const showSidebar = () => setSidebar(!sidebar);
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      
        <a className="block relative h-48 rounded overflow-hidden">
          <img className="object-cover object-center w-full h-full block" src={product.image} alt={product.title} />
        </a>
        <div className="mt-4">
          <h3 className="text-white title-font text-lg font-medium">{product.title}</h3>
          <p className="mt-1">₹{product.price}</p>
          <button 
          className="addtocartButton" 
          onClick={() => {
            if(user && user._id)
            {
              product._id = product._id + user.name;
              onAdd(product)
            }else{
              alert('Please Login!')
            }
            }}>
          <span data-title="YES!">ADD TO CART?</span>
          </button>
        </div>
    </div>
    
  );
}
