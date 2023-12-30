import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../auth.js";
import AuthForm from "./AuthForm.js";

function Register({ onInfoTooltipOpen }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    auth
      .register(formValue.email, formValue.password)
      .then((res) => {
        if (res && !res.error) {
          onInfoTooltipOpen("success", "Вы успешно зарегистрировались!");
          navigate('/sign-in');
        }
      })
      .catch((err) => {
        onInfoTooltipOpen("error", "Что-то пошло не так! Попробуйте еще раз.");
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
      });
  }

  return (
    <main className="register">
      <h1 className="register__title">Регистрация</h1>
      <AuthForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        submitButtonText="Зарегистрироваться"
        formValue={formValue}
      />
      <Link to="/sign-in" className="register__login-link">
        Уже зарегистрированы? Войти
      </Link>
    </main>
  );
}

export default Register;
