import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const bookingUrl = "http://localhost:5000/api/bookings";
const flightUrl = "http://localhost:5000/api/flights";

const CreateBooking = () => {
  const location = useLocation();
  const { user } = useAuth();
  const flightId = location.pathname.split("/")[2];
  const [flight, setFlight] = useState({});
  const [form, setForm] = useState({
    customerId: user.username || "",
    flightId: flight.flightId || "",
    noOfTickets: "",
    bookingCost: "",
  });
  const [formErrorMessage, setFormErrorMessage] = useState({
    customerId: "",
    flightId: "",
    noOfTickets: "",
    bookingCost: "",
  });
  const [formValid, setFormValid] = useState({
    customerId: false,
    flightId: true,
    noOfTickets: false,
    bookingCost: false,
    buttonActive: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchFlight();
  }, []);

  const fetchFlight = () => {
    axios
      .get(flightUrl + "/" + flightId)
      .then((response) => {
        const data = response.data;
        setFlight(data[0]);
        setForm(data[0]);
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response === undefined) {
          setErrorMessage("Start your JSON server");
        } else if (error.response.status === 500) {
          setErrorMessage("Could not fetch flights data");
        } else {
          setErrorMessage("Something went wrong");
        }
      });
  };

  const submitBooking = () => {
    const bookingCost = flight.fare * form.noOfTickets;

    const newForm = {
      customerId: user.username,
      flightId: form.flightId,
      noOfTickets: form.noOfTickets,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    submitBooking();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let newFormErrorMessage = { ...formErrorMessage };
    let newFormValid = { ...formValid };

    switch (fieldName) {
      case "noOfTickets":
        if (value === "") {
          newFormErrorMessage.noOfTickets = "Field is required";
          newFormValid.noOfTickets = false;
        } else if (value <= 0 || value > 10) {
          newFormErrorMessage.noOfTickets =
            "No of tickets should be greater than 0 and less than 10";
          newFormValid.noOfTickets = false;
        } else {
          newFormErrorMessage.noOfTickets = "";
          newFormValid.noOfTickets = true;
        }
        break;
      default:
        break;
    }

    newFormValid.buttonActive = newFormValid.noOfTickets;

    setFormErrorMessage(newFormErrorMessage);
    setFormValid(newFormValid);
  };

  return (
    <div className="CreateBooking">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <br />
          <div className="card">
            <div className="card-header bg-custom">
              <h3>Flight Booking Form</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <span>Flight Name : {form.aircraftName}</span>
                </div>

                <div className="form-group">
                  <label htmlFor="customerId">Customer Id:</label>
                  <input
                    type="text"
                    id="customerId"
                    className="form-control"
                    value={user.username || ""}
                    onChange={handleChange}
                    name="customerId"
                    disabled
                  />
                  <span name="customerIdError" className="text-danger">
                    {formErrorMessage.customerId}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="flightId">Flight Id:</label>
                  <input
                    type="text"
                    id="flightId"
                    className="form-control"
                    value={form.flightId || ""}
                    name="flightId"
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bookingCost">No of tickets:</label>
                  <input
                    type="number"
                    name="bookingCost"
                    id="bookingCost"
                    className="form-control"
                    value={form.fare || ""}
                    disabled
                  />
                  <span name="bookingCostError" className="text-danger">
                    {formErrorMessage.bookingCost}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="noOfTickets">No of tickets:</label>
                  <input
                    type="number"
                    name="noOfTickets"
                    id="noOfTickets"
                    className="form-control"
                    value={form.noOfTickets || ""}
                    onChange={handleChange}
                    placeholder="min-1 max-10"
                  />
                  <span name="noOfTicketsError" className="text-danger">
                    {formErrorMessage.noOfTickets}
                  </span>
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    disabled={!formValid.buttonActive}
                    className="btn btn-primary"
                    id="bookingBtn"
                  >
                    Book Flight
                  </button>
                </div>
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
      </div>
    </div>
  );
};

export default CreateBooking;
