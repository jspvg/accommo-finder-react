interface ReservationInfoProps {
  title: string;
  startDate: string;
  endDate: string;
  numPeople: number;
  finalPrice: number;
}

const ReservationInfo = ({
  title,
  startDate,
  endDate,
  numPeople,
  finalPrice,
}: ReservationInfoProps) => {
  return (
    <div className="reservation-info">
      <h2>Uspješno ste rezervirali smještaj {title}</h2>
      <h4>Detalji:</h4>
      <p>
        Rezervirani termin: {startDate} - {endDate}
      </p>
      <p>Broj osoba: {numPeople}</p>
      <p>Ukupna cijena: {finalPrice}</p>

      <a href="/" className="simple-btn">Natrag na početnu</a>
    </div>
  );
};

export default ReservationInfo;
