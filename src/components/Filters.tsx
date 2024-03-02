import { ChangeEvent, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const amenitiesList = [
  "airConditioning",
  "parkingSpace",
  "pets",
  "pool",
  "wifi",
  "tv",
];

const Filters = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [numPeople, setNumPeople] = useState(0);
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
    setSelectedAmenities((prevAmenities) =>
      prevAmenities.includes(amenity)
        ? prevAmenities.filter((a) => a !== amenity)
        : [...prevAmenities, amenity]
    );
  };

  const handlePeopleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNumPeople(parseInt(event.target.value));
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
    /*
    TODO: ADD LOGIC
    */
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
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className="date-align">
            <p>To: </p>
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
        </div>

        <figure>
          <img src="/people.svg" alt="People:" />
          <input
            type="number"
            min="1"
            placeholder="npr. 3"
            value={numPeople}
            onChange={handlePeopleChange}
          />
        </figure>
        <div className="amenities" ref={dropdownRef}>
          <button onClick={toggleDropdown}>Amenities {"\u2193"}</button>
          {isOpen && (
            <div className="amenities-dropdown">
              {amenitiesList.map((amenity) => (
                <div key={amenity}>
                  <input
                    type="checkbox"
                    id={amenity}
                    name={amenity}
                    checked={selectedAmenities.includes(amenity)}
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
