import { useState } from 'react';
import React from 'react';
import './Header/BasketStyle.css'
import styled from 'styled-components';

export default function Product(props) {
  const { product, onAdd, status, changeStatus, user, updateUser, item, setItem, items, setItems } = props;
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
              if (!product._id.endsWith("_" + user.name)) {
                product._id = product._id.replace(/_[^_]*$/, "") + "_" + user.name;
              }
              onAdd(product)
            } else {
              alert('Please Login!')
            }
          }}>
          <span data-title="YES!">ADD TO CART?</span>
        </button>
      </div>
    </div>

  );
}
