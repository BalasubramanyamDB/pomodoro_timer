import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { TaskProvider, ThemeProvider, ModalProvider } from "./context";
import { AuthProvider } from "./context/auth-context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <Router>
      <ThemeProvider>
        <TaskProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </TaskProvider>
      </ThemeProvider>
    </Router>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
