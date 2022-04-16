export const dateFormatter = (date: string) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const datePart = date.split('/')
  const formattedDate = `${monthNames[Number(datePart[0]) - 1]}, ${datePart[1]}`
  return formattedDate
}