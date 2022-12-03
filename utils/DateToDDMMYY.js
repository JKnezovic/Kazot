const DateToDDMMYY = (Date, monthFormat = "text") => {
  if (!Date) return null;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date, month, year, monthText;
  date = Date.getDate();
  month = Date.getMonth() + 1;
  year = Date.getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  if (monthFormat === "text") {
    monthText = months[Date.getMonth()];
    return `${date} ${monthText} ${year}`;
  } else return `${date}/${month}/${year}`;
};

export default DateToDDMMYY;
