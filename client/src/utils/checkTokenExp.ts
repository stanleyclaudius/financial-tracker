import jwt_decode from 'jwt-decode'
import { AUTH } from './../redux/types/authTypes'
import { getDataAPI } from './fetchData'

interface IToken {
  exp: number
  iat: number
  id: number
}

export const checkTokenExp =  async(token: string, dispatch: any) => {
  const decoded: IToken = jwt_decode(token)

  if (decoded.exp >= Date.now() / 1000) return

  const res = await getDataAPI('auth/refresh_token')
  dispatch({
    type: AUTH,
    payload: {
      user: res.data.user,
      token: res.data.accessToken
    }
  })

  return res.data.accessToken
}