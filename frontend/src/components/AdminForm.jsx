import AuthForm from "./AuthForm";
import { useAuth } from "../context/AuthContext";

const AdminForm = () => {
  const { user } = useAuth();

  return user ? (
    <Navigate to="/viewFlights" />
  ) : (
    <div className="home">
      <AuthForm type="login" />
    </div>
  );
};

export default AdminForm;
