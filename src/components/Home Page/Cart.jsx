import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Heart, Trash } from "lucide-react";
// import { CartContext } from "../context/cart.jsx";

import { CartContext } from "../../contexts/CartContext.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Cart() {
  const {
    cartItems,
    addToCart,
    deleteFromCart,
    removeFromCart,
    clearCart,
    getCartTotal,
  } = useContext(CartContext);

  // const notifyRemovedFromCart = (item) =>
  //   toast.error(`${item.title} removed from cart!`, {
  //     position: "top-center",
  //     autoClose: 2000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     theme: "colored",
  //     style: {
  //       backgroundColor: "#000",
  //       color: "#fff",
  //     },
  //   });

  // const notifyCartCleared = () =>
  //   toast.error(`Cart cleared!`, {
  //     position: "top-center",
  //     autoClose: 2000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     theme: "colored",
  //     style: {
  //       backgroundColor: "#000",
  //       color: "#fff",
  //     },
  //   });

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    // notifyRemovedFromCart(product);
  };

  // const handleInputChange = (event) => {
  //   const inputValue = event.target.value;
  //   setQuantity(inputValue);
  // };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-full scale-125 mt-56 px-4 sm:px-6 lg:px-8  ">
        <div className="mx-auto max-w-7xl py-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-12 sm:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white col-span-12 sm:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <table className="min-w-full divide-y divide-gray-200 overflow-hidden ">
                <thead className="bg-gray-50 border">
                  <tr className="">
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-bold  uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-bold  uppercase tracking-wider
                      flex item-center justify-center
                      "
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-bold  uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-bold  uppercase tracking-wider"
                    >
                      Subtotal
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Remove</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 border">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              src={item.src}
                              alt={item.title}
                              className="h-10 w-10 rounded-md object-contain object-center"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.title.length
                                ? item.title.substring(0, 18)
                                : item.title}
                              ...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="h-7 w-7 flex items-center"
                            onClick={() => {
                              const cartItem = cartItems.find(
                                (product) => product.id === item.id
                              );
                              if (cartItem.quantity === 1) {
                                handleRemoveFromCart(item);
                              } else {
                                removeFromCart(item);
                              }
                            }}
                          >
                            -
                          </button>
                          {/* <input
                            type="number"
                            min="1"
                            max="1000"
                            className="mx-1 h-7 w-9 p-2 rounded-md border text-center form-control"
                            value={item.quantity}
                            onChange={handleInputChange}
                          /> */}

                          <p className="border p-3">{item.quantity}</p>
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center"
                            onClick={() => {
                              addToCart(item);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <b className="text-lg">₹ {item.price}</b>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-sm">
                        <div className="text-sm text-gray-900 ">
                          <b className="text-lg">
                            ₹ {item.price * item.quantity}
                          </b>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex text-sm removeBtn">
                          <button type="button" className="flex items-center ">
                            <Trash
                              size={12}
                              color="red"
                              onClick={() =>
                                Swal.fire({
                                  title:
                                    "Are you sure you want to remove this item?",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  icon: "warning",
                                  confirmButtonText: "yes",
                                  denyButtonText: `Cancel`,
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    Swal.fire("Removed !", "", "success");
                                    deleteFromCart(item);
                                  } else if (result.isDenied) {
                                    Swal.fire("canceled", "", "info");
                                  }
                                })
                              }
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {cartItems.length > 0 ? (
                <div className="flex flex-col justify-between items-center">
                  {/* <h1 className="text-2xl mb-10 ">
                    Subtotal : <b>₹ {getCartTotal()}</b>
                  </h1> */}
                  <button
                    className="px-4 py-2 mt-32 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => clearCart()}
                  >
                    Clear cart
                  </button>
                </div>
              ) : (
                <h1 className="text-lg font-bold ml-96 text-black">
                  <img src="https://i.imgur.com/3hKhTIC.png" alt="" />
                  <Link to="/home">
                    <p className="flex items-center justify-center text-lg  text-gray-600 transition hover:text-gray-700 hover:underline hover:underline-offset-4">
                      Continue shopping &rarr;
                    </p>
                  </Link>
                  {/* Your cart is empty */}
                </h1>
              )}
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading "
              className="mt-6 sm:mt-0 rounded-md bg-[#f9f9f9] col-span-12 sm:col-span-4  border ml-11 w-full  max-[390px]:w-8/12"
            >
              <h2
                id="summary-heading"
                className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                <div className="flex ">
                  <img
                    className="w-8 mr-3"
                    src="https://i.imgur.com/9kF0ghF.png"
                    alt=""
                  />
                  Price Details :{" "}
                </div>
              </h2>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-[#f9f9f9]  divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      Price ({cartItems.length} items)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹ {getCartTotal()}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      Discount
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700">
                      -
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      Delivery Charges
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700">
                      Free
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                      <strong>Total Amount</strong>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                      <b>₹ {getCartTotal()}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="px-2 mt-6 pb-4 font-medium  text-green-700">
                Total shopping Amount ₹{getCartTotal()} on this order
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}

Cart.propTypes = {
  showCartModal: PropTypes.bool,
  // toggle: PropTypes.func,
};
