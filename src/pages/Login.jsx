import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Static login for now
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
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

      <div className="login-container">
        <div className="login-card">
          <div className="login-mobile-logo">
            <div className="brand-logo large">IA</div>
          </div>

          <div className="login-heading">
            <h2>Welcome back</h2>
            <p>
              Sign in to manage your inventory
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <div className="label-row">
                <label>Password</label>

                <button
                  type="button"
                  className="forgot-link"
                >
                  Forgot password?
                </button>
              </div>

              <div className="password-input">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
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
            </div>

            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button
              type="submit"
              className="primary-button login-button"
            >
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <span>InventoryAI</span>
            <span>•</span>
            <span>Secure Inventory Management</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;