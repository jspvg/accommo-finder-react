import { useState } from "react";
import { AccState, Accommodation, Action } from "../utils/types";
import { amenityDisplayNames } from "../utils/functions";

interface AccommoCardProps {
  accommo: Accommodation;
  state: AccState;
  dispatch: React.Dispatch<Action>;
  setShowReservation: React.Dispatch<React.SetStateAction<boolean>>;
  finalPrice: number;
  setWantedAccomm: React.Dispatch<React.SetStateAction<number | null>>;
}

const AccommoCard = ({
  accommo,
  state,
  dispatch,
  setShowReservation,
  finalPrice,
  setWantedAccomm,
}: AccommoCardProps) => {
  const [isExtended, setIsExtended] = useState(false);

  const amenityKeys = Object.keys(accommo.amenities);
  const trueAmenities = amenityKeys.filter((key) => accommo.amenities[key]);

  const prices = accommo.pricelistInEuros.map((price) => price.pricePerNight);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = `${minPrice} - ${maxPrice}`;
  const hasSelectedDates =
    state.selectedDates.startDate.getTime() !==
    state.selectedDates.endDate.getTime();

  const displayedPrice = hasSelectedDates
    ? `${finalPrice === 0 ? "Nije dostupno" : finalPrice}`
    : `${priceRange}`;

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
        {isExtended ? "Vidi manje \u2191" : "Vidi više \u2193"}
      </button>
      {isExtended && (
        <div className="extended">
          <div className="available-amenities">
            {trueAmenities.map((amenity, index) => (
              <p className="small-card" key={index}>
                {amenityDisplayNames[amenity]}
              </p>
            ))}
          </div>
          {hasSelectedDates && finalPrice !== 0 ? (
            <button className="filter-btn" onClick={handleReservation}>
              Rezerviraj
            </button>
          ) : (
            <p>
              {finalPrice === 0 && hasSelectedDates
                ? "Apartman nije dostupan za željeni termin"
                : "Molimo odaberite željeni termin boravka u filteru pri vrhu stranice"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AccommoCard;
