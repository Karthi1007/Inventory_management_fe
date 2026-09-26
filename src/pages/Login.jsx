import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import authActions from "../redux/auth/Actions";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isAuthenticated } = useSelector(
    (state) => state.authReducer
  );

  // ==========================================
  // REDIRECT AFTER LOGIN
  // ==========================================

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // ==========================================
  // LOGIN SUBMIT
  // ==========================================

  const onSubmit = (data) => {
    console.log("Login data:", data);

    dispatch({
      type: authActions.USER_LOGIN,
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
          <div className="brand-logo large">IA</div>

          <h1>InventoryAI</h1>

          <p>
            Smarter inventory management
            <br />
            powered by intelligent insights.
          </p>
        </div>
      </div>

      {/* ======================================
          LOGIN CONTAINER
      ====================================== */}

      <div className="login-container">
        <div className="login-card">

          {/* Mobile Logo */}
          <div className="login-mobile-logo">
            <div className="brand-logo large">IA</div>
          </div>

          {/* Heading */}
          <div className="login-heading">
            <h2>Welcome back</h2>

            <p>
              Sign in to manage your inventory
            </p>
          </div>

          {/* ==================================
              LOGIN FORM
          ================================== */}

          <form onSubmit={handleSubmit(onSubmit)}>

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

              <div className="label-row">
                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-link"
                  onClick={() => {
                    console.log("Forgot password clicked");
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <div className="password-input">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
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
<button
  type="button"
  className="forgot-link register-btn"
  onClick={() => navigate("/register")}
>
  Create account
</button>
            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="primary-button login-button"
            >
              Sign In
            </button>

          </form>

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

export default Login;