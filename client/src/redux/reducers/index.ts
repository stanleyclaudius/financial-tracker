import { combineReducers } from 'redux'
import alert from './alertReducer'
import auth from './authReducer'
import history from './historyReducer'
import chart from './chartReducer'
import latestTransaction from './latestTransactionReducer'
import balance from './balanceReducer'

export default combineReducers({
  alert,
  auth,
  history,
  chart,
  latestTransaction,
  balance
})