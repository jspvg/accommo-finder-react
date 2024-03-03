import { AccState, Accommodations, Action } from "../types";

export const handleFilter = (
  state: AccState,
  dispatch: React.Dispatch<Action>,
  accommodations: Accommodations
) => {
  const filtered: Accommodations = accommodations.filter((accommo) => {
    // filter if user entered dates
    const isAvailableDates =
      state.selectedDates.startDate &&
      state.selectedDates.endDate &&
      state.selectedDates.startDate !== state.selectedDates.endDate
        ? accommo.availableDates.some((dateRange) => {
            const availableStartDate = new Date(dateRange.intervalStart);
            const availableEndDate = new Date(dateRange.intervalEnd);
            return (
              state.selectedDates.startDate >= availableStartDate &&
              state.selectedDates.endDate <= availableEndDate
            );
          })
        : true; // if no dates are selected, include all accommodations

    // filter if user entered number of people
    const canAccommodatePeople = state.numPeople
      ? state.numPeople <= accommo.capacity
      : true; // If no number of people is entered, include all accommodations

    // filter if user entered wanted amenities

    const hasSelectedAmenities =
      state.selectedAmenities.length > 0
        ? state.selectedAmenities.every((amenity) => accommo.amenities[amenity])
        : true; // if no amenities are selected, include all accommodations

    // include the accommodation in the filtered list if it passes all the filters
    return isAvailableDates && canAccommodatePeople && hasSelectedAmenities;
  });

  dispatch({ type: "SET_FILTERED_ACCOMMODATIONS", payload: filtered });
};
