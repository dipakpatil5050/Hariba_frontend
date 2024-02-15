import { useState, useEffect, useContext } from "react";
// import Cart from "./cart.jsx";
import { IoPricetagOutline } from "react-icons/io5";
import "./Card.css";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../../contexts/CartContext.jsx";
import CardModal from "./CardModal.jsx";
import { BsCart3 } from "react-icons/bs";
import Cart from "./Cart.jsx";

export default function Products() {
  const [showModal, setShowModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);

  const [visible, setVisible] = useState(6);
  const [selectedProduct, setSelectedProduct] = useState([null]);

  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  // const toggle = () => {
  //   setShowCartModal(!showCartModal);
  // };

  const API_URL = "http://localhost:3000/data";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // onclick event for aadd to cart button

  const notifyAddedToCart = (item) =>
    toast.success(`${item.title} added to cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#fff",
        color: "#000",
      },
    });

  const notifyRemovedFromCart = (item) =>
    toast.error(`${item.title} removed from cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#000",
        color: "#fff",
      },
    });

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    notifyRemovedFromCart(product);
  };

  const handleViewDetail = (productId) => {
    const product = data.find((item) => item.id === productId);
    setSelectedProduct(product);
    setShowModal(true);
    // console.log(product);
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="flex mt-16 justify-between items-center px-20 py-5">
        <h1 className="text-2xl uppercase font-bold mt-10 text-center mb-10">
          <a href="/home">Products</a>
        </h1>
        {!showCartModal && (
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            // onClick={toggle}
          >
            cart ({cartItems.length})
          </button>
        )}
      </div>
      <div className="rounded-md m-7 p-2  flex  items-center justify-center flex-wrap cursor-pointer">
        {data?.map((product) => {
          return (
            <div className="group relative" key={product.id}>
              <div
                className="card-container rounded-md  m-7 p-2 flex flex-wrap cursor-pointer"
                // onClick={() => setShowCartModal(true)}
                // onClick={() => setShowModal(true)}
                // onClick={() => handleViewDetail(product.id)}
              >
                <img
                  className=" card-img rounded-t-2xl rounded-b-xl ease-out duration-500 scale-100 hover:scale-110"
                  src={product.src}
                  alt={product.alt}
                />
                <h1 className="card-title font-bold  flex items-center justify-center pt-5 pl-5 cursor-pointer">
                  {product.title}
                  {/* {product.title} */}
                </h1>
                <p className="card-desc text-[#593808] m-2 text-base flex items-center justify-center">
                  {product.desc}

                  {/* {product.desc} */}
                </p>

                <div className="pricediv mt-3">
                  <strong className="m-1 flex items-center justify-center">
                    <IoPricetagOutline className="mr-2" /> ₹{product.price}
                  </strong>
                  <div className="addToCartBtn flex items-center justify-center mt-4">
                    {!cartItems.find((item) => item.id === product.id) ? (
                      <button
                        className="bn-32 bn32 w-48 text-lg flex items-center justify-center bg-[#251805] hover:bg-white  text-white rounded-lg mb-6"
                        // onClick={() => handleViewDetail(product.id)}
                        onClick={() => {
                          addToCart(product);
                          notifyAddedToCart(product);
                          handleViewDetail(product.id);
                        }}
                      >
                        Add to cart
                      </button>
                    ) : (
                      <button className="bn-32 bn32 w-48 text-lg flex items-center justify-center bg-[#251805] hover:bg-white  text-white rounded-lg mb-6">
                        Added
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* {showModal && (
        <CardModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
        />
      )} */}
      <Cart showCartModal={showCartModal} />
    </div>
  );
}
