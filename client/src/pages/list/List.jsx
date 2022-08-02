import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import "./list.css";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";

function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  var destinationCase = destination.toLowerCase();

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destinationCase}&min=${min || 0}&max=${max || 9999}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listSearchTitle"> Search </h1>
            <div className="searchInputContainer">
              <h2>Destination</h2>
              <input
                type="text"
                placeholder={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="searchInputContainer search">
              <h2>Check-in date</h2>
              <span
                className="searchDateInput"
                onClick={() => setOpenDate(!openDate)}
              >
                {" "}
                {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )} `}{" "}
                <span className="searchInputArrow">
                  {" "}
                  <FontAwesomeIcon icon={faAngleDown} />{" "}
                </span>
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  className="searchInputDateRange"
                  ranges={dates}
                />
              )}
            </div>
            <div className="searchInputContainer">
              <h2>Options</h2>
              <div className="searchInputOptions">
                <p>Min price (per night) </p>
                <span>
                  {" "}
                  <input
                    min={0}
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                  />
                </span>
              </div>
              <div className="searchInputOptions">
                <p>Max price (per night) </p>
                <span>
                  {" "}
                  <input
                    min={0}
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </span>
              </div>
              <div className="searchInputOptions">
                <p>Adult </p>
                <span>
                  {" "}
                  <input min={1} type="number" placeholder={options.adult} />
                </span>
              </div>
              <div className="searchInputOptions">
                <p>Children </p>
                <span>
                  {" "}
                  <input min={0} type="number" placeholder={options.children} />
                </span>
              </div>
              <div className="searchInputOptions">
                <p>Room </p>
                <span>
                  {" "}
                  <input min={1} type="number" placeholder={options.room} />
                </span>
              </div>
            </div>
            <div className="searchBtn">
              <button onClick={handleClick}>Search</button>
            </div>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
}

export default List;
