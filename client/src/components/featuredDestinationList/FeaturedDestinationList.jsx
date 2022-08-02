import React from "react";
import useFetch from "../../hooks/useFetch";
import "./featuredDestinationList.css";

const FeaturedDestinationList = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4 ");

  return (
    <div className="featuredDestinationListContainer">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="featuredDestinationListImgContainer" key={item._id}>
              <div className="featuredDestinationListImg">
                <img src={item.photos[0]} alt="" />
              </div>
              <div className="featuredDestinationListImgContent">
                <h2>{item.city}</h2>
                <p>{item.name}</p>
                <p>
                  Starting from{" "}
                  <span>
                    {" "}
                    <b>£ {item.cheapestPrice}</b>{" "}
                  </span>
                </p>
                {item.rating && (
                  <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedDestinationList;
