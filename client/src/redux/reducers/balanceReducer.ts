import { IInsertTransactionType, INSERT_TRANSACTION } from './../types/transactionTypes'
import { GET_BALANCE, IBalance, IGetBalanceType } from './../types/balanceTypes'

const initialState = {
  balance: 0
}

const balanceReducer = (state: IBalance = initialState, action: IInsertTransactionType | IGetBalanceType) => {
  switch (action.type) {
    case GET_BALANCE:
      return action.payload
    case INSERT_TRANSACTION:
      const type = action.payload.type
      if (type === 'income') {
        const newBalance = state.balance + Number(action.payload.amount)
        return { balance: newBalance }
      } else {
        const newBalance = state.balance - Number(action.payload.amount)
        return { balance: newBalance }
      }
    default:
      return state
  }
}

export default balanceReducer