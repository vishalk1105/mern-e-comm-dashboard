import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const auth = localStorage.getItem("user");
  const userId = JSON.parse(auth)._id;
  //   console.log(userId);
  const onSubmit = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    } else {
      const result = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        body: JSON.stringify({ name, price, category, company, userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      console.log(data);
      setCategory("");
      setCompany("");
      setName("");
      setPrice("");
    }
  };
  return (
    <div>
      <input
        type="text"
        className="input_box"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && <p style={{ color: "red" }}>Enter Valid Name</p>}
      <input
        type="text"
        className="input_box"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && <p style={{ color: "red" }}>Enter Valid Price</p>}
      <input
        type="text"
        className="input_box"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && (
        <p style={{ color: "red" }}>Enter Valid Category</p>
      )}
      <input
        type="text"
        className="input_box"
        placeholder="Enter Product Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && <p style={{ color: "red" }}>Enter Valid Company</p>}
      <button className="signup_btn" type="button" onClick={onSubmit}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
