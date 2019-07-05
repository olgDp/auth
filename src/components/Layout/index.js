import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import "./layout.scss";
import search from "./search.svg";
import profile from "./avatar.svg";
import axios from "axios";
import Context from "../../context";

const Layout = ({ history }) => {
  const [inputText, setInputText] = useState("");

  const { state, dispatch } = useContext(Context);

  const onSubmitHandler = e => {
    e.preventDefault();
    setInputText("");
  };

  const onLogoutHandler = async () => {
    const options = {
      method: "POST",
      headers: {
        Authorization: state.token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: "http://68.183.119.148/api/logout"
    };

    await axios(options)
      .then(response => {
        localStorage.removeItem("token");
        dispatch({ type: "logout" });
        history.push("/login");
      })
      .catch(err => console.log(err));
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Exprts
      </Link>

      <div className="search">
        <img src={search} alt="icon" className="search__icon" />
        <form onSubmit={onSubmitHandler}>
          <input
            className="search__input"
            type="text"
            placeholder="Поиск экспертов, навыки..."
            value={inputText}
            onChange={({ target: { value } }) => setInputText(value)}
          />
        </form>
      </div>

      <nav className="header__nav">
        <a href="#">Эксперты</a>
        <a href="#">Вопросы</a>
        <a href="#">О нас</a>
      </nav>

      <div className="header__new-project">
        <a href="#">Создать проект</a>
      </div>

      <div className="profile">
        <img className="profile__icon" src={profile} alt="icon" />
        <div className="profile__dropdown">
          <ul className="profile__list">
            <li>
              {state.token ? (
                <Link to="/account">Личный кабиет</Link>
              ) : (
                <Link to="/login">Личный кабиет</Link>
              )}
            </li>
            {state.token && <li onClick={onLogoutHandler}>Выход</li>}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Layout);
