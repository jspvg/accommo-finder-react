import AccommoCard from "../components/AccommoCard";
import Filters from "../components/Filters";

const testData = [
  {
    id: 1,
    title: "Apartman Sunce",
    image: "src/assets/acom1.jpg",
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
  },
  {
    id: 2,
    title: "Apartman Zlato",
    image: "src/assets/acom2.jpg",
    capacity: 2,
    amenities: {
      airConditioning: true,
      parkingSpace: true,
      pets: false,
      pool: true,
      wifi: true,
      tv: true,
    },
  },
  {
    id: 3,
    title: "Apartman Sunce",
    image: "src/assets/acom1.jpg",
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
  },
  {
    id: 4,
    title: "Apartman Zlato",
    image: "src/assets/acom2.jpg",
    capacity: 2,
    amenities: {
      airConditioning: true,
      parkingSpace: true,
      pets: false,
      pool: true,
      wifi: true,
      tv: true,
    },
  },
  {
    id: 5,
    title: "Apartman Zlato",
    image: "src/assets/acom2.jpg",
    capacity: 2,
    amenities: {
      airConditioning: true,
      parkingSpace: true,
      pets: false,
      pool: true,
      wifi: true,
      tv: true,
    },
  },
  {
    id: 6,
    title: "Apartman Zlato",
    image: "src/assets/acom2.jpg",
    capacity: 2,
    amenities: {
      airConditioning: true,
      parkingSpace: true,
      pets: false,
      pool: true,
      wifi: true,
      tv: true,
    },
  },
  {
    id: 7,
    title: "Apartman Zlato",
    image: "src/assets/acom2.jpg",
    capacity: 2,
    amenities: {
      airConditioning: true,
      parkingSpace: true,
      pets: false,
      pool: true,
      wifi: true,
      tv: true,
    },
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
            title={accommo.title}
            image={accommo.image}
            capacity={accommo.capacity}
            beachDistanceInMeters={accommo.beachDistanceInMeters}
          />
        ))}
      </div>
    </>
  );
};

export default Accommodations;
