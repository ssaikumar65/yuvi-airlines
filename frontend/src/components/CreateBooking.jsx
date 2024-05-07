import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const flightUrl = "http://localhost:5000/api/flights";

const CreateBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const flightId = location.pathname.split("/")[2];
  const [flight, setFlight] = useState({});
  const [form, setForm] = useState({
    customerId: user.username || "",
    flightId: "",
    noOfTickets: "",
    bookingCost: "",
    dateOfJourney: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const [formValid, setFormValid] = useState({});

  useEffect(() => {
    fetchFlight();
  }, []);

  const fetchFlight = async () => {
    try {
      const response = await axios.get(`${flightUrl}/${flightId}`);
      const data = response.data[0];
      setFlight(data);
      setForm((prevForm) => ({
        ...prevForm,
        flightId: data.flightId,
        bookingCost: data.fare,
      }));
      setErrorMessage("");
    } catch (error) {
      if (!error.response) {
        setErrorMessage("Start your JSON server");
      } else if (error.response.status === 500) {
        setErrorMessage("Could not fetch flights data");
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/bookFlight/payment", {
      state: {
        flight,
        noOfTickets: form.noOfTickets,
        dateOfJourney: form.dateOfJourney,
      },
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let newFormErrorMessage = { ...formErrorMessage };
    let newFormValid = { ...formValid };

    switch (fieldName) {
      case "noOfTickets":
        if (value === "" || value <= 0 || value > 10) {
          newFormErrorMessage.noOfTickets =
            "No of tickets should be between 1 and 10";
          newFormValid.noOfTickets = false;
        } else {
          newFormErrorMessage.noOfTickets = "";
          newFormValid.noOfTickets = true;
        }
        break;
      case "dateOfJourney":
        if (value === "") {
          newFormErrorMessage.dateOfJourney = "Field is required";
          newFormValid.dateOfJourney = false;
        } else {
          newFormErrorMessage.dateOfJourney = "";
          newFormValid.dateOfJourney = true;
        }
        break;
      default:
        break;
    }

    newFormValid.buttonActive =
      newFormValid.noOfTickets && newFormValid.dateOfJourney;

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
                  <span>Flight Name : {flight.aircraftName}</span>
                  <p className="card-text">
                    {flight.source} {"----->"} {flight.destination}
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="customerId">Customer Id:</label>
                  <input
                    type="text"
                    id="customerId"
                    className="form-control"
                    value={form.customerId}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="flightId">Flight Id:</label>
                  <input
                    type="text"
                    id="flightId"
                    className="form-control"
                    value={form.flightId}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bookingCost">Fare:</label>
                  <input
                    type="number"
                    name="bookingCost"
                    id="bookingCost"
                    className="form-control"
                    value={form.bookingCost}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="noOfTickets">No of tickets:</label>
                  <input
                    type="number"
                    name="noOfTickets"
                    id="noOfTickets"
                    className="form-control"
                    value={form.noOfTickets}
                    onChange={handleChange}
                    placeholder="min-1 max-10"
                  />
                  <span className="text-danger">
                    {formErrorMessage.noOfTickets}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfJourney">Date of journey:</label>
                  <input
                    type="date"
                    name="dateOfJourney"
                    id="dateOfJourney"
                    className="form-control"
                    value={form.dateOfJourney}
                    onChange={handleChange}
                  />
                  <span className="text-danger">
                    {formErrorMessage.dateOfJourney}
                  </span>
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    disabled={!formValid.buttonActive}
                    className="btn btn-primary"
                  >
                    Checkout
                  </button>
                </div>
              </form>
              <div align="center">
                <span id="errorMessage" className="text text-danger">
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
