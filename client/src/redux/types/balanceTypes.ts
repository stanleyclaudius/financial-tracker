export const GET_BALANCE = 'GET_BALANCE'

export interface IBalance {
  balance: number
}

export interface IGetBalanceType {
  type: typeof GET_BALANCE
  payload: IBalance
}