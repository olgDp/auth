import React, { useState, useContext } from "react";
import "./login.scss";
import axios from "axios";
import Context from "../../context";

const Login = ({ history }) => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: ""
  });

  const { dispatch } = useContext(Context);

  const initialValues = Object.keys(formFields).reduce((result, field) => {
    return {
      ...result,
      [field]: [`${field} введен правильно`]
    };
  }, {});
  const [formErrors, setFormErrors] = useState({ ...initialValues });

  const onInputHandler = ({ target: { name, value } }) => {
    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmitHandler = async e => {
    e.preventDefault();

    await axios
      .post("http://68.183.119.148/api/login", formFields)
      .then(({ data }) => {
        // console.log(data);

        if (data.status === true) {
          dispatch({ type: "login", payload: data.token });
          localStorage.setItem("token", data.token);
          history.push("/home");
        }

        if (data.message) {
          setFormErrors({ ...initialValues, ...data.message });
        }
      })
      .catch(err => {
        console.log(err);
        setFormErrors({ error: ["Ошибка входа. Проверьте вводимые данные"] });
      });
  };

  return (
    <div className="Login">
      <form onSubmit={onSubmitHandler}>
        {Object.keys(formErrors).map(error => {
          const val = formErrors[error][0];
          return !val.match(/правильно/gi) ? (
            <p key={error} className="error-field">
              {val}
            </p>
          ) : null;
        })}

        <div className="form-group">
          <label htmlFor="input-email">Email</label>
          <input
            required
            name="email"
            id="input-name"
            type="text"
            className="form-group__input"
            placeholder="Введите email"
            value={formFields["email"]}
            onChange={onInputHandler}
          />
        </div>

        <div className="form-group">
          <label htmlFor="input-password">Пароль</label>
          <input
            required
            name="password"
            id="input-password"
            type="password"
            className="form-group__input"
            placeholder="Введите имя"
            value={formFields["password"]}
            onChange={onInputHandler}
          />
        </div>

        <button className="form__submit" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
