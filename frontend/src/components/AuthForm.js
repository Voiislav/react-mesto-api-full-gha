function AuthForm({ handleSubmit, handleChange, submitButtonText, formValue }) {
  return (
    <form onSubmit={handleSubmit} className="register__form">
        <input
          onChange={handleChange}
          className="register__input"
          type="email"
          id="email"
          name="email"
          value={formValue.email}
          placeholder="Email"
          required
        ></input>
        <input
          onChange={handleChange}
          className="register__input"
          type="password"
          id="password"
          name="password"
          value={formValue.password}
          placeholder="Пароль"
          required
        ></input>
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="register__submit"
        >
          {submitButtonText}
        </button>
      </form>
  )
}

export default AuthForm;