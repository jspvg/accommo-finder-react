import { useEffect, useReducer, useState } from "react";
import AccommoCard from "../components/AccommoCard";
import Filters from "../components/Filters";
import { Accommodations as AType, AccState, Action } from "../utils/types";
import { fetchAccommodations } from "../utils/api";

const initialState = {
  selectedDates: { startDate: new Date(), endDate: new Date() },
  numPeople: 0,
  selectedAmenities: [],
  filteredAccommodations: null,
  reservedAccommodation: null,
};



const reducer = (state: AccState, action: Action): AccState => {
  switch (action.type) {
    case "SET_DATES":
      return { ...state, selectedDates: action.payload };
    case "SET_NUM_PEOPLE":
      return { ...state, numPeople: action.payload };
    case "SET_AMENITIES":
      return { ...state, selectedAmenities: action.payload };
    case "SET_FILTERED_ACCOMMODATIONS":
      return { ...state, filteredAccommodations: action.payload };
    case "SET_RESERVED_ACCOMMODATION":
      return { ...state, reservedAccommodation: action.payload };
    default:
      return state;
  }
};

const Accommodations = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [accommodations, setAccommodations] = useState<AType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAccommodations();
      setAccommodations(data);
      dispatch({ type: "SET_FILTERED_ACCOMMODATIONS", payload: data as AType });
    };

    fetchData();
  }, []);

  if (!state.filteredAccommodations || !accommodations) {
    return <div>Loading accommodations...</div>;
  }

  return (
    <>
      <Filters
        state={state}
        dispatch={dispatch}
        accommodations={accommodations}
      />
      <div className="accommodations">
        {state.filteredAccommodations.map((accommo) => (
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
