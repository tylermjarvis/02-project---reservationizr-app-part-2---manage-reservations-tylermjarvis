import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import "./Reservation.css";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import BackButton from "./BackButton";

const Reservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState({});
  const [isNotFound, setIsNotFound] = useState(false);
  const [notAuthorized, setNotAuthorized] = useState(false);
  const [isForbidden, setIsForbidden] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
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
          if (response.status === 404) {
            setIsNotFound(true);
          }

          if (response.status === 400) {
            setIsInvalid(true);
            throw new Error(
              response.status,
              response.text("That is an invalid reservation")
            );
          }

          if (response.status === 401) {
            setNotAuthorized(true);
          }

          if (response.status === 403) {
            setIsForbidden(true);
            throw new Error(response.status, response.text("Forbidden"));
          }
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
        <BackButton />
      </>
    );
  }

  // Is An Invalid Id
  if (isInvalid) {
    return (
      <>
        <p className="error">That is an invalid reservation.</p>
        <BackButton />
      </>
    );
  }

  // Not Authorized
  if (notAuthorized) {
    return (
      <>
        <p className="error">You are not authorized to see this reservation.</p>
        <BackButton />
      </>
    );
  }

  // Forbidden
  if (isForbidden) {
    return (
      <>
        <p className="error">
          You are forbidden from viewing this reservation.
        </p>
        <BackButton />
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
      <div className="reservation-container-single">
        <h2>{reservation.restaurantName}</h2>
        <p className="date-single-reservation">
          {formatDate(reservation.date)}
        </p>
        <p className="party-size inline">Party size: </p>
        <p className="party-number inline">{reservation.partySize}</p>
      </div>
      <BackButton />
    </>
  );
};

export default Reservation;
