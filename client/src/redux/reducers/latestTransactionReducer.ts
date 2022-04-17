import { GET_LATEST_TRANSACTIONS, IGetLatestTransactionsType, IInsertTransactionType, INSERT_TRANSACTION, ITransaction } from './../types/transactionTypes'

const initialState: ITransaction[] = []

const latestTransactionReducer = (state: ITransaction[] = initialState, action: IInsertTransactionType | IGetLatestTransactionsType) => {
  switch (action.type) {
    case GET_LATEST_TRANSACTIONS:
      return action.payload
    case INSERT_TRANSACTION:
      let itemLength = 0
      for (let stateItem of state) {
        itemLength += stateItem.data.length
      }

      const isDateExists = state.find(item => item.date === new Date(`${action.payload.created_at}`).toLocaleDateString())

      if (itemLength + 1 <= 4) {
        if (isDateExists) {
          return state.map(item => item.date === new Date(`${action.payload.created_at}`).toLocaleDateString() ? { ...item, data: [ action.payload, ...item.data ] } : item)
        } else {
          const newData = {
            date: new Date(`${action.payload.created_at}`).toLocaleDateString(),
            data: [ action.payload ]
          }
          return [ newData, ...state ]
        }
      } else {
        const stateCopy = [ ...state ]
        const lastItemData = stateCopy[stateCopy.length - 1].data
        lastItemData.pop()

        stateCopy.map((item, idx) => idx === stateCopy.length - 1 ? { ...item, data: lastItemData } : item)

        console.log(stateCopy)

        if (isDateExists) {
          return stateCopy.map(item => item.date === new Date(`${action.payload.created_at}`).toLocaleDateString() ? { ...item, data: [ action.payload, ...item.data ] } : item)
        } else {
          const newData = {
            date: new Date(`${action.payload.created_at}`).toLocaleDateString(),
            data: [ action.payload ]
          }
          return [ newData, ...stateCopy ]
        }
      }
    default:
      return state
  }
}

export default latestTransactionReducer