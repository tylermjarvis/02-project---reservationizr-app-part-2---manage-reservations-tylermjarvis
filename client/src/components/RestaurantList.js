import "./RestaurantList.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantsList = async () => {
      try {
        const fetchUrl = await fetch(
          `${process.env.REACT_APP_API_URL}/restaurants`
        );

        if (!fetchUrl.ok) {
          throw new Error("Could not fetch the restarants");
        }

        const data = await fetchUrl.json();
        setRestaurants(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRestaurantsList();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="restaurants-heading">Restaurants</h1>
      <div className="section-container">
        {restaurants.map((restaurant) => (
          <div className="restaurant-container" key={restaurant.id}>
            <img
              className="restaurant-image"
              src={restaurant.image}
              alt={restaurant.name}
            />
            <div className="text-container">
              <h2 className="restaurant-name">{restaurant.name}</h2>
              <p className="restaurant-description">{restaurant.description}</p>
            </div>
            <Link
              to={`/restaurants/${restaurant.id}`}
              className="reserve-button"
            >
              Reserve now <code>&#8594;</code>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default RestaurantList;
