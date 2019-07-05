import React, { useState, useContext } from "react";
import "./Account.scss";
import axios from "axios";
import Context from "../../context";

const Account = ({ history }) => {
  const [formFields, setFormFields] = useState({
    name: "",
    surname: "",
    name_customer: "",
    role: 2
  });

  console.log(formFields);

  const { state } = useContext(Context);

  //   const initialValues = Object.keys(formFields).reduce((result, field) => {
  //     return {
  //       ...result,
  //       [field]: [`${field} введен правильно`]
  //     };
  //   }, {});
  //   const [formErrors, setFormErrors] = useState({ ...initialValues });

  const onInputHandler = ({ target: { name, value } }) => {
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

    const options = {
      method: "POST",
      headers: {
        Authorization: state.token,
        "Content-Type": "application/json"
      },
      data: formFields,
      url: "http://68.183.119.148/api/edit-user"
    };

    await axios(options)
      .then(response => {
        // console.log(response);
        alert("Данные успешно изменены");
        history.push("/home");
      })
      .catch(err => alert("Ошибка изменения данных"));
  };

  return (
    <div className="Account">
      <form onSubmit={onSubmitHandler}>
        {/* {Object.keys(formErrors).map(error => {
          const val = formErrors[error][0];
          return !val.match(/правильно/gi) ? (
            <p key={error} className="error-field">
              {val}
            </p>
          ) : null;
        })} */}

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

        <button className="form__submit" type="submit">
          Изменить
        </button>
      </form>
    </div>
  );
};

export default Account;
