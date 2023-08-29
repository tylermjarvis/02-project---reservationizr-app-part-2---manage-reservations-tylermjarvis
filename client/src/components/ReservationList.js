import "./ReservationList.css";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import BackButton from "./BackButton";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetching Reservations
  useEffect(() => {
    const fetchReservationList = async () => {
      const accessToken = await getAccessTokenSilently();

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/reservations`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok === false) {
          setIsError(true);
          throw new Error("Could not display your reservations");
        }

        const data = await response.json();
        setReservations(data);
        setIsLoading(false);
      } catch (error) {
        return error;
      }
    };

    fetchReservationList();
  }, [getAccessTokenSilently]);

  // Error
  if (isError) {
    return (
      <>
        <p>Could not display your reservations.</p>
        <BackButton />
      </>
    );
  }

  if (isLoading) {
    // Loading
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="reservation-container">
        <h1 className="reservation-list-heading">Upcoming reservations</h1>
        {reservations.length > 0 ? (
          <div className="reservation">
            {reservations.map((reservation) => (
              <ul className="reservation-list" key={reservation.id}>
                <li className="reservation-item">
                  <p className="restaurant-name">
                    {reservation.restaurantName}
                  </p>
                  <p className="date">{formatDate(reservation.date)}</p>
                  <Link
                    to={`/reservations/${reservation.id}`}
                    className="details"
                  >
                    View details <code>&#8594;</code>
                  </Link>
                </li>
              </ul>
            ))}
          </div>
        ) : (
          <div className="not-found-container">
            <p className="not-found-text">You don't have any reservations.</p>
            <Link to="/" className="not-found-link">
              View the restaurants
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ReservationList;
