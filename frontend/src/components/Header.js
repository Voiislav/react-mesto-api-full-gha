import logo from "../images/mesto_logo.svg";
import { Routes, Route, Link } from 'react-router-dom';

function Header({ onLogout, email }) {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
        <Routes>
        <Route path="/react-mesto-auth" element={<div className="header__menu"><p className="header__user-email">{email}</p><Link onClick={onLogout} className="header__link" to="/sign-in">Выйти</Link></div>} />
        <Route path="/sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>} />
        <Route path="/sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>} />
        </Routes>
      </header>
    </>
  );
}

export default Header;
