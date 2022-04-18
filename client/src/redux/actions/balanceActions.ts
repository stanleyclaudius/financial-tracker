import { Dispatch } from 'redux'
import { GET_BALANCE, IGetBalanceType } from './../types/balanceTypes'
import { ALERT, IAlertType } from './../types/alertTypes'
import { getDataAPI } from './../../utils/fetchData'
import { checkTokenExp } from '../../utils/checkTokenExp'

export const getBalance = (token: string) => async(dispatch: Dispatch<IGetBalanceType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await getDataAPI('transaction/balance', accessToken)
    dispatch({
      type: GET_BALANCE,
      payload: res.data
    })
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}