export const ALERT = 'ALERT'

export interface IAlert {
  success?: string
  errors?: string
  loading?: boolean
}

export interface IAlertType {
  type: typeof ALERT
  payload: IAlert
}