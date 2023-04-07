import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './LoginSignup/Sidebar.jsx';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Basket from './Basket.jsx';
import './popupExtra.css'
import Upload from './Upload.jsx';

export default function Header(props) {
  const { cartItems, onAdd, onRemove, user, updateUser, item, setItem, items, setItems, reRender } = props;
  var s = {
    height: "2cm",
    width: "5cm"
  }

  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <img style={s} className="imgLogo" src='http://localhost:9002/getIMG' />
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">

          {
            user && user._id ? <a className="mr-5 hover:text-white">{user.name}</a> : <a className="mr-5 hover:text-white">Profile</a>
          }

          <a href="http://localhost:9002/contact" className="mr-5 hover:text-white">Contact Us</a>
          {
            user && user._id ? <a className="mr-5 hover:text-white">Help</a> : <a></a>
          }
        </nav>

        <Router>
          <div className="flex justify-between">
            { user && user._id ?
              <Popup
                trigger={<button className="mybutton"> Cart </button>}
                modal
                nested
              >
                {close => (
                  <div className="modal">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <div className="header"> Cart </div>
                    <div className="content">
                      {' '}
                      <Basket
                        cartItems={cartItems}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        reRender={reRender}
                      ></Basket>
                    </div>
                    <div className="actions">

                      <button
                        className="mybutton"
                        onClick={() => {
                          close();
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </Popup>:
              <div></div>
            }
            {
              user && user._id ?
                <Popup
                  trigger={<button className="mybutton"> Upload </button>}
                  modal
                  nested
                >
                  {close => (
                    <div className="modal">
                      <button className="close" onClick={close}>
                        &times;
                      </button>
                      <div className="header"> Add item </div>
                      <div className="content">
                        {' '}
                        <Upload
                          item={item}
                          setItem={setItem}
                          items={items}
                          setItems={setItems}
                          user = {user}
                        />
                      </div>
                      <div className="actions">

                        <button
                          className="mybutton"
                          onClick={() => {
                            close();
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
                :
                <></>
            }
          </div>
          <Sidebar
            user={user}
            updateUser={updateUser} />
        </Router>
      </div>
    </header>
  );
}
