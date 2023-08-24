import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import "./Reservation.css";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Reservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState({});
  const [isNotFound, setIsNotFound] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  // Fetch a single reservation
  useEffect(() => {
    const fetchReservation = async () => {
      const accessToken = await getAccessTokenSilently();

      try {
        const response = await fetch(
          `http://localhost:5001/reservations/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok === false) {
          if (!response.status === 403) {
            setIsNotFound(true);
          }
          setIsError(true);
          throw new Error("Could not display your reservations");
        }

        const data = await response.json();
        setReservation(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservation();
  }, [id, getAccessTokenSilently]);

  // Not Found
  if (isNotFound) {
    return (
      <>
        <p className="error">Sorry! We can't find that reservation.</p>
        {/* <BackButton /> */}
      </>
    );
  }

  // An Error
  if (isError) {
    return (
      <>
        <p className="error">You are not authorized to see this reservation.</p>
        {/* <BackButton /> */}
      </>
    );
  }

  // Loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Reservation</h1>
      <div className="reservation-container">
        <h2>{reservation.restaurantName}</h2>
        <p className="date">{formatDate(reservation.date)}</p>
        <p className="party-size inline">Party size: </p>
        <p className="party-number inline">{reservation.partySize}</p>
      </div>
      {/* <BackButton /> */}
    </>
  );
};

export default Reservation;
