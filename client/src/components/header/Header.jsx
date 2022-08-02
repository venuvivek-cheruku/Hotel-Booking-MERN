import React, { useState } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendar,
  faCar,
  faPerson,
  faPlaceOfWorship,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  const { user } = useContext(AuthContext);

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerListContainer">
          <div className="headerList">
            <div className="headerListItem active">
              <FontAwesomeIcon className="headerIcon" icon={faBed} />
              <span>Stays</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon className="headerIcon" icon={faPlane} />
              <span>Flights</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon className="headerIcon" icon={faCar} />
              <span>Car Rentals</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon className="headerIcon" icon={faPlaceOfWorship} />
              <span>Attractions</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon className="headerIcon" icon={faTaxi} />
              <span>Airport taxis</span>
            </div>
          </div>
        </div>

        {type !== "list" && (
          <>
            <div className="headerTitleContainer">
              <div className="headerTitle">
                <h1>A lifetime of discounts? It's Genius.</h1>
                <p>
                  Get rewarded for your travels - unlock instant savings of 10%
                  or more with a free Booking account
                </p>
              </div>
              <div className="headerbtnContainer">
                {!user && (
                  <Link to={"/login"}>
                    <button>Sign In / Register</button>
                  </Link>
                )}
              </div>
            </div>

            <div className="headerSelectionContainer">
              <div className="headerSelectionItem">
                <FontAwesomeIcon className="headerIcon" icon={faBed} />
                <span>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="headerSearchInput"
                    placeholder="Where are you going? "
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </span>
              </div>
              <div className="headerSelectionItem">
                <FontAwesomeIcon className="headerIcon" icon={faCalendar} />
                <span
                  className="headerSearchText"
                  onClick={() => setOpenDate(!openDate)}
                >
                  {" "}
                  {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                    dates[0].endDate,
                    "dd/MM/yyyy"
                  )} `}{" "}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="dateRange"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div
                className="headerSelectionItem option"
                onClick={() => setOpenOptions(!openOptions)}
              >
                <FontAwesomeIcon className="headerIcon" icon={faPerson} />
                <span className="headerSearchText">
                  {" "}
                  {`${options.adult} adult . ${options.children} children . ${options.room} room`}{" "}
                </span>

                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterButton"
                          disabled={options.adult <= 1}
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterButton"
                          disabled={options.children <= 0}
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterButton"
                          disabled={options.room <= 1}
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSelectionItembtn">
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
