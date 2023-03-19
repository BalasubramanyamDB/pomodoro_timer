import React, { useEffect } from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "../../context";
import { DARK, DEFAULT } from "../../constants";
import { setLocalStorage } from "../../utils/localStorage";
import { ShowToast } from "../";

function Nav() {
  const { theme, setTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      ShowToast({ type: "success", message: "Logged out" });
    } catch (error) {}
  };
  useEffect(() => {
    if (theme === DARK || theme === DEFAULT) {
      setLocalStorage("theme", theme);
    }
  }, [theme]);
  return (
    <header className="nav-wrapper">
      <div className="nav mx-auto display-flex align-items-center justify-content-between">
        <Link className="nav-title px-9 txt-md txt-white" to="/">
          <i className="fas fa-stopwatch"></i> Buzzer Beater
        </Link>
        <div className="nav-icons px-9 display-flex align-items-center gap-1">
          {currentUser?.uid ? (
            <button
              onClick={handleLogout}
              className="txt-white nav-icon p-5 px-8">
              Logout
            </button>
          ) : (
            <Link to="/login" className="txt-white nav-icon p-5 px-8">
              Login
            </Link>
          )}
          <button
            onClick={() =>
              theme === DEFAULT ? setTheme(DARK) : setTheme(DEFAULT)
            }
            className="txt-white nav-darkmode-icon p-5">
            <i className="fas fa-moon"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export { Nav };
