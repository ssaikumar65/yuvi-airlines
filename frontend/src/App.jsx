import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { AuthProvider } from "./context/AuthContext.jsx";
const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};
export default App;
