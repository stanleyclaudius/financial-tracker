import { Dispatch } from 'redux'
import { GET_ALL_TRANSACTIONS, IGetAllTransactionsType, IInsertTransactionType, INSERT_TRANSACTION, ITransactionData } from './../types/transactionTypes'
import { ALERT, IAlertType } from './../types/alertTypes'
import { getDataAPI, postDataAPI } from './../../utils/fetchData'
import { checkTokenExp } from './../../utils/checkTokenExp'

export const getAllTransactions = (token: string) => async(dispatch: Dispatch<IGetAllTransactionsType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token
  
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI('transaction', accessToken)
    dispatch({
      type: GET_ALL_TRANSACTIONS,
      payload: res.data.transactions
    })

    dispatch({
      type: ALERT,
      payload: {
        loading: false
      }
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

export const insertTransaction = (transactionData: ITransactionData, token: string) => async(dispatch: Dispatch<IInsertTransactionType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await postDataAPI('transaction', transactionData, accessToken)
    dispatch({
      type: INSERT_TRANSACTION,
      payload: res.data.transaction
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg
      }
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