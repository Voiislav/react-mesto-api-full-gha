import React from "react";
import * as auth from "../auth.js";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm.js";

function Login({ handleLogin }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({ email: "", password: "" });
        }
        handleLogin();
        navigate("/react-mesto-auth", { replace: true });
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        }
        if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
      });
  }

  return (
    <main className="login">
      <h1 className="login__title">Вход</h1>
      <AuthForm handleSubmit={handleSubmit} handleChange={handleChange} submitButtonText="Войти" formValue={formValue}/>
    </main>
  );
}

export default Login;
