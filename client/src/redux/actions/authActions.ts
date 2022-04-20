import { Dispatch } from 'redux'
import { ALERT, IAlertType } from './../types/alertTypes'
import { AUTH, IAuthType } from './../types/authTypes'
import { getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData'
import { IUserLogin, IUserRegister } from './../../utils/Interface'
import { checkTokenExp } from './../../utils/checkTokenExp'

export const login = (userData: IUserLogin) => async(dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/login', userData)
    localStorage.setItem('fintrack_logged', 'true')
    dispatch({
      type: AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
      }
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

export const googleLogin = (token: string) => async(dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/google_login', { token })
    localStorage.setItem('fintrack_logged', 'true')
    dispatch({
      type: AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
      }
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

export const facebookLogin = (accessToken: string, userID: string) => async(dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/facebook_login', { accessToken, userID })
    localStorage.setItem('fintrack_logged', 'true')
    dispatch({
      type: AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
      }
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

export const register = (userData: IUserRegister) => async(dispatch: Dispatch<IAlertType>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })
    
    const res = await postDataAPI('auth/register', userData)
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

export const logout = (token: string) => async(dispatch: Dispatch<IAuthType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await getDataAPI('auth/logout', accessToken)
    localStorage.removeItem('fintrack_logged')
    dispatch({
      type: AUTH,
      payload: {}
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

export const refreshToken = () => async(dispatch: Dispatch<IAuthType | IAlertType>) => {
  const isLogged = localStorage.getItem('fintrack_logged')
  if (isLogged !== 'true') return

  try {
    const res = await getDataAPI('auth/refresh_token')
    dispatch({
      type: AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
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

export const forgetPassword = (email: string) => async(dispatch: Dispatch<IAlertType>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })
    
    const res = await postDataAPI('auth/forget_password', { email })
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

export const resetPassword = (password: string, token: string) => async(dispatch: Dispatch<IAlertType>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await patchDataAPI(`auth/reset_password/${token}`, { password })
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