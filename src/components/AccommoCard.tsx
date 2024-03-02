interface AccommoData {
  title: string;
  image: string;
  capacity: number;
  beachDistanceInMeters?: number;
}

const AccommoCard = ({
  title,
  image,
  capacity,
  beachDistanceInMeters,
}: AccommoData) => {
  return (
    <div className="accommo-card">
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <div className="accommo-info">
        <figure>
          <img src="/people.svg" alt="People:" />
          <figcaption>{capacity}</figcaption>
        </figure>
        {beachDistanceInMeters && (
          <figure>
            <img src="/beach.svg" alt="Beach distance:" />
            <figcaption>{beachDistanceInMeters}m</figcaption>
          </figure>
        )}
      </div>
    </div>
  );
};

export default AccommoCard;
