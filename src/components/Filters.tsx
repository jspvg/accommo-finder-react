import { ChangeEvent, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AccState, Accommodations, Action } from "../utils/types";
import { amenityDisplayNames, handleFilter } from "../utils/functions";

interface FiltersProps {
  state: AccState;
  dispatch: React.Dispatch<Action>;
  accommodations: Accommodations;
}

const amenitiesList = [
  "airConditioning",
  "parkingSpace",
  "pets",
  "pool",
  "wifi",
  "tv",
];

const Filters = ({ state, dispatch, accommodations }: FiltersProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [localDates, setLocalDates] = useState(state.selectedDates);
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
            <p>Od: </p>
            <DatePicker
              selected={localDates.startDate}
              onChange={(date: Date) =>
                setLocalDates({
                  startDate: date,
                  endDate: localDates.endDate,
                })
              }
              selectsStart
              startDate={localDates.startDate}
              endDate={localDates.endDate}
              minDate={new Date("2024-01-01")}
              maxDate={new Date("2024-12-31")}
            />
          </div>
          <div className="date-align">
            <p>Do: </p>
            <DatePicker
              selected={localDates.endDate}
              onChange={(date: Date) =>
                setLocalDates({
                  startDate: localDates.startDate,
                  endDate: date,
                })
              }
              selectsEnd
              startDate={localDates.startDate}
              endDate={localDates.endDate}
              minDate={localDates.startDate}
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
            Pogodnosti {"\u2193"}
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
                  <label htmlFor={amenity}>
                    {amenityDisplayNames[amenity]}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => {
            dispatch({ type: "SET_DATES", payload: localDates });
            handleFilter(state, dispatch, accommodations);
          }}
          className="filter-btn"
        >
          Filriraj
        </button>
      </div>
    </>
  );
};

export default Filters;
