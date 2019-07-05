import React, { useState } from "react";
import "./filter.scss";
import plus from "./plus-symbol.svg";

const Filter = () => {
  const [filterValue, setFilterValue] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 500, max: 5000 });

  const onPriceRangeHandler = ({ target: { name, value } }) => {
    setPriceRange({ ...priceRange, [name]: value });
  };

  return (
    <div className="filter">
      <div className="filter__header">
        <div className="filter__header--main-left">Фильтры</div>
        <div className="filter__header--right">Сбросить все</div>
      </div>

      <div className="filter__categories">
        <div className="filter__header">
          <div className="filter__header--left">Категории (4)</div>
          <div className="filter__header--right">Сбросить</div>
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
            setFilterValue("");
          }}
        >
          <input
            className="filter__input"
            type="text"
            placeholder="ключевые слова..."
            value={filterValue}
            onChange={({ target: { value } }) => setFilterValue(value)}
          />
          <div className="filter__add-button">
            <img src={plus} alt="icon-plus" />
          </div>
        </form>

        <div className="filter-badges">
          <div className="filter-badges__single">Логотип</div>
          <div className="filter-badges__single">Landing page</div>
          <div className="filter-badges__single">Промо сайт</div>
        </div>
      </div>

      <div className="filter__price">
        <div className="filter__header">
          <div className="filter__header--left">Стоимость</div>
          <div className="filter__header--right">Сбросить</div>
        </div>

        <div className="price-range">
          <div className="price-range__info">
            <select name="select" className="price-range__select">
              <option>USD</option>
              <option>EUR</option>
              <option>UAH</option>
            </select>

            <input
              className="price-range__input"
              type="text"
              name="min"
              value={priceRange.min}
              onChange={onPriceRangeHandler}
            />

            <input
              className="price-range__input"
              type="text"
              name="max"
              value={priceRange.max}
              onChange={onPriceRangeHandler}
            />
          </div>
        </div>

        <input type="range" name="price" min="500" max="5000" step="100" />
      </div>
    </div>
  );
};

export default Filter;
