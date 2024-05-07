import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const AuthForm = ({ type }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccessMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const url = `http://localhost:5000/api/users/${type}`;

  const handleAuth = (e) => {
    e.preventDefault();
    const userData = { username, password, ...(type !== "login" && { name }) };

    axios
      .post(url, userData)
      .then((response) => {
        login(response.data);
        console.log(response.data);
        setSuccessMessage(
          type === "login"
            ? "User logged in successfully!!"
            : "User created successfully!!"
        );
        setErrorMessage("");
        if (response.data.isAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/viewFlights");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrorMessage(
            type === "login" ? "User doesn't exist" : "User already exists"
          );
          setSuccessMessage("");
        } else {
          setErrorMessage(
            type === "login"
              ? "Password doesn't match"
              : "User creation Failed!"
          );
          setSuccessMessage("");
        }
      });
  };

  return (
    <div className="card">
      <div className="card-header bg-custom">
        <h3>{type === "login" ? "Login" : "Register"}</h3>
      </div>
      <div className="card-body">
        <form
          style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
            width: "300px",
          }}
          onSubmit={handleAuth}
        >
          {type === "register" && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                required
              />
            </div>
          )}

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
            <button type="submit" className="btn btn-primary" id="authBtn">
              {type === "login" ? "Login" : "Register"}
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
  );
};

export default AuthForm;
