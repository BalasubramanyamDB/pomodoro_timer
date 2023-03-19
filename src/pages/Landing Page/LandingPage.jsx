import React from "react";
import "./LandingPage.css";
import { useDocumentTitle } from "../../hooks";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  useDocumentTitle("Home | Buzzer Beater");
  const navigate = useNavigate();
  return (
    <main className="landing-page-wrapper width-100 mx-auto display-flex flex-col align-items-center">
      <div className="landing-page-container display-flex flex-col align-items-center justify-content-center">
        <figure className="hero-img">
          <img
            className="img--responsive"
            src="https://res.cloudinary.com/clutchaf/image/upload/v1653049632/Buzzer%20Beater/Buzzer_Beater_Hero_dldmrc.svg"
            alt="hero"
          />
        </figure>
        <h1 className="txt-white">Stay focused, Stay productive!</h1>
      </div>
      <div className="display-flex justify-content-center">
        <button
          onClick={() => navigate("/tasks")}
          className="btn-hero px-9 py-5 txt-white">
          Get Started
        </button>
      </div>
    </main>
  );
}

export { LandingPage };
