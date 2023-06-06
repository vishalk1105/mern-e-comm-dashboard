import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductsList = () => {
  const [list, setList] = useState([]);
  const fetchData = async () => {
    const result = await fetch("http://localhost:5000/products/", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const data = await result.json();
    setList(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (id) => {
    const result = await fetch(`http://localhost:5000/delete-product/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const data = await result.json();
    if (data) {
      fetchData();
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setList(result);
      }
    } else {
      fetchData();
    }
  };

  return (
    <>
      <h3>Product List</h3>
      <input
        type={"text"}
        placeholder="Search Product"
        className="search_input_box"
        onChange={searchHandle}
      />
      <div className="products_div">
        {list.length > 0 ? (
          <>
            {list.map((item) => (
              <div className="product_div" key={item._id}>
                <p>Product Name :{item.name} </p>
                <p>Product Price :{item.price} </p>
                <p>Product Category :{item.category} </p>
                <p>Product Company :{item.company} </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button
                    className="operation_btn"
                    onClick={() => deleteProduct(item._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/update/${item._id}`}>Update</Link>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h3>No Data Found</h3>
        )}
      </div>
    </>
  );
};

export default ProductsList;
