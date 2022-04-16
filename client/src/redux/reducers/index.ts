import { combineReducers } from 'redux'
import alert from './alertReducer'
import auth from './authReducer'
import history from './historyReducer'

export default combineReducers({
  alert,
  auth,
  history
})