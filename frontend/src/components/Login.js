import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  });
  const onSubmit = async () => {
    const result = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    console.log(data);
    if (data.auth) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.auth));
      navigate("/");
    }
    // setEmail("");
    // setPassword("");
  };
  return (
    <div className="login">
      <input
        type="email"
        className="input_box"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="input_box"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="signup_btn" type="button" onClick={onSubmit}>
        Log In
      </button>
    </div>
  );
};

export default Login;
