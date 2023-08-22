import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReservation from "./CreateReservation";
import "./Restaurant.css";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchUrl = await fetch(`http://localhost:5001/restaurants/${id}`);
        // FIXME: Make a fetch request and call setRestaurant with the response body

        // If the fecth request did not work
        if (fetchUrl.ok === false) {
          throw new Error("Could not fetch the restaurant.");
        }

        const data = await fetchUrl.json();
        setRestaurant(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <CreateReservation restaurantName={restaurant.name} />
      <div className="restaurant-container" key={restaurant.id}>
        <img
          className="restaurant-image"
          src={restaurant.image}
          alt={restaurant.name}
        />
        <h2 className="restaurant-name">{restaurant.name}</h2>
        <p className="restaurant-description">{restaurant.description}</p>
      </div>
    </>
  );
};

export default Restaurant;
