import React from "react";
import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/hotels/countByType");

  const images = [
    "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_960_720.jpg",
    "https://cdn.pixabay.com/photo/2013/11/13/21/14/san-francisco-210230_960_720.jpg",
    "https://cdn.pixabay.com/photo/2019/09/12/15/21/resort-4471852_960_720.jpg",
    "https://cdn.pixabay.com/photo/2020/03/21/20/03/real-estate-4955086_960_720.jpg",
    "https://cdn.pixabay.com/photo/2019/03/08/20/14/kitchen-living-room-4043091__340.jpg",
  ];

  return (
    <div className="PropertyListContainer">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className="propertyListImgContainer" key={i}>
                <img src={img} alt="" />
                <div className="propertyListImgContent">
                  <h2>{data[i]?.type}</h2>
                  <p>
                    {data[i]?.count} {data[i]?.type}
                  </p>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
