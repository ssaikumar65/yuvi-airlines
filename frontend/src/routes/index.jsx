import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ViewAllFlights from "../components/ViewAllFlights.jsx";
import GetBooking from "../components/GetBooking.jsx";
import CreateBooking from "../components/CreateBooking.jsx";
import ProtectedRoute from "../routes/ProtectedRoute.jsx";
import Home from "../components/Home.jsx";
import PaymentForm from "../components/PaymentForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/viewFlights",
        element: <ViewAllFlights />,
      },
      {
        path: "/viewBookings",
        element: <ProtectedRoute component={GetBooking} />,
      },
      {
        path: "/bookFlight/payment",
        element: <ProtectedRoute component={PaymentForm} />,
      },
      {
        path: "/bookFlight/:flightId",
        element: <ProtectedRoute component={CreateBooking} />,
      },
      {
        path: "*",
        element: <ViewAllFlights />,
      },
    ],
  },
]);
export default router;
