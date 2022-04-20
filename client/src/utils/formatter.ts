import { DateFormat } from './Interface'

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
]

export const dateFormatter = {
  formatDate: (date: string, type: DateFormat) => {
    const datePart = date.split('/')
    const month = monthNames[Number(datePart[0]) - 1]
    const day = datePart[1]
    const year = datePart[2]

    let formattedDate = ''

    if (type === DateFormat.MonthDay) {
      formattedDate = `${month}, ${day}`
    } else if (type === DateFormat.YearMonthDay) {
      formattedDate = `${year}, ${month} ${day}`
    }

    return formattedDate
  },
  getMonthNameFromDate: (month: number) => {
    return monthNames[month - 1]
  },  
  extractMonthFromDate: (date: string) => {
    const datePart = date.split('/')
    return Number(datePart[0])
  }
}

export const numberFormatter = {
  toIDRCurrency: (amount: number) => {
    let formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    })
  
    return formatter.format(amount).toString().slice(0, -3)
  }
}