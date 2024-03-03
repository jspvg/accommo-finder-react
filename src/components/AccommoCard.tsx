import { useState } from "react";
import { Accommodation } from "../utils/types";

const AccommoCard = (accommo: Accommodation) => {
  const [isExtended, setIsExtended] = useState(false);

  const amenityKeys = Object.keys(accommo.amenities);
  const trueAmenities = amenityKeys.filter((key) => accommo.amenities[key]);

  const handleSeeMore = () => {
    setIsExtended(!isExtended);
  };

  const handleReservation = () => {
    alert("Successfully reserved!");
  };

  return (
    <div className="accommo-card">
      <h2>{accommo.title}</h2>
      <img src={accommo.image} alt={accommo.title} />
      <div className="accommo-info">
        <figure>
          <img src="/people.svg" alt="People:" />
          <figcaption>{accommo.capacity}</figcaption>
        </figure>
        {accommo.beachDistanceInMeters && (
          <figure>
            <img src="/beach.svg" alt="Beach distance:" />
            <figcaption>{accommo.beachDistanceInMeters}m</figcaption>
          </figure>
        )}
        {isExtended && (
          <figure>
            <img src="/euro.svg" alt="Euro" />
            <figcaption>{accommo.pricelistInEuros[0].pricePerNight}</figcaption>
          </figure>
        )}
      </div>
      <button id="see-more" onClick={handleSeeMore} className="simple-btn">
        {isExtended ? "See less \u2191" : "See more \u2193"}
      </button>
      {isExtended && (
        <div className="extended">
          <div className="available-amenities">
            {trueAmenities.map((amenity, index) => (
              <p className="small-card" key={index}>
                {amenity}
              </p>
            ))}
          </div>

          <button className="filter-btn" onClick={handleReservation}>
            Reserve
          </button>
        </div>
      )}
    </div>
  );
};

export default AccommoCard;
