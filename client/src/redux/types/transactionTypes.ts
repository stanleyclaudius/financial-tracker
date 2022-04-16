export const INSERT_TRANSACTION = 'INSERT_TRANSACTION'
export const GET_ALL_TRANSACTIONS = 'GET_ALL_TRANSACTIONS'

export interface ITransactionData {
  id?: number
  user?: number
  amount: number
  purpose: string
  type: string
  created_at?: string
}

export interface ITransaction {
  date: string
  data: ITransactionData[]
}

export interface IInsertTransactionType {
  type: typeof INSERT_TRANSACTION
  payload: ITransactionData
}

export interface IGetAllTransactionsType {
  type: typeof GET_ALL_TRANSACTIONS
  payload: ITransaction[]
}