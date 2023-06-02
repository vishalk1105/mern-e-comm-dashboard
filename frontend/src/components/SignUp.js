import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (data) => {
    console.log({ name: name, email: email, password: password });
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
