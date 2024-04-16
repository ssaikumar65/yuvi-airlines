import { Navigate } from "react-router-dom";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Home = () => {
  const { user } = useAuth();
  return user ? (
    <Navigate to={"/viewFlights"} />
  ) : (
    <div className="home">
      <Login />
      <Register />
    </div>
  );
};

export default Home;
