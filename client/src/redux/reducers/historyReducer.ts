import { ITransaction, IGetAllTransactionsType, GET_ALL_TRANSACTIONS, INSERT_TRANSACTION, IInsertTransactionType } from './../types/transactionTypes'

const initialState: ITransaction[] = []

const historyReducer = (state: ITransaction[] = initialState, action: IInsertTransactionType | IGetAllTransactionsType) => {
  switch (action.type) {
    case GET_ALL_TRANSACTIONS:
      return action.payload
    case INSERT_TRANSACTION:
      const isDateExists = state.find(item => item.date === new Date(`${action.payload.created_at}`).toLocaleDateString())
      if (isDateExists) {
        return state.map(item => item.date === new Date(`${action.payload.created_at}`).toLocaleDateString() ? { ...item, data: [ action.payload, ...item.data ] } : item)
      } else {
        const newData = {
          date: new Date(`${action.payload.created_at}`).toLocaleDateString(),
          data: [ action.payload ]
        }
        return [ newData, ...state ]
      }
    default:
      return state
  }
}

export default historyReducer