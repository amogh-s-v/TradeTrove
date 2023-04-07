import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function checkout() {

  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    try {
      const { data } = await axios.get("http://localhost:9002/cart")
      return data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCartItems();
      setCartItems(result)
    }
    fetchData()
  }, [])

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 70;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <h1 className="sr-only">Checkout</h1>

      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2 ">
        <div className="text-gray-400 bg-gray-900 body-font">
          <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
            <div>
              <p className="mt-1 text-xl">For the purchase of</p>
            </div>
            <div>
              <div className="flow-root">
                <ul className="-my-2 divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <li className="flex items-center gap-4 py-10">

                      <img
                        src={item.image}
                        alt=""
                        className="h-20 w-20 rounded object-cover"
                      />
                      <div>
                        <h3 className="text-3xl text-slate-50">{item.title}</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <br></br>
                            <dt className="inline text-base text-slate-50 text-sky-400">₹{item.price}</dt>
                            <dd className="inline text-base text-slate-50"> x </dd>
                            <dd className="inline text-base text-slate-50 text-rose-500">{item.qty}</dd>
                            <dd className="inline text-base text-slate-50"> = </dd>
                            <dd className="inline text-base text-slate-50 text-green-300">₹{item.qty * item.price.toFixed(2)}</dd>
                          </div>
                          <div>
                            <br></br>
                            <dt className="inline text-base text-slate-50">Seller: </dt>
                            <dd className="inline text-base text-slate-50">{item.uploader}</dd>
                          </div>
                        </dl>
                      </div>

                    </li>
                  ))}
                </ul>

              </div>
              <div class="mt-6 border-t border-b py-2">
                <div class="flex items-center justify-between">
                  <p class="text-base font-medium text-slate-50">Subtotal</p>
                  <p class="font-semibold text-slate-50">₹{itemsPrice.toFixed(2)}</p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-base font-medium text-slate-50">Tax</p>
                  <p class="font-semibold text-slate-50">₹{taxPrice.toFixed(2)}</p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-base font-medium text-slate-50">Shipping Price</p>
                  <p class="font-semibold text-slate-50">₹{shippingPrice.toFixed(2)}</p>
                </div>
              </div>
              <div class="mt-6 flex items-center justify-between">
                <p class="text-2xl font-medium text-slate-50 text-rose-500">Total</p>
                <p class="text-2xl font-semibold text-slate-50 text-green-300">₹{totalPrice.toFixed(2)}</p>
              </div>
              <br></br>
            </div>
          </div>

        </div>

        <div className="text-gray-400 bg-gray-900 body-font border-l border-white">
          <div className="mx-auto max-w-lg px-4 lg:px-8">
            <form className="">
              <div className="col-span-3">
                <label for="FirstName" className="block text-base text-slate-50">Your Addresses </label>
                <input type="text" id="FirstName" className="w-full rounded-md shadow-sm sm:text-sm" />
                <br></br>
                <div>
                  <label for="Country" className="sr-only">Country</label>
                  <select id="Country" className="relative w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm">
                    <option>England</option>
                    <option>Wales</option>
                    <option>Scotland</option>
                    <option>France</option>
                    <option>Belgium</option>
                    <option>Japan</option>
                  </select>
                </div>
                <br></br>
                <div>
                  <label className="sr-only" for="PostalCode"> ZIP/Post Code </label>

                  <input
                    type="text"
                    id="PostalCode"
                    placeholder="ZIP/Post Code"
                    className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>
              <div className="col-span-6">
                <label for="Email" className="block text-base text-slate-50">Contact Number</label>
                <input type="email" id="Email" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
              </div>
              <fieldset className="col-span-6">
                <legend className="block text-sm font-medium text-gray-700">Card Details</legend>
                <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                  <div>
                    <label for="CardNumber" className="sr-only"> Card Number </label>
                    <input type="text" id="CardNumber" placeholder="Card Number" className="relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm" />
                  </div>
                  <div className="flex -space-x-px">
                    <div className="flex-1">
                      <label for="CardExpiry" className="sr-only"> Card Expiry </label>
                      <input type="text" id="CardExpiry" placeholder="Expiry Date" className="relative w-full rounded-bl-md border-gray-200 focus:z-10 sm:text-sm" />
                    </div>
                    <div className="flex-1">
                      <label for="CardCVC" className="sr-only"> Card CVC </label>
                      <input type="text" id="CardCVC" placeholder="CVC" className="relative w-full rounded-br-md border-gray-200 focus:z-10 sm:text-sm" />
                    </div>
                  </div>
                </div>
              </fieldset>

              <br></br>

              <div className="col-span-6">
                <button className="block w-full rounded-md bg-rose-600 p-2.5 text-base text-white transition duration-300 ease-in-out hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400">
                  Pay ₹{totalPrice.toFixed(2)}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

  )
}