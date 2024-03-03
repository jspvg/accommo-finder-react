import { useEffect, useState } from "react";
import AccommoCard from "../components/AccommoCard";
import Filters from "../components/Filters";
import { Accommodations as AType } from "../utils/types";
import { fetchAccommodations } from "../utils/api";

const Accommodations = () => {
  const [accommodations, setAccommodations] = useState<AType | null>(
    null
  );
  const [filteredAccommodations, setFilteredAccommodations] =
    useState<AType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAccommodations();
      setAccommodations(data);
      setFilteredAccommodations(data);
    };

    fetchData();
  }, []);

  if (!filteredAccommodations) {
    return <div>Loading accommodations...</div>;
  }

  return (
    <>
      <Filters
        accommodations={accommodations!}
        setFilteredAccommodations={setFilteredAccommodations}
      />
      <div className="accommodations">
        {filteredAccommodations.map((accommo) => (
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
