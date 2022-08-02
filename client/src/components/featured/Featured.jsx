import React from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=london,edinburgh,madrid"
  );

  return (
    <div className="featuredContainer">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredImgContainer">
            <div className="featuredImg">
              <img
                src="https://cdn.pixabay.com/photo/2019/09/16/16/01/city-of-london-4481399_960_720.jpg"
                alt=""
              />
              <div className="FeaturedContent">
                <h1>London</h1>
                <p>
                  {" "}
                  <span>{data[0]}</span> properties
                </p>
              </div>
            </div>
            <div className="featuredImg">
              <img
                src="https://cdn.pixabay.com/photo/2017/06/29/21/15/city-2456236_960_720.jpg"
                alt=""
              />
              <div className="FeaturedContent">
                <h1>Edinburgh</h1>
                <p>
                  {" "}
                  <span>{data[1]}</span> properties
                </p>
              </div>
            </div>
          </div>
          <div className="featuredBottomContainer">
            <div className="featuredImg bottom">
              <img
                src="https://cdn.pixabay.com/photo/2019/08/06/11/58/city-4388160_960_720.jpg"
                alt=""
              />
              <div className="FeaturedContent bottom">
                <h1>Amsterdam</h1>
                <p>
                  {" "}
                  <span>{data[2]}</span> properties
                </p>
              </div>
            </div>
            <div className="featuredImg bottom">
              <img
                src="https://cdn.pixabay.com/photo/2017/07/10/00/04/manchester-2488681_960_720.jpg"
                alt=""
              />
              <div className="FeaturedContent bottom">
                <h1>Manchester</h1>
                <p>
                  {" "}
                  <span>{data[3]}</span> properties
                </p>
              </div>
            </div>
            <div className="featuredImg bottom">
              <img
                src="https://cdn.pixabay.com/photo/2017/08/24/07/36/birmingham-2675655_960_720.jpg"
                alt=""
              />
              <div className="FeaturedContent bottom">
                <h1>Birmingham</h1>
                <p>
                  {" "}
                  <span>{data[4]}</span> properties
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
