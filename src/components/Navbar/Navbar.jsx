import React, { useState, useContext } from "react";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { BsCart3 } from "react-icons/bs";
import HoverCart from "../Home Page/HoverCart";
import { CartContext } from "../../contexts/CartContext";
import Cart from "../Home Page/Cart";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { LoginProvider, useLogin } from "../../contexts/LoginContext";

import { FaPowerOff } from "react-icons/fa";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function Navbar() {
  // const [showModal1, setShowModal1] = useState(false);

  const { username, logout, isLoggedIn } = useLogin();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  // if (!isLoggedIn) {
  //   return <Navigate to="/" />;
  // }
  const handleLogout = () => {
    logout();
    // <Navigate to="/" />;
    // isLoggedIn(false);
  };

  return (
    <>
      <header
        // onClick={setShowModal1(true)}
        className="flex fixed top-0 z-40 bg-white w-screen items-center justify-between h-28"
      >
        <div className="logo flex items-center justify-between ">
          <Link to="/home">
            <img
              className="w-24 md:w-28 lg:w-28 xl:w-28 m-5 pl-3 z-50 "
              src="https://haribadairyfarm.com/cdn/shop/files/hariba_Logo_PNG_300x.png?v=1663151859"
              alt="Company Logo"
            />
          </Link>

          <nav className="font-extralight mobileview  opacity-1 main flex items-center justify-end mt-1 flex-wrap ml-3 mr-10 p-0 text-gray-900">
            <button
              className="lg:hidden focus:outline-none bar "
              onClick={handleMobileMenuToggle}
            >
              {isMobileMenuOpen ? <RxCross2 size={30} /> : <FaBars size={30} />}
            </button>
            <ul
              className={`${
                isMobileMenuOpen
                  ? "block fixed  items-center flex flex-col justify-end top-28 p-10 right-0 bg-gray-100 z-50 w-50% gap-2 rounded-sm opacity-90 shadow-inner text-xl hover:text-bg-[#593808] ml-40 "
                  : "hidden"
              } lg:flex justify-between gap-5 items-center lg:order-2 text-[#593808]`}
            >
              <Link to="/home">
                <li className="underline-hover hover:text-[#000000] p-3 pl-4 pr-4 pt-3 pb-3 ">
                  Home
                </li>
              </Link>
              <Link to="/about">
                <li className=" underline-hover hover:text-[#000000] p-3 pl-4 pr-4 pt-3 pb-3 ">
                  About
                </li>{" "}
              </Link>
              <li className="relative group">
                <Link
                  to="/products"
                  className="underline-hover hover:text-[#000000] p-3 pl-4 pr-4 pt-3 pb-3"
                >
                  Products
                </Link>

                {/* <ul className="absolute hidden group-hover:block bg-gray-100 rounded-md p-20 gap-10 shadow-md mt-1">
                  <li>
                    <a href="/category1">Category 1</a>
                  </li>
                  <li>
                    <a href="/category2">Category 2</a>
                  </li>
                  <li>
                    <a href="/category2">Category 2</a>
                  </li>
                  <li>
                    <a href="/category2">Category 2</a>
                  </li>
                </ul> */}
              </li>
              <Link to="/contact">
                <li className="underline-hover hover:text-[#000000] p-3 pl-4 pr-4 pt-3 pb-3 ">
                  Contact
                </li>{" "}
              </Link>
              <Link to="/clients">
                <li className="underline-hover hover:text-[#000000] p-3 pl-4 pr-4 pt-3 pb-3 ">
                  Documentation
                </li>
              </Link>
            </ul>
          </nav>
        </div>

        <div className="right-side-icons flex items-center justify-center gap-10">
          {/* Profile dropdown */}

          <span className="-mr-5 block max-[390px]:hidden pt-3 ">
            Welcome {username}
          </span>
          <div className="user-btn ">
            <Menu as="div" className=" relative m-3">
              <div>
                <Menu.Button className="flex rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mt-5">
                  <img
                    className="h-14 w-14 rounded-full"
                    src="https://cdn-icons-png.freepik.com/256/3135/3135715.png?uid=R134540980"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-gray-700 flex"
                  >
                    <Link
                      to="/"
                      className="flex items-center justify-center gap-1"
                    >
                      <FaPowerOff size={20} />
                      <span className="pl-2 font-bold"> Logout</span>
                    </Link>
                  </button>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <div className="relative group">
            <Link
              href="/cart"
              className="underline-hover hover:text-[#000000] p-3 pt-2 pb-3  cart shopping-cart-icon pr-28"
            >
              <BsCart3 size={25} />

              <span className="absolute flex items-center justify-center top-5 right-12 pr-3">
                {cartItems.length}
              </span>
            </Link>
            <div className="absolute hidden group-hover:block z-30 w-24 mr-28 rounded-md p-10 gap-10 shadow-md  mt-1">
              <HoverCart />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
