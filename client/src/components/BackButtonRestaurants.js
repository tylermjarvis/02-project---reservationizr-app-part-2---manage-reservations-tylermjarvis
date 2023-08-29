import { Link } from "react-router-dom";

const BackButtonRestaurants = () => {
  return (
    <p className="center">
      <Link to="/" className="btn btn-center">
        &larr; Back to restaurants
      </Link>
    </p>
  );
};

export default BackButtonRestaurants;
