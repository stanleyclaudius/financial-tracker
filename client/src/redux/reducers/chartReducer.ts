import { dateFormatter } from './../../utils/formatter'
import { GET_MONTHLY_TRANSACTIONS, IGetMonthlyTransactionsType, IInsertTransactionType, IMonthlyTransaction, INSERT_TRANSACTION } from './../types/transactionTypes'

const initialState = {
  year: '',
  incomes: [],
  expenses: []
}


const chartReducer = (state: IMonthlyTransaction = initialState, action: IInsertTransactionType | IGetMonthlyTransactionsType) => {
  switch (action.type) {
    case GET_MONTHLY_TRANSACTIONS:
      return action.payload
    case INSERT_TRANSACTION:
      const transactionType = action.payload.type
      const year = new Date(`${action.payload.created_at}`).toLocaleDateString().split('/')[2]
      if (year !== state.year) return state
      if (transactionType === 'income') {
        const isMonthExists = state.incomes.find(item => item.month === dateFormatter.extractMonthFromDate(new Date(`${action.payload.created_at}`).toLocaleDateString()))
        if (isMonthExists) {
          return ({
            ...state,
            incomes: state.incomes.map(item => 
              item.month === dateFormatter.extractMonthFromDate(new Date(`${action.payload.created_at}`).toLocaleDateString())
              ? { ...item, sum: Number(item.sum) + action.payload.amount }
              : item
            )
          } as IMonthlyTransaction)
        } else {
          const newData = {
            month: dateFormatter.extractMonthFromDate(new Date(`${action.payload.created_at}`).toLocaleDateString()),
            sum: action.payload.amount
          }
          return ({ ...state, incomes: [ newData ] } as IMonthlyTransaction)
        }
      } else {
        const isMonthExists = state.expenses.find(item => item.month === dateFormatter.extractMonthFromDate(new Date(`${action.payload.created_at}`).toLocaleDateString()))
        if (isMonthExists) {
          return ({
            ...state,
            expenses: state.expenses.map(item => 
              item.month === dateFormatter.extractMonthFromDate(new Date(`${action.payload.created_at}`).toLocaleDateString())
              ? { ...item, sum: Number(item.sum) + action.payload.amount }
              : item
            )
          } as IMonthlyTransaction)
        } else {
          const newData = {
            month: dateFormatter.extractMonthFromDate(new Date(`${action.payload.created_at}`).toLocaleDateString()),
            sum: action.payload.amount
          }
          return ({ ...state, expenses: [ newData ] } as IMonthlyTransaction)
        }
      }
    default:
      return state
  }
}

export default chartReducer