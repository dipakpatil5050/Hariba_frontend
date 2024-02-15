import React from "react";
import { Link } from "react-router-dom";

function AddToCart() {
  return (
    <>
      <div className="addToCartBtn">
        <Link to="./cart">
          <button className="bn-32 bn32 bg-[#251805] hover:bg-white  text-white mt-10">
            Add to Cart
          </button>
        </Link>
      </div>
    </>
  );
}

export default AddToCart;
