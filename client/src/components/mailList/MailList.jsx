import React from "react";
import "./mailList.css";

const MailList = () => {
  return (
    <div className="mailListContainer">
      <div className="innerMailListContainer">
        <h2>Save time, save money!</h2>
        <p>Sign up and we'll send the best deals to you</p>
        <div className="inputMailList">
          <input type="text" name="" id="" placeholder="Your email" />
          <button>Subscribe</button>
        </div>
        <p>
          {" "}
          <span>
            <input type="checkbox" name="" id="" />
          </span>{" "}
          Send me a link to get the FREE Booking.com app!
        </p>
      </div>
    </div>
  );
};

export default MailList;
