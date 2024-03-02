import AccommoCard from "../components/AccommoCard";
import Filters from "../components/Filters";
import { Accomodations } from "../utils/types";

const testData: Accomodations = [
  {
    id: 1,
    title: "Apartman Sunce",
    image:
      "https://i.croatiaimages.com/private-accommodation/1005/a-1005-a/mastrinka-apartment-living-room-1.jpg",
    capacity: 4,
    beachDistanceInMeters: 250,
    amenities: {
      airConditioning: true,
      parkingSpace: true,
      pets: false,
      pool: false,
      wifi: true,
      tv: true,
    },
    pricelistInEuros: [
      {
        intervalStart: "2024-05-01",
        intervalEnd: "2024-06-01",
        pricePerNight: 50,
      },
      {
        intervalStart: "2024-06-01",
        intervalEnd: "2024-07-01",
        pricePerNight: 60,
      },
      {
        intervalStart: "2024-07-01",
        intervalEnd: "2024-09-01",
        pricePerNight: 80,
      },
      {
        intervalStart: "2024-09-01",
        intervalEnd: "2024-10-01",
        pricePerNight: 60,
      },
    ],
    availableDates: [
      {
        intervalStart: "2024-05-01",
        intervalEnd: "2024-05-23",
      },
      {
        intervalStart: "2024-05-24",
        intervalEnd: "2024-06-07",
      },
      {
        intervalStart: "2024-06-14",
        intervalEnd: "2024-07-03",
      },
      {
        intervalStart: "2024-07-22",
        intervalEnd: "2024-07-29",
      },
      {
        intervalStart: "2024-08-12",
        intervalEnd: "2024-08-30",
      },
      {
        intervalStart: "2024-09-03",
        intervalEnd: "2024-10-01",
      },
    ],
  },
  {
    id: 2,
    title: "Villa Antonio",
    image:
      "https://i.croatiaimages.com/private-accommodation/4329/dalmatia-holiday-house-with-pool-property-1.jpg",
    capacity: 8,
    beachDistanceInMeters: 75,
    amenities: {
      airConditioning: true,
      parkingSpace: true,
      pets: true,
      pool: true,
      wifi: true,
      tv: true,
    },
    pricelistInEuros: [
      {
        intervalStart: "2024-01-01",
        intervalEnd: "2024-07-01",
        pricePerNight: 220,
      },
      {
        intervalStart: "2024-07-01",
        intervalEnd: "2024-09-01",
        pricePerNight: 300,
      },
      {
        intervalStart: "2024-09-01",
        intervalEnd: "2024-01-01",
        pricePerNight: 220,
      },
    ],
    availableDates: [
      {
        intervalStart: "2024-06-25",
        intervalEnd: "2024-07-03",
      },
      {
        intervalStart: "2024-07-16",
        intervalEnd: "2024-07-17",
      },
      {
        intervalStart: "2024-08-19",
        intervalEnd: "2024-08-26",
      },
      {
        intervalStart: "2024-09-15",
        intervalEnd: "2024-11-13",
      },
      {
        intervalStart: "2024-11-15",
        intervalEnd: "2024-01-01",
      },
    ],
  },
];

const Accommodations = () => {
  return (
    <>
      <Filters />
      <div className="accommodations">
        {testData.map((accommo) => (
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
