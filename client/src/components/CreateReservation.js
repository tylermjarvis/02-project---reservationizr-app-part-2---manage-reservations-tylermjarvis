import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAuth0 } from "@auth0/auth0-react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateReservation.css";

const CreateReservation = ({ restaurantName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [partySize, setPartySize] = useState();
  const [date, setDate] = useState(new Date());
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const navigate = useNavigate();

  // Authentication
  const { getAccessTokenSilently } = useAuth0();

  // Submit a reservation
  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();
    setIsLoading(true);

    const reservation = {
      partySize,
      date: date,
      restaurantName,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/reservations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reservation),
      }
    );

    if (isError) {
      setIsError(true);
      setErrorStatus(response.status);
    } else {
      setIsLoading(false);
      navigate("/reservations");
    }
  };

  // Error
  if (isError) {
    return (
      <>
        <p className="reservation-error">
          There was an error while creating this reservation (error status{" "}
          {errorStatus})
        </p>
        <Link to="/restaurants" className="button">
          Return to restaurants
        </Link>
      </>
    );
  }

  // Loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="reservation-form-container">
        <h2 className="reservation-form-name">Reserve {restaurantName}</h2>
        <form className="reservation-form" onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="guest-number">
            Number of guests
          </label>
          <input
            type="number"
            id="guest-number"
            className="form-input"
            onChange={(event) => {
              setPartySize(event.target.value);
            }}
            required
            min="1"
          />
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <DatePicker
            id="date"
            className="form-input"
            selected={date}
            onChange={(date) => setDate(date)}
            showTimeSelect
            dateFormat="Pp"
            minDate={new Date()}
            required
          />
          <button className="submit-btn" disabled={isLoading}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateReservation;
