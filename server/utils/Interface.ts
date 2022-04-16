import { Request } from 'express'

export interface IUser {
  id: number
  name: string
  email: string
  password: string
  rf_token: string
  avatar: string
  type: string
}

export interface INewUser {
  name: string
  email: string
  password: string
}

export interface IDecodedToken {
  id?: number
  user?: INewUser
  iat: number
  exp: number
}

export interface IReqUser extends Request {
  user?: IUser
}

export interface IGooglePayload {
  email: string
  email_verified: boolean
  name: string
  picture: string
}

export interface IUserSocialRegister {
  name: string
  email: string
  password: string
  type: string
  avatar: string
}