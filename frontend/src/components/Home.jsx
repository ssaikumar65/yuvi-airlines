import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AuthForm from "./AuthForm";

const Home = () => {
  const { user } = useAuth();
  return user ? (
    <Navigate to={"/viewFlights"} />
  ) : (
    <div className="home">
      <AuthForm type="login" />
      <AuthForm type="register" />
    </div>
  );
};

export default Home;
