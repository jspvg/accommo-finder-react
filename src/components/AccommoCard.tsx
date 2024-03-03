import { useState } from "react";
import { AccState, Accommodation, Action } from "../utils/types";

interface AccommoCardProps {
  accommo: Accommodation;
  state: AccState;
  dispatch: React.Dispatch<Action>;
  setShowReservation: React.Dispatch<React.SetStateAction<boolean>>;
  finalPrice: number;
  setWantedAccomm:  React.Dispatch<React.SetStateAction<number | null>>;
}

const AccommoCard = ({
  accommo,
  state,
  dispatch,
  setShowReservation,
  finalPrice,
  setWantedAccomm
}: AccommoCardProps) => {
  const [isExtended, setIsExtended] = useState(false);

  const amenityKeys = Object.keys(accommo.amenities);
  const trueAmenities = amenityKeys.filter((key) => accommo.amenities[key]);

  const prices = accommo.pricelistInEuros.map((price) => price.pricePerNight);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = `${minPrice} - ${maxPrice}`;
  const hasSelectedDates =
    state.selectedDates.startDate.getTime() !== state.selectedDates.endDate.getTime();

  const displayedPrice = hasSelectedDates ? `${finalPrice}` : `${priceRange}`;

  const handleSeeMore = () => {
    setIsExtended(!isExtended);
  };

  const handleReservation = () => {
    dispatch({ type: "SET_RESERVED_ACCOMMODATION", payload: accommo });
    setWantedAccomm(accommo.id);
    setShowReservation(true);
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
            <figcaption>{displayedPrice}</figcaption>
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
          {hasSelectedDates ? (
            <button className="filter-btn" onClick={handleReservation}>
              Reserve
            </button>
          ) : (
            <p>
              Please select the wanted dates in the filter to see exact prices
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AccommoCard;
