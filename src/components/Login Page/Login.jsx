import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "./login.css";
import "./responsive.css";
import { useLogin } from "../../contexts/LoginContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isLoggedIn } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //Login validation from API integration from render server

  const handleLogin = async () => {
    try {
      const response = await fetch("https://api1-3erk.onrender.com/users");
      const users = await response.json();
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        toast.success("Login successful!");
        setIsAuthenticate(true);
        login(username);
        navigate("/home");
        // Perform additional actions after successful login, e.g., redirect to a dashboard
      } else {
        if (!users.some((u) => u.username === username)) {
          toast.error("Invalid username");
        }
        if (!users.some((u) => u.password === password)) {
          toast.error("Invalid password");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in. Please try again later.");
    }
  };

  return (
    <div>
      {isAuthenticate ? (
        <Home />
      ) : (
        <div className="login-right login-main ">
          <div className="login-right-container">
            <div className="login-logo">
              <img
                src="https://haribadairyfarm.com/cdn/shop/files/hariba_Logo_PNG_300x.png?v=1663151859"
                alt=""
              />
            </div>
            <div className="login-center">
              <h2>Welcome back!</h2>
              <p className="text-gray-500 mt-6">Hey! Good to see to again.</p>
              <form className="inputs">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email or Username"
                />
                <div className="pass-input-div">
                  <input
                    value={password}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  ) : (
                    <FaEye
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  )}
                </div>
                <div className="login-center-options">
                  <div className="remember-div">
                    <input type="checkbox" id="remember-checkbox" />
                    <label htmlFor="remember-checkbox">Remember me</label>
                  </div>
                  <a href="#" className="forgot-pass-link text-[#593808] ">
                    Forgot password?
                  </a>
                </div>
                <div className="login-btn mt-6 flex items-center border-2 rounded-full justify-center ">
                  <button
                    onClick={handleLogin}
                    type="button"
                    className="border bg-[#251805] text-white hover:bg-white hover:text-black duration-500 ease-in-out"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <p className="login-bottom-p">
              Don't have an account? <a href="#">Sign Up</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
