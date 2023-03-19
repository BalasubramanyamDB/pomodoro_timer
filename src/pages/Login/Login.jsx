import React, { useState } from "react";
import { useFormik } from "formik";
import { FormError, Loader, ShowToast } from "../../components";
import * as Yup from "yup";
import { useDocumentTitle } from "../../hooks";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context";

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { loginWithGoogle, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
      password: Yup.string()
        .required("This field is required")
        .min(8, "Password shoud be minimum of 8 characters"),
    }),
    onSubmit: async (values) => {
      try {
        formik.setErrors({
          email: "",
          password: "",
        });
        setLoading(true);
        await login(values.email, values.password);
        ShowToast({ type: "success", message: "Login Successful" });

        navigate(location?.state?.from?.pathname || "/", { replace: true });
      } catch (error) {
        error.code === "auth/user-not-found"
          ? formik.setErrors({ email: "Email not found" })
          : formik.setErrors({ password: "Incorrect password" });
        setLoading(false);
      }
      setLoading(false);
    },
  });
  const setLoginValues = () => {
    formik.setValues({
      email: "johndoe@gmail.com",
      password: "johndoe123",
    });
  };
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      formik.setErrors({ email: "", password: "" });
      setLoading(true);
      await loginWithGoogle();
      navigate("/", { replace: true });
    } catch (error) {
      ShowToast({ type: "error", message: "Something went wrong!" });
    }
    setLoading(false);
  };

  useDocumentTitle("Login | Buzzer Beater");
  return (
    <main className="min-75-vh display-flex justify-content-center align-items-center  ">
      <div className="login-wrapper display-flex justify-content-center align-items-center flex-col p-9 ">
        <h2 className="txt-white m-0 mb-12">Login</h2>
        <div className="auth-wrapper width-100 display-flex flex-col mx-auto px-9">
          <form
            className="width-100 auth-form display-flex flex-col gap-1"
            onSubmit={formik.handleSubmit}>
            <label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="input-field input--md form-input"
              />
            </label>
            {formik.errors.email && formik.touched.email && (
              <FormError>
                <i className="fa-solid fa-circle-info mr-3"></i>
                {formik.errors.email}
              </FormError>
            )}
            <label className="position-relative">
              <input
                type={passwordVisibility ? "text" : "password"}
                name="password"
                className="input-field input--md form-input"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <button
                type="button"
                onClick={() => setPasswordVisibility((visible) => !visible)}
                className="btn-password-visibility">
                <i
                  className={`fa-solid ${
                    passwordVisibility ? `fa-eye-slash` : `fa-eye`
                  }`}></i>
              </button>
            </label>
            {formik.errors.password && formik.touched.password && (
              <FormError>
                <i className="fa-solid fa-circle-info mr-3"></i>
                {formik.errors.password}
              </FormError>
            )}

            <button type="submit" className="btn btn--md txt-white form-btn">
              {loading ? <Loader height="1rem" width="1rem" /> : "Login"}
            </button>

            <span className="txt-white txt-center ">
              Don't have an account yet?{" "}
              <Link to="/signup" className="btn btn-redirect">
                Sign up
              </Link>
            </span>
          </form>
        </div>
      </div>
    </main>
  );
};

export { Login };
