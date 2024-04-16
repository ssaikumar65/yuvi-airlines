import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const url = "http://localhost:5000/api/users/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccessMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { username, password };
    axios
      .post(url, userData)
      .then((response) => {
        login(response.data);
        navigate("/viewFlights");
        setSuccessMessage("User logged in successfully!!");
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrorMessage("User doesn't exist");
          setSuccessMessage("");
        } else if (error.response.status === 401) {
          setErrorMessage("Password doesn't match");
          setSuccessMessage("");
        } else {
          setErrorMessage("Something went wrong");
          setSuccessMessage("");
        }
      });
  };

  return (
    <div className="row">
      <div className="col-md-16 offset-md-3">
        <br />
        <div className="card">
          <div className="card-header bg-custom">
            <h3>Login</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  required
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="bookingBtn"
                >
                  Login
                </button>
              </div>
            </form>
            <div align="center">
              <span
                name="successMessage"
                id="successMessage"
                className="text text-success"
              >
                {success}
              </span>
              <span
                name="errorMessage"
                id="errorMessage"
                className="text text-danger"
              >
                {errorMessage}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
