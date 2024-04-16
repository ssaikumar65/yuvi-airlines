import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const url = "http://localhost:5000/api/bookings";

const GetBookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = () => {
    axios
      .get(url + "/user/" + user.username)
      .then((response) => {
        const data = response.data;
        setBookingData(data);
        setErrorMessage("");
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setErrorMessage("Bookings not found");
        } else if (error.response.status === 404) {
          setErrorMessage("Could not fetch booking data!");
        } else {
          setErrorMessage("Something went wrong");
        }
        setIsLoading(true);
      });
  };

  const deleteBooking = (id) => {
    axios
      .delete(url + "/" + id)
      .then(() => {
        fetchBooking();
        setSuccessMessage("Booking deleted successfully!!");
      })
      .catch((error) => {
        if (error.response === undefined) {
          setErrorMessage("Internal Server Error");
        } else if (error.response.status === 404) {
          setErrorMessage("Could not fetch booking data!");
        } else {
          setErrorMessage("Something went wrong");
        }
      });
  };

  return (
    <div className="GetBooking">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <br />
          <div className="card">
            <div className="card-header bg-custom">
              <h3 align="center">
                {isLoading && bookingData.length === 0
                  ? "Loading..."
                  : bookingData.length === 0 && !isLoading
                  ? "Booking list is empty. Please book a Flight!"
                  : "Booking Details"}
              </h3>
            </div>
            {bookingData && bookingData.length > 0 ? (
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Flight Id</th>
                      <th>Booking Id</th>
                      <th>Total tickets</th>
                      <th>Total cost</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingData.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.flightId}</td>
                        <td>{booking._id}</td>
                        <td>{booking.noOfTickets}</td>
                        <td>{booking.bookingCost}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => deleteBooking(booking._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div align="center">
                  <span className="text text-success">{successMessage}</span>
                  <span className="text text-danger">{errorMessage}</span>
                </div>
              </div>
            ) : (
              <div className="card-body">
                {errorMessage ? (
                  <span className="text-danger">{errorMessage}</span>
                ) : (
                  <span>No bookings to show</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetBookings;
