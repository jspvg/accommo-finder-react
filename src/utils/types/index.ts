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
