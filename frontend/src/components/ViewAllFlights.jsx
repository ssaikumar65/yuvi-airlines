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

  const fetchFlights = async () => {
    try {
      const response = await axios.get(url);
      setFlights(response.data);
      setErrorMessage("");
    } catch (error) {
      if (!error.response) {
        setErrorMessage("Internal Server Error");
      } else if (error.response.status === 404) {
        setErrorMessage("Could not fetch flights data!");
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  return (
    <div className="container p-3">
      {flights.length > 0 ? (
        <div className="row">
          {flights.map((flight) => (
            <div className="col-md-4 col-sm-6 mb-3" key={flight.flightId}>
              <div className="card col">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="card-header"
                >
                  <span>{flight.aircraftName}</span>
                  <span
                    style={{
                      color:
                        flight.status.toLowerCase() === "cancelled"
                          ? "red"
                          : "green",
                    }}
                  >
                    {flight.status}
                  </span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Flight Id : {flight.flightId}</h5>
                  <p className="card-text">
                    {flight.source} {" -----> "} {flight.destination}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <button
                      disabled={flight.status.toLowerCase() === "cancelled"}
                      className="btn btn-primary btn-md btn-block"
                      onClick={() => navigate("/bookFlight/" + flight.flightId)}
                    >
                      Book
                    </button>
                    <span style={{ fontSize: "24px" }}>₹{flight.fare}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div align="center">
          <span className="text text-danger">
            {errorMessage || "Loading..."}
          </span>
        </div>
      )}
    </div>
  );
};

export default ViewAllFlights;
