import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import authActions from "../redux/auth/Actions";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    registerSuccess,
    isAuthenticated,
  } = useSelector((state) => state.authReducer);

  // ==========================================
  // AFTER REGISTRATION
  // ==========================================

  useEffect(() => {
    if (registerSuccess) {
      navigate("/login");
    }
  }, [registerSuccess, navigate]);

  // ==========================================
  // REGISTER SUBMIT
  // ==========================================

  const onSubmit = (data) => {
    console.log("Register data:", data);

    dispatch({
      type: authActions.USER_REGISTRATION,
      payload: data,
    });
  };

  return (
    <div className="login-page">

      {/* ======================================
          LEFT SIDE
      ====================================== */}

      <div className="login-decoration">
        <div className="login-circle circle-one" />
        <div className="login-circle circle-two" />

        <div className="login-brand-large">
          <div className="brand-logo large">
            IA
          </div>

          <h1>InventoryAI</h1>

          <p>
            Smarter inventory management
            <br />
            powered by intelligent insights.
          </p>
        </div>
      </div>

      {/* ======================================
          REGISTER CONTAINER
      ====================================== */}

      <div className="login-container">
        <div className="login-card">

          {/* Logo */}

          <div className="login-mobile-logo">
            <div className="brand-logo large">
              IA
            </div>
          </div>

          {/* Heading */}

          <div className="login-heading">
            <h2>Create account</h2>

            <p>
              Create your InventoryAI account
            </p>
          </div>

          {/* ==================================
              REGISTER FORM
          ================================== */}

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* NAME */}

            <div className="form-group">
              <label htmlFor="name">
                Full name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Name cannot exceed 50 characters",
                  },
                })}
              />

              {errors.name && (
                <span className="error">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* EMAIL */}

            <div className="form-group">
              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Enter a valid email address",
                  },
                })}
              />

              {errors.email && (
                <span className="error">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* PASSWORD */}

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="password-input">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "Password cannot exceed 50 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              {errors.password && (
                <span className="error">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* ROLE */}

            <div className="form-group">
              <label htmlFor="role">
                Role
              </label>

              <select
                id="role"
                {...register("role")}
              >
                <option value="admin">
                  Admin
                </option>

                <option value="manager">
                  Manager
                </option>

                <option value="staff">
                  Staff
                </option>
              </select>
            </div>

            {/* CREATE ACCOUNT */}

            <button
              type="submit"
              className="primary-button login-button"
            >
              Create Account
            </button>

          </form>

          {/* LOGIN LINK */}

          <div className="login-register-link">
            <span>
              Already have an account?
            </span>

            <button
              type="button"
              className="forgot-link register-btn"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </div>

          {/* FOOTER */}

          <div className="login-footer">
            <span>InventoryAI</span>
            <span>•</span>
            <span>
              Secure Inventory Management
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;