import React, { useState } from "react";
import "./register.scss";
import axios from "axios";
import MaskedInput from "react-text-mask";

const Register = ({ history }) => {
  const [formFields, setFormFields] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    role: 2,
    name_customer: "",
    password: "",
    password_confirmation: ""
  });

  const initialValues = Object.keys(formFields).reduce((result, field) => {
    return {
      ...result,
      [field]: [`${field} введен правильно`]
    };
  }, {});

  const [formErrors, setFormErrors] = useState({ ...initialValues });

  const onInputHandler = ({ target: { name, value } }) => {
    // console.log(name, value);
    if (name === "role") {
      value === 2
        ? setFormFields({ ...formFields, [name]: parseInt(value) })
        : setFormFields({
            ...formFields,
            [name]: parseInt(value),
            ["name_customer"]: ""
          });
      return;
    }

    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmitHandler = async e => {
    e.preventDefault();

    await axios
      .post("http://68.183.119.148/api/register", formFields)
      .then(({ data }) => {
        // console.log(response.data);
        if (data.status === true) {
          alert("Пользователь успешно создан");
          history.push("/login");
        } else if (data.message)
          setFormErrors({ ...initialValues, ...data.message });
      })
      .catch(err => {
        console.log(err);
        setFormErrors({ error: ["Ошибка входа. Проверьте вводимые данные"] });
      });
  };

  return (
    <div className="register">
      <form className="form" onSubmit={onSubmitHandler}>
        <h3>Регистрация нового пользователя</h3>
        {Object.keys(formErrors).map(error => {
          const val = formErrors[error][0];
          return !val.match(/правильно/gi) ? (
            <p key={error} className="error-field">
              {val}
            </p>
          ) : null;
        })}

        <div className="form-columns">
          <div className="form-columns__item">
            <div className="form-group">
              <label htmlFor="input-name">Имя</label>
              <input
                required
                name="name"
                id="input-name"
                type="text"
                className="form-group__input"
                placeholder="Введите имя"
                value={formFields["name"]}
                onChange={onInputHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="input-surname">Фамилия</label>
              <input
                required
                name="surname"
                id="input-surname"
                type="text"
                className="form-group__input"
                placeholder="Введите фамилию"
                value={formFields["surname"]}
                onChange={onInputHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="input-email">Email</label>
              <input
                required
                id="input-email"
                type="email"
                name="email"
                className="form-group__input"
                placeholder="Введите email"
                value={formFields["email"]}
                onChange={onInputHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="input-phone">Телефон</label>
              {/* <input
                required
                id="input-phone"
                type="text"
                name="phone"
                className="form-group__input"
                placeholder="380XXXXXXXXXX"
                data-valid-example="380938429751"
                pattern="380\d{2}\d{7}"
                value={formFields["phone"]}
                onChange={onInputHandler}
              /> */}
              <MaskedInput
                required
                id="input-phone"
                type="text"
                name="phone"
                className="form-group__input"
                placeholder="380XXXXXXXXXX"
                // data-valid-example="380938429751"
                mask={[
                  "3",
                  "8",
                  "0",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/
                ]}
                value={formFields["phone"]}
                onChange={onInputHandler}
              />
            </div>

            <button className="form__submit" type="submit">
              Зарегестрироваться
            </button>
          </div>

          <div className="form-columns__item">
            <div className="form-group">
              <label htmlFor="input-role">Роль пользователя</label>
              <select
                required
                className="form-group__select"
                name="role"
                id="input-role"
                value={formFields["role"]}
                onChange={onInputHandler}
              >
                <option value={2}>Заказчик</option>
                <option value={1}>Поставщик</option>
              </select>
            </div>

            {formFields["role"] === 2 && (
              <div className="form-group">
                <label htmlFor="input-customer">Заказчик</label>
                <input
                  required
                  id="input-customer"
                  type="text"
                  name="name_customer"
                  className="form-group__input"
                  placeholder="Введите заказчика"
                  value={formFields["name_customer"]}
                  onChange={onInputHandler}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="input-password">Пароль</label>
              <input
                required
                id="input-password"
                type="password"
                name="password"
                className="form-group__input"
                placeholder="Введите пароль"
                value={formFields["password"]}
                onChange={onInputHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="input-confirm-password">Повторите пароль</label>
              <input
                required
                id="input-confirm-password"
                type="password"
                name="password_confirmation"
                className="form-group__input"
                placeholder="Введите пароль"
                value={formFields["password_confirmation"]}
                onChange={onInputHandler}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
