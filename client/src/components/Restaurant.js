import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReservation from "./CreateReservation";
import "./Restaurant.css";
import BackButtonRestaurants from "./BackButtonRestaurants";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  // Fetching a single restaurant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/restaurants/${id}`);
        // FIXME: Make a fetch request and call setRestaurant with the response body

        // If the fetch request did not work
        if (response.ok === false) {
          if (response.status === 400) {
            setIsInvalid(true);
            throw new Error(
              response.status,
              response.text("That is an invalid restaurant")
            );
          }

          if (response.status === 404) {
            setIsNotFound(true);
          }
        }

        const data = await response.json();
        setRestaurant(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  // Not Found
  if (isNotFound) {
    return (
      <>
        <p className="error">Sorry! We can't find that restaurant.</p>
        <BackButtonRestaurants />
      </>
    );
  }

  // Is An Invalid Id
  if (isInvalid) {
    return (
      <>
        <p className="error">That is an invalid restaurant.</p>
        <BackButtonRestaurants />
      </>
    );
  }

  // Loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="booking-container" key={restaurant.id}>
        <img
          className="restaurant-image"
          src={restaurant.image}
          alt={restaurant.name}
        />
        <div className="text-container">
          <h1 className="booking-restaurant-name">{restaurant.name}</h1>
          <p className="restaurant-description">{restaurant.description}</p>
        </div>
      </div>
      <CreateReservation restaurantName={restaurant.name} />
    </>
  );
};

export default Restaurant;
