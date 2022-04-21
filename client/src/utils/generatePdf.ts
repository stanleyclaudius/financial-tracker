import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { ITransaction } from '../redux/types/transactionTypes'
import { dateFormatter, numberFormatter } from './formatter'
import { DateFormat } from './Interface'

export const generatePdf = (transaction: ITransaction[], user: string) => {
  const doc = new jsPDF()

  const tableColumn = ['Date', 'Type', 'Purpose', 'Amount']
  const tableRows: string[][] = []
  let year = dateFormatter.formatDate(transaction[0].date, DateFormat.YearMonthDay).split(',')[0]

  transaction.forEach(item => {
    const date = item.date
    item.data.forEach(data => {
      const transactionData = [
        dateFormatter.formatDate(date, DateFormat.MonthDay),
        data.type,
        data.purpose,
        `${numberFormatter.toIDRCurrency(data.amount)},00`
      ]

      tableRows.push(transactionData)
    })
  })

  // @ts-ignore
  doc.autoTable(tableColumn, tableRows, { startY: 30 })
  doc.text(`${user} Transaction Report For Year ${year}`, 14, 20)
  doc.save(`Fintrack - ${user} Transaction Report (${year})`)
}