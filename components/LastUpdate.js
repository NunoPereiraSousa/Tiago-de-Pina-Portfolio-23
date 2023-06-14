export default function LastUpdate({ date }) {
  const getMonth = () => {
    switch (new Date(date).getMonth()) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "Invalid month";
    }
  };

  const getDay = () =>
    new Date(date).getDay() < 10
      ? `0${new Date(date).getDay()}`
      : new Date(date).getDay();

  const getYear = () => new Date(date).getFullYear();

  const getHours = () =>
    new Date(date).getHours() < 10
      ? `0${new Date(date).getHours()}`
      : new Date(date).getHours();

  const getMinutes = () =>
    new Date(date).getMinutes() < 10
      ? `0${new Date(date).getMinutes()}`
      : new Date(date).getMinutes();
  return (
    <section className="last_update">
      <div className="last_update_wrapper">
        <p className="paragraph">
          Last update: {getMonth()} {getDay()}, {getYear()} -- {getHours()}:
          {getMinutes()}h
        </p>
      </div>
    </section>
  );
}
