import React, { useRef, useState, useContext } from "react";
import { X } from "lucide-react";
import { IoPricetagOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import "./Card.css";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
// import { Star, ChevronDown } from "lucide-react";
import { CartContext } from "../../contexts/CartContext.jsx";
// import Cart from "./Cart.jsx";

function CardModal({ product, onClose }) {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  // const [totalprice, setTotalPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const [selectedProduct, setSelectedProduct] = useState([null]);

  const add = () => {
    // setPrice(totalprice + 500);
    setQuantity(quantity + 1);
  };

  const remove = () => {
    if (quantity > 1) {
      // setPrice(totalprice - 500);
      setQuantity(quantity - 1);
    } else {
      toast.error("select minimum one item");
    }
  };

  const notifyAddedToCart = (item) =>
    toast.success(`${item.title} added to cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      style: {
        backgroundColor: "#fff",
        color: "#000",
      },
    });

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

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    // notifyRemovedFromCart(product);
  };

  // const handleViewDetail = (productId) => {
  //   const product = data.find((item) => item.id === productId);
  //   setSelectedProduct(product);
  //   setShowModal(true);
  //   // console.log(product);
  // };
  return (
    <>
      <div
        ref={modalRef}
        onClick={closeModal}
        className="product-detail-cart fixed inset-0 bg-opacity-30 top-20 w-full bg-black backdrop-blur-sm flex items-center justify-center text-black shadow-xl"
      >
        <div className="mx-auto max-w-7xl md:px-8 2xl:px-16 bg-white rounded-xl px-5 py-10 gap-4 flex flex-col items-center ">
          <div className="">
            <button onClick={onClose} className="relative -top-5 left-[366px]">
              <X color="black" />
            </button>
            {/* <div className="flex items-center navtabs">
            <ol className="flex w-full items-center overflow-hidden">
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <a href="#">Home</a>
              </li>
              <li className="text-body mt-0.5 text-base">/</li>
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <a className="capitalize" href="#">
                  products
                </a>
              </li>
            </ol>
          </div> */}
          </div>
          <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
            <div className="col-span-5  gap-2.5">
              <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                <img
                  src={product.src}
                  alt="image loading..."
                  className="w-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-4 pt-8 lg:pt-0">
              <div className="mb-7 border-b border-gray-300 pb-7">
                <div className="title flex">
                  <h2 className="text-heading mb-3.5 text-xl font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                    {product.title}
                  </h2>
                </div>

                <p className="text-body leading-6  text-lg lg:leading-8">
                  {product.desc}
                </p>
                <div className="mt-5 flex items-center ">
                  <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                    ₹ {product.price}
                  </div>
                </div>
              </div>
              {/* <div className="border-b border-gray-300 pb-3  ">
              <div className="mb-4 "></div>
            </div> */}
              <div className="space-s-4 3xl:pr-48 flex items-center gap-2  border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
                <p> Qty :</p>
                <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                  <button
                    className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                    onClick={() => remove()}
                  >
                    <FiMinus size={20} />
                  </button>
                  <span className="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                    <h6 className=" p-5 text-2xl">{quantity}</h6>
                  </span>
                  <button
                    className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center transition border duration-300 ease-in-out md:w-12"
                    onClick={() => {
                      add();
                    }}
                  >
                    <MdAdd size={20} />
                  </button>
                </div>
              </div>

              <div className="addToCartBtn flex items-center justify-center sm:justify-start mt-4">
                {!cartItems.find((item) => item.id === product.id) ? (
                  <button
                    className="bn-32 bn32 w-52 text-lg flex items-center justify-center bg-[#251805] hover:bg-white  text-white  mb-6"
                    // onClick={() => handleViewDetail(product.id)}
                    onClick={() => {
                      addToCart(product, quantity);

                      notifyAddedToCart(product);
                      // handleViewDetail(product.id);
                      // handleRemoveFromCart(product);
                      onClose();
                      // closeModal();
                    }}
                  >
                    ADD TO CART
                  </button>
                ) : (
                  <button
                    className="bn-32 bn32 w-48 text-lg flex items-center justify-center bg-[#251805] hover:bg-white  text-white  mb-6 duration-300"
                    // onClick={onClose()}
                  >
                    Added
                  </button>
                )}
              </div>
              {/* <div className="py-6 ">
              <ul className="space-y-5 pb-1 text-sm">
                <li>
                  <span className="text-heading inline-block pr-2 font-semibold">
                    SKU:
                  </span>
                  N/A
                </li>
                <li>
                  <span className="text-heading inline-block pr-2 font-semibold">
                    Category:
                  </span>
                  <a
                    className="hover:text-heading transition hover:underline"
                    href="#"
                  >
                    kids
                  </a>
                </li>
                <li className="productTags">
                  <span className="text-heading inline-block pr-2 font-semibold">
                    Tags:
                  </span>
                  <a
                    className="hover:text-heading inline-block pr-1.5 transition last:pr-0 hover:underline"
                    href="#"
                  >
                    Sneakers
                  </a>
                </li>
              </ul>
            </div> */}
              {/* <div className="shadow-sm ">
              <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                  Product Details
                </h2>
                <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                  <div className="bg-heading h-0.5 w-full rounded-sm" />
                  <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out" />
                </div>
              </header>
              <div>
                <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7"></div>
              </div>
            </div> */}
              <div className="">
                <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                  <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                    Additional Information
                  </h2>
                </header>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardModal;
