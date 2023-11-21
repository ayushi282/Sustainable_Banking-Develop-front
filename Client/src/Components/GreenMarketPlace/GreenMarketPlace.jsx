import React, { useState, useEffect } from "react";
import "./GreenMarketPlace.css";
import heart from "../../Images/heart.svg";
import cart from "../../Images/cart.svg";
import filter from "../../Images/filter.svg";
import ProductCart from "./ProductCart";
import phone from "../../Images/phone.png";
import axios from "axios";

const GreenMarketPlace = () => {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const filterButtons = ["All", "Home", "Lifestyle", "Technology"];

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFilterOption = (e) => {
    console.log("handlefilter");
  };

  const getGrerrnMarketProduct = async () => {
    const result = await axios.get(
      `http://localhost:8081/products/category?productCategory=Green Market Place`
    );
    const details = result.data;
    console.log(details);
    setData(details);
  };

  useEffect(() => {
    getGrerrnMarketProduct();
  }, []);

  return (
    <div className="MarketPlace">
      <div className="header">
        <h1 style={{ color: "#FFFFFF" }}>Green Market Place</h1>
        <div style={{ marginLeft: "auto", fontSize: 25 }}>
          <img style={{ margin: "0px 5px" }} src={heart} alt="likes" />
          <img src={cart} alt="cart" />
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          className="search"
          placeholder="Search products"
          onChange={handleChange}
          value={searchInput}
        />
        <img className="filterIcon" src={filter} alt="filter" />
      </div>
      <div className="filterOption">
        {filterButtons.map((buttonName) => {
          return (
            <button type="button" onClick={handleFilterOption} className="btn">
              {buttonName}
            </button>
          );
        })}
      </div>
      <div className="ads">
        <div className="ads-body">
          <span style={{ color: "#88C53C" }}>Advancement</span>
          <span
            style={{ color: "black", fontWeight: "bold", fontSize: "larger" }}
          >
            Samsung Galaxy S21
          </span>
          <div style={{ display: "flex", margin: "20px 0px" }}>
            <button type="button" className="buy-btn">
              Buy
            </button>
            <span style={{ color: "black", margin: "0px 10px" }}>4425</span>
          </div>
        </div>
        <div className="ads-img">
          <img src={phone} className="phone-img" alt="phone" />
        </div>
      </div>
      <div className="product-container">
        {data.map((data) => (
          <ProductCart key={data.productId} data={data} />
        ))}
      </div>
    </div>
  );
};

export default GreenMarketPlace;
