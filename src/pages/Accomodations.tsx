import { useEffect, useState } from "react";
import AccommoCard from "../components/AccommoCard";
import Filters from "../components/Filters";
import { Accomodations } from "../utils/types";
import { fetchAccommodations } from "../utils/api";

const Accommodations = () => {
  const [accomodations, setAccommodations] = useState<Accomodations | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAccommodations();
      setAccommodations(data);
    };

    fetchData();
  }, []);

  if (!accomodations) {
    return <div>Loading accommodations...</div>;
  }

  return (
    <>
      <Filters />
      <div className="accommodations">
        {accomodations.map((accommo) => (
          <AccommoCard
            key={accommo.id}
            id={accommo.id}
            title={accommo.title}
            image={accommo.image}
            amenities={accommo.amenities}
            capacity={accommo.capacity}
            beachDistanceInMeters={accommo.beachDistanceInMeters}
            pricelistInEuros={accommo.pricelistInEuros}
            availableDates={accommo.availableDates}
          />
        ))}
      </div>
    </>
  );
};

export default Accommodations;
