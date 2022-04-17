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

export const extractMonth = (month: number) => {
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

  return monthNames[month - 1]
}

export const extractMonthFromDate = (date: string) => {
  const datePart = date.split('/')
  return Number(datePart[0])
}