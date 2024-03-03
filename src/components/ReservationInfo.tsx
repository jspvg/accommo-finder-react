interface ReservationInfoProps {
  title: string;
  selectedDates: { startDate: Date; endDate: Date };
  numPeople: number;
  finalPrice: number;
}

const ReservationInfo = ({
  title,
  selectedDates,
  numPeople,
  finalPrice,
}: ReservationInfoProps) => {
  return (
    <div className="reservation-info">
      <h2>Uspješno ste rezervirali smještaj {title}</h2>
      <h4>Detalji:</h4>
      <p>
        Rezervirani termin: <br /> {selectedDates.startDate.toISOString().slice(0, 10)}{" "}
        - {selectedDates.endDate.toISOString().slice(0, 10)}
      </p>
      <p>Broj osoba: {!numPeople ? "nije određeno" : numPeople}</p>
      <p>Ukupna cijena: {finalPrice} €</p>

      <a href="/" className="simple-btn">
        Natrag na početnu
      </a>
    </div>
  );
};

export default ReservationInfo;
