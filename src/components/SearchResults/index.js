import React from "react";
import "./SearchResults.scss";

const SearchResults = () => {
  return (
    <div className="search-results">
      <div className="search-results__title">
        Найдено <span>(192 услуги)</span>
      </div>

      <div className="search-results__item">
        <a href="#">Дизайн сайта UI UX</a>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
          ducimus ut error non impedit harum reprehenderit ex, a dolorem aliquid
          natus reiciendis facilis praesentium incidunt illo? Totam saepe
          distinctio laboriosam ab voluptas mollitia nam ad ipsum!
        </p>
        <div className="search-results__tags">
          <span>#landing page</span>
          <span>#логитип</span>
          <span>#промо сайт</span>
        </div>
      </div>

      <div className="search-results__item">
        <a href="#">Дизайн сайта UI UX</a>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
          ducimus ut error non impedit harum reprehenderit ex, a dolorem aliquid
          natus reiciendis facilis praesentium incidunt illo? Totam saepe
          distinctio laboriosam ab voluptas mollitia nam ad ipsum!
        </p>
        <div className="search-results__tags">
          <span>#landing page</span>
          <span>#логитип</span>
          <span>#промо сайт</span>
        </div>
      </div>

      <div className="search-results__item">
        <a href="#">Дизайн сайта UI UX</a>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
          ducimus ut error non impedit harum reprehenderit ex, a dolorem aliquid
          natus reiciendis facilis praesentium incidunt illo? Totam saepe
          distinctio laboriosam ab voluptas mollitia nam ad ipsum!
        </p>
        <div className="search-results__tags">
          <span>#landing page</span>
          <span>#логитип</span>
          <span>#промо сайт</span>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
