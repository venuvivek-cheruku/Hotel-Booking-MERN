import React from "react";
import "./searchItem.css";
import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItemContainer">
      <div className="siImg">
        <img src={item.photos[0]} alt="" />
      </div>
      <div className="siContent">
        <h1>{item.name}</h1>
        <p>{item.distance}</p>
        <p className="airportText">Free Airport Taxi</p>
        <p>
          <b>Studio Apartment with Air Conditioning </b>
        </p>
        <p>{item.desc}</p>
        <p className="cancellationText"> Free Cancellation</p>
        <p className="cancelText">
          {" "}
          You can cancel later, so lock in this great price today!
        </p>
      </div>
      <div className="siPriceContent">
        {item.rating && (
          <div className="ratingContainer">
            <p>Excellent</p>
            <button>8.9</button>
          </div>
        )}
        <div className="siPrice">
          <p className="siPriceNumber">£ {item.cheapestPrice}</p>
          <p>including taxes and fees</p>
        </div>
        <div className="siAvailabilityBtn">
          <Link to={`/hotels/${item._id}`}>
            <button>See Availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
