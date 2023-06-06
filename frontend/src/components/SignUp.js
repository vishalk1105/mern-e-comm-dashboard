import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = localStorage.getItem("user");
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  });
  const onSubmit = async () => {
    const result = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();
    console.log(data, "login data");
    localStorage.setItem("user", JSON.stringify(data.result));
    localStorage.setItem("token", JSON.stringify(data.auth));
    if (data) {
      navigate("/");
    }
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      SignUp
      <input
        className="input_box"
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input_box"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input_box"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="signup_btn" type="button" onClick={onSubmit}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
