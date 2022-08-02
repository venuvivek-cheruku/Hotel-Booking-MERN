import {
  faLocationDot,
  faCircleXmark,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import "./hotel.css";
import useFetch from "../../hooks/useFetch";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

function Hotel() {
  const [sliderNumber, setSliderNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();

  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleOpen = (i) => {
    setSliderNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = sliderNumber === 0 ? 5 : sliderNumber - 1;
    } else {
      newSlideNumber = sliderNumber === 5 ? 0 : sliderNumber + 1;
    }
    setSliderNumber(newSlideNumber);
  };

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="hotel">
      <Navbar />
      <Header type="list" />

      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="closeIcon"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="leftIcon"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[sliderNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="rightIcon"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <div className="hotelContent">
              <div>
                <h1>{data.name}</h1>
                <p className="hotelAddressText">
                  <span>
                    <FontAwesomeIcon
                      className="hotelIcon"
                      icon={faLocationDot}
                    />
                  </span>
                  {data.address}
                </p>
                <p className="hotelTextBlue">
                  Excellent location - {data.distance}m from center
                </p>
                <p className="hotelTextGreen">
                  Book a stay over <span>£{data.cheapestPrice}</span> at this
                  property and get a free airport taxi{" "}
                </p>
              </div>
              <button className="hotelReserveBtn">Reserve or Book Now!</button>
            </div>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgContainer" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    className="hotelImg"
                    alt=""
                  />
                </div>
              ))}
            </div>

            <div className="hotelBottomContent">
              <div className="hotelBottomContentLeft">
                <h1>{data.title}</h1>
                <p>{data.desc}</p>
              </div>
              <div className="hotelBottomContentRight">
                <h2>Perfect for a {days}-night Stay!</h2>
                <p>
                  Located in the real heart of london, this property has a
                  excellent location score of <span>9.8</span>!
                </p>
                <div className="hotelBottomRightPrice">
                  <p>
                    £ {days * data.cheapestPrice * options.room}{" "}
                    <span>({days} nights)</span>
                  </p>
                </div>
                <button onClick={handleClick} className="hotelReserveBtn">
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="reserveModal">
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
      </div>
      <MailList />
      <Footer />
    </div>
  );
}

export default Hotel;
