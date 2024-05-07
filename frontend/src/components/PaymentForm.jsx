import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const bookingUrl = "http://localhost:5000/api/bookings";

const PaymentForm = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const location = useLocation();
  const flight = location.state.flight;
  const noOfTickets = location.state.noOfTickets;
  const dateOfJourney = location.state.dateOfJourney;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const submitBooking = () => {
    const bookingCost = flight.fare * noOfTickets;

    const newBooking = {
      customerId: user.username,
      flightId: flight.flightId,
      noOfTickets: noOfTickets,
      bookingCost,
      dateOfJourney,
    };

    axios
      .post(bookingUrl, newBooking)
      .then(() => {
        setMessage("Booking done successfully!!");
      })
      .catch((error) => {
        setMessage("Booking Failed!");
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitBooking();
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <br />
        <div style={{ padding: "10px" }} className="card">
          <h2>Payment Form</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                required
                type="text"
                className="form-control"
                id="cardNumber"
                name="cardNumber"
                placeholder="Enter card number"
                value={paymentDetails.cardNumber}
                maxLength={16}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                required
                type="text"
                className="form-control"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                maxLength={5}
                value={paymentDetails.expiryDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                required
                type="text"
                className="form-control"
                id="cvv"
                name="cvv"
                placeholder="Enter CVV"
                value={paymentDetails.cvv}
                maxLength={3}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Payment
            </button>
          </form>
          <div align="center">
            <span
              className={
                message.includes("success") ? "text-success" : "text-danger"
              }
            >
              {message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
