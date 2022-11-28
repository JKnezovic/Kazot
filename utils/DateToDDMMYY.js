const DateToDDMMYY = (Date) => {
  if (!Date) return null;

  let date, month, year;
  date = Date.getDate();
  month = Date.getMonth() + 1;
  year = Date.getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${date}/${month}/${year}`;
};

export default DateToDDMMYY;
