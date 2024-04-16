import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:5000/api/flights";

const ViewAllFlights = () => {
  const [flights, setFlights] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = () => {
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        setFlights(data);
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response === undefined) {
          setErrorMessage("Internal Server Error");
        } else if (error.response.status === 404) {
          setErrorMessage("Could not fetch flights data!");
        } else {
          setErrorMessage("Something went wrong");
        }
      });
  };

  return (
    <div className="container p-3">
      {flights.length > 0 && (
        <div className="row">
          {flights.map((flight) => (
            <div className="col-md-4 col-sm-6 mb-3" key={flight.flightId}>
              <div className="card col">
                <div className="card-header">{flight.aircraftName}</div>
                <div className="card-body">
                  <h5 className="card-title">Flight Id : {flight.flightId}</h5>
                  <p className="card-text">Fare : Rs. {flight.fare}</p>
                  <button
                    className="btn btn-primary btn-md btn-block"
                    onClick={() => {
                      navigate("/bookFlight/" + flight.flightId);
                    }}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div align="center">
        <span name="errorMessage" className="text text-danger">
          {errorMessage}
        </span>
      </div>
    </div>
  );
};

export default ViewAllFlights;
