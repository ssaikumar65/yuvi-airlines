import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const bookingUrl = "http://localhost:5000/api/bookings";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const { user } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();
  const flight = location.state.flight;
  const noOfTickets = location.state.noOfTickets;

  const submitBooking = () => {
    const bookingCost = flight.fare * noOfTickets;

    const newForm = {
      customerId: user.username,
      flightId: flight.flightId,
      noOfTickets: noOfTickets,
      bookingCost,
    };

    axios
      .post(bookingUrl, newForm)
      .then(() => {
        setSuccessMessage("Booking done successfully!!");
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response === undefined) {
          setErrorMessage("Something went wrong");
          setSuccessMessage("");
        } else if (error.response.status === 404) {
          setErrorMessage("Booking Failed!");
          setSuccessMessage("");
        }
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
                placeholder="Enter card number"
                value={cardNumber}
                maxLength={16}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                required
                type="text"
                className="form-control"
                id="expiryDate"
                placeholder="MM/YY"
                maxLength={5}
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                required
                type="text"
                className="form-control"
                id="cvv"
                placeholder="Enter CVV"
                value={cvv}
                maxLength={3}
                onChange={(e) => setCVV(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Payment
            </button>
          </form>
          <div align="center">
            <span
              name="successMessage"
              id="successMessage"
              className="text text-success"
            >
              {successMessage}
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
  );
};

export default PaymentForm;
