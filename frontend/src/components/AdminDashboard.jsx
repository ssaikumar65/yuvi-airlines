import { useState } from "react";
import axios from "axios";
const url = "http://localhost:5000/api/bookings";
const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const months = Array.from({ length: 12 }, (_, index) => ({
    label: `${index + 1}`,
    value: `${index + 1}`,
  }));

  const years = Array.from({ length: 11 }, (_, index) => ({
    label: `${2020 + index}`,
    value: `${2020 + index}`,
  }));

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        url + `/admin?year=${selectedYear}&month=${selectedMonth}`
      );
      setBookings(response.data);
      setErrorMessage("");
    } catch (error) {
      setBookings([]);
      setErrorMessage("No bookings found for the selected month and year.");
    }
  };
  const calculateTotal = (bookings) => {
    let totalCost = 0;
    let totalTickets = 0;

    bookings.forEach((booking) => {
      totalCost += booking.bookingCost;
      totalTickets += booking.noOfTickets;
    });

    return { totalCost, totalTickets };
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "24px",
        gap: "24px",
        color: "white",
      }}
    >
      <h2>Admin Dashboard</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      {bookings && bookings.length > 0 ? (
        <div className="card-body">
          <h4 style={{ marginTop: "24px" }}>
            Total Cost: {calculateTotal(bookings).totalCost}
          </h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Flight Id</th>
                <th>Booking Id</th>
                <th>Total tickets</th>
                <th>Total cost</th>
                <th>Date of Journey</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.customerId}</td>
                  <td>{booking.flightId}</td>
                  <td>{booking._id}</td>
                  <td>{booking.noOfTickets}</td>
                  <td>{booking.bookingCost}</td>
                  <td>{booking.dateOfJourney.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div align="center">
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
  );
};

export default AdminDashboard;
