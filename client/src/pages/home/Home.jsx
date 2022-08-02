import React from "react";
import Featured from "../../components/featured/Featured";
import FeaturedDestinationList from "../../components/featuredDestinationList/FeaturedDestinationList";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeSubTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeSubTitle">Great destinations for holidays</h1>
        <FeaturedDestinationList />
      </div>
      <MailList />
      <Footer />
    </div>
  );
}

export default Home;
