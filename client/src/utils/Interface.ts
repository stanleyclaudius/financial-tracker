import { ChangeEvent, FormEvent } from 'react'
import rootReducer from './../redux/reducers'

export type InputChange = ChangeEvent<HTMLInputElement>

export type FormSubmit = FormEvent<HTMLFormElement>

export type RootStore = ReturnType<typeof rootReducer>

export interface IUserLogin {
  email: string
  password: string
}

export interface IUserRegister extends IUserLogin {
  name: string
}

export interface IUser extends IUserLogin {
  id: number
  name: string
  rf_token: string
  avatar: string
  type: string
}