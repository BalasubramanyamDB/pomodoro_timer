import React, { useState } from "react";
import { useFormik } from "formik";
import { FormError, Loader, ShowToast } from "../../components";
import * as Yup from "yup";
import { useDocumentTitle } from "../../hooks";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import { useAuth } from "../../context";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

const Signup = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
      password: Yup.string()
        .required("This field is required")
        .min(8, "Password shoud be minimum of 8 characters"),
      confirmPassword: Yup.string()
        .required("This field is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      try {
        formik.setErrors({
          email: "",
          password: "",
          name: "",
          confirmPassword: "",
        });
        setLoading(true);
        await signUp(values.email, values.password);
        await updateProfile(auth.currentUser, { displayName: values.name });
        ShowToast({ type: "success", message: "Sign up Sucessful" });
        navigate("/", { replace: true });
      } catch (error) {
        error.code === "auth/email-already-in-use" &&
          formik.setErrors({ email: "Email already exists" });
        setLoading(false);
      }
      setLoading(false);
    },
  });

  useDocumentTitle("Signup | Buzzer Beater");
  return (
    <main className="min-75-vh display-flex justify-content-center align-items-center  ">
      <div className="login-wrapper display-flex justify-content-center align-items-center flex-col p-9 ">
        <h2 className="txt-white m-0 mb-12">Sign up</h2>
        <div className="auth-wrapper width-100 display-flex flex-col mx-auto px-9">
          <form
            className="width-100 auth-form display-flex flex-col gap-1"
            onSubmit={formik.handleSubmit}>
            <label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="input-field input--md form-input"
              />
            </label>
            {formik.errors.name && formik.touched.name && (
              <FormError>
                <i className="fa-solid fa-circle-info mr-3"></i>
                {formik.errors.name}
              </FormError>
            )}
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
            )}{" "}
            <label className="position-relative">
              <input
                type={passwordVisibility ? "text" : "password"}
                name="confirmPassword"
                className="input-field input--md form-input"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
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
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <FormError>
                <i className="fa-solid fa-circle-info mr-3"></i>
                {formik.errors.confirmPassword}
              </FormError>
            )}
            <button
              disabled={loading}
              type="submit"
              className="btn btn--md txt-white form-btn">
              {loading ? <Loader height="1rem" width="1rem" /> : "Sign up"}
            </button>
            <span className="txt-white txt-center ">
              Already have an account?{" "}
              <Link to="/login" className="btn btn-redirect">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </main>
  );
};

export { Signup };
