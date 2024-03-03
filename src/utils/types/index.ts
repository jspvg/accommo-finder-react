export type Amenities = {
  airConditioning: boolean;
  parkingSpace: boolean;
  pets: boolean;
  pool: boolean;
  wifi: boolean;
  tv: boolean;
  [key: string]: boolean;
};

export type PriceList = {
  intervalStart: string;
  intervalEnd: string;
  pricePerNight: number;
};

export type AvailableDates = {
  intervalStart: string;
  intervalEnd: string;
};

export type Accommodation = {
  id: number;
  title: string;
  image: string;
  capacity: number;
  beachDistanceInMeters: number;
  amenities: Amenities;
  pricelistInEuros: PriceList[];
  availableDates: AvailableDates[];
};

export type Accommodations = Accommodation[];

export type AccState = {
  selectedDates: { startDate: Date; endDate: Date };
  numPeople: number;
  selectedAmenities: string[];
  filteredAccommodations: Accommodation[] | null;
  reservedAccommodation: Accommodation | null;
};

export type Action =
  | { type: "SET_DATES"; payload: { startDate: Date; endDate: Date } }
  | { type: "SET_NUM_PEOPLE"; payload: number }
  | { type: "SET_AMENITIES"; payload: string[] }
  | { type: "SET_FILTERED_ACCOMMODATIONS"; payload: Accommodation[] }
  | { type: "SET_RESERVED_ACCOMMODATION"; payload: Accommodation };
