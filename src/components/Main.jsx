import React, { useRef } from "react";
import Product from './Product';


export default function Main(props) {
  const { products, onAdd, term, status, changeStatus, user, updateUser, item, items, setItem, setItems} = props;
  const inputEl = useRef("");
  const getSearchTerm=()=>{
    props.searchKeyword(inputEl.current.value);
  }
  return (
    <div className="flex-row">
          <div className="wrap">
            <div className="search">
              <input type="text" className="searchTerm" id="input_text" placeholder="Search a product" ref={inputEl} value={term} onChange={getSearchTerm}></input>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="flex flex-wrap -m-4">
            {products.map((product) => (
              <Product 
              item={item}
              setItem={setItem}
              items={items}
              setItems={setItems}
              user={user}
              updateUser={updateUser}
              key={product._id} 
              product={product} 
              onAdd={onAdd}
              status={status}
              changeStatus={changeStatus}
              ></Product>
            ))}
          </div> 
    </div>
  );
}
