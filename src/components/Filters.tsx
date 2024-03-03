import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Accommodations } from "../utils/types";

interface FiltersProps {
  accommodations: Accommodations;
  setFilteredAccommodations: React.Dispatch<
    React.SetStateAction<Accommodations | null>
  >;
}

interface FilterState {
  startDate: Date;
  endDate: Date;
  selectedAmenities: string[];
  numPeople: number;
}

type FilterAction =
  | { type: "SET_START_DATE"; payload: Date }
  | { type: "SET_END_DATE"; payload: Date }
  | { type: "SET_AMENITIES"; payload: string[] }
  | { type: "SET_NUM_PEOPLE"; payload: number };

const reducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "SET_AMENITIES":
      return { ...state, selectedAmenities: action.payload };
    case "SET_NUM_PEOPLE":
      return { ...state, numPeople: action.payload };
    default:
      return state;
  }
};

const amenitiesList = [
  "airConditioning",
  "parkingSpace",
  "pets",
  "pool",
  "wifi",
  "tv",
];

const Filters = ({
  accommodations,
  setFilteredAccommodations,
}: FiltersProps) => {
  const [state, dispatch] = useReducer(reducer, {
    startDate: new Date(),
    endDate: new Date(),
    selectedAmenities: [],
    numPeople: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [areFiltersShown, setAreFiltersShown] = useState(false);
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleScreenResize = () => {
    if (window.innerWidth < 1024) {
      setIsScreenSmall(true);
    } else {
      setIsScreenSmall(false);
    }
  };

  useEffect(() => {
    handleScreenResize();
    window.addEventListener("resize", handleScreenResize);

    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  const handleAmenityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amenity = event.target.name;
    dispatch({
      type: "SET_AMENITIES",
      payload: state.selectedAmenities.includes(amenity)
        ? state.selectedAmenities.filter((a) => a !== amenity)
        : [...state.selectedAmenities, amenity],
    });
  };

  const handlePeopleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_NUM_PEOPLE", payload: parseInt(event.target.value) });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleFilter = () => {
    let filtered: Accommodations = [];
    // filter if user entered dates
    if (state.startDate && state.endDate && state.startDate !== state.endDate) {
      filtered = accommodations.filter((accommo) => {
        return accommo.availableDates.some((dateRange) => {
          const availableStartDate = new Date(dateRange.intervalStart);
          const availableEndDate = new Date(dateRange.intervalEnd);
          return (
            state.startDate >= availableStartDate &&
            state.endDate <= availableEndDate
          );
        });
      });
    }

    // filter if user entered number of people
    if (state.numPeople) {
      if (filtered.length > 0) {
        filtered = filtered.filter(
          (accommo) => state.numPeople <= accommo.capacity
        );
      } else {
        filtered = accommodations.filter(
          (accommo) => state.numPeople <= accommo.capacity
        );
      }
    }

    // filter if user entered wanted amenities
    if (state.selectedAmenities.length > 0) {
      if (filtered.length > 0) {
        filtered = filtered.filter((accommo) => {
          const hasSelectedAmenities = state.selectedAmenities.every(
            (amenity) => accommo.amenities[amenity]
          );
          return hasSelectedAmenities;
        });
      } else {
        filtered = accommodations.filter((accommo) => {
          const hasSelectedAmenities = state.selectedAmenities.every(
            (amenity) => accommo.amenities[amenity]
          );
          return hasSelectedAmenities;
        });
      }
    }

    setFilteredAccommodations(filtered);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleFilters = () => setAreFiltersShown(!areFiltersShown);

  return (
    <>
      {isScreenSmall && (
        <button
          className="filter-btn"
          onClick={toggleFilters}
          style={{ marginBottom: areFiltersShown ? "0" : "12px" }}
        >
          {areFiltersShown ? "Hide filters" : "Show filters"}
        </button>
      )}

      <div
        className="filters"
        style={isScreenSmall && !areFiltersShown ? { display: "none" } : {}}
      >
        <div className="date-picker">
          <div className="date-align">
            <p>From: </p>
            <DatePicker
              selected={state.startDate}
              onChange={(date: Date) =>
                dispatch({ type: "SET_START_DATE", payload: date })
              }
              selectsStart
              startDate={state.startDate}
              endDate={state.endDate}
              minDate={new Date("2024-01-01")}
              maxDate={new Date("2024-12-31")}
            />
          </div>
          <div className="date-align">
            <p>To: </p>
            <DatePicker
              selected={state.endDate}
              onChange={(date: Date) =>
                dispatch({ type: "SET_END_DATE", payload: date })
              }
              selectsEnd
              startDate={state.startDate}
              endDate={state.endDate}
              minDate={state.startDate}
              maxDate={new Date("20214-12-31")}
            />
          </div>
        </div>

        <figure>
          <img src="/people.svg" alt="People:" />
          <input
            type="number"
            min="1"
            placeholder="npr. 3"
            onChange={handlePeopleChange}
          />
        </figure>
        <div className="amenities" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="simple-btn">
            Amenities {"\u2193"}
          </button>
          {isOpen && (
            <div className="amenities-dropdown">
              {amenitiesList.map((amenity) => (
                <div key={amenity}>
                  <input
                    type="checkbox"
                    id={amenity}
                    name={amenity}
                    checked={state.selectedAmenities.includes(amenity)}
                    onChange={handleAmenityChange}
                  />
                  <label htmlFor={amenity}>{amenity}</label>
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={handleFilter} className="filter-btn">
          Filter
        </button>
      </div>
    </>
  );
};

export default Filters;
