import React from "react";
import Filter from "../Filter";
import "./home.scss";
import SearchResults from "../SearchResults/index";

const Home = () => {
  return (
    <div className="home">
      <Filter />
      <SearchResults />
    </div>
  );
};

export default Home;
