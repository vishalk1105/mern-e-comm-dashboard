import React, { useEffect, useState } from "react";

const ProductsList = () => {
  const [list, setList] = useState([]);
  const fetchData = async () => {
    const result = await fetch("http://localhost:5000/products/");
    const data = await result.json();
    setList(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (id) => {
    const result = await fetch(`http://localhost:5000/delete-product/${id}`, {
      method: "DELETE",
    });
    const data = await result.json();
    if (data) {
      fetchData();
    }
  };

  return (
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
                <button className="operation_btn">Update</button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h3>No Data Added</h3>
      )}
    </div>
  );
};

export default ProductsList;
