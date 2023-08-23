import "./ReservationList.css";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservationList = async () => {
      try {
        const response = await fetch("http://localhost:5001/reservations");
        if (response.ok === false) {
          throw new Error("Could not display your reservations");
        }

        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservationList();
  }, []);

  return (
    <>
      <h1>Upcoming reservations</h1>
      {reservations.map((reservation) => (
        <div className="reservation" key={reservation.id}>
          <p className="restaurant-name">{reservation.restaurantName}</p>
          <p className="date">{formatDate(reservation.date)}</p>
          <Link to={`/reservations/${reservation.id}`} className="details">
            View details <code>&#8594;</code>
          </Link>
        </div>
      ))}
    </>
  );
};

export default ReservationList;
