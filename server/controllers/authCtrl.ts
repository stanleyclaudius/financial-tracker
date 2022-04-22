import { Request, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { checkEmail } from './../utils/checkEmail'
import { generateAccessToken, generateActivationToken, generateRefreshToken } from './../utils/generateToken'
import { IDecodedToken, IGooglePayload, IReqUser, IUser, IUserSocialRegister } from './../utils/Interface'
import db from './../config/db'
import sendEmail from './../utils/sendMail'
import fetch from 'cross-fetch'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const authCtrl = {
  register: async(req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body
      if (!name || !email || !password)
        return res.status(400).json({ msg: 'Please provide name, email, and password.' })

      if (!checkEmail(email))
        return res.status(400).json({ msg: 'Please provide valid email address.' })

      if (password.length < 8)
        return res.status(400).json({ msg: 'Password should be at least 8 characters.' })

      const findUser = await db<IUser>('account').where('email', email)
      if (findUser.length > 0)
        return res.status(400).json({ msg: 'Email has been registered before.' })

      const passwordHash = await bcrypt.hash(password, 12)

      const user = { name, email, password: passwordHash }
      
      const token = generateActivationToken({ user })
      const url = `${process.env.CLIENT_URL}/activate/${token}`

      sendEmail(email, 'Account Activation', url)
      
      return res.status(200).json({ msg: `An account activation email has been sent to ${email}` })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  activateAccount: async(req: Request, res: Response) => {
    try {
      const { token } = req.body
      if (!token)
        return res.status(400).json({ msg: 'Please provide activation token.' })

      const { user } = <IDecodedToken>jwt.verify(token, `${process.env.ACTIVATION_TOKEN_SECRET}`)
      
      const findUser = await db<IUser>('account').where('email', user?.email)
      if (findUser.length > 0)
        return res.status(400).json({ msg: 'Email has been registered before.' })

      await db<IUser>('account').insert({ ...user })

      return res.status(200).json({ msg: 'Account has been activated successfully.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  login: async(req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      if (!email || !password)
        return res.status(400).json({ msg: 'Please provide email and password.' })

      const user = await db<IUser>('account').where('email', email)
      if (user.length === 0)
        return res.status(404).json({ msg: 'Invalid credential.' })
        
      loginUser(user[0], password, res)
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  logout: async(req: IReqUser, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid authentication.' })

    try {
      res.clearCookie('fintrack_rfToken', {
        path: '/api/v1/auth/refresh_token'
      })

      await db<IUser>('account').where('id', req.user.id).update({ rf_token: '' })

      return res.status(200).json({ msg: 'Logout success.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  refreshToken: async(req: Request, res: Response) => {
    try {
      const { fintrack_rfToken: token } = req.cookies
      
      const decoded = <IDecodedToken>jwt.verify(token, `${process.env.REFRESH_TOKEN_SECRET}`)
      if (!decoded.id)
        return res.status(400).json({ msg: 'Invalid authentication.' })

      const user = await db<IUser>('account').where('id', decoded.id)
      if (user.length === 0)
        return res.status(404).json({ msg: 'User not found.' })

      if (token !== user[0].rf_token)
        return res.status(400).json({ msg: 'Invalid authentication.' })

      const accessToken = generateAccessToken({ id: user[0].id })
      const refreshToken = generateRefreshToken({ id: user[0].id }, res)

      await db<IUser>('account').where('id', decoded.id).update({ rf_token: refreshToken })

      return res.status(200).json({
        accessToken,
        user: {
          ...user[0],
          password: '',
          rf_token: ''
        }
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  forgetPassword: async(req: Request, res: Response) => {
    try {
      const { email } = req.body
      if (!email)
        return res.status(400).json({ msg: 'Please provide email.' })
      
      if (!checkEmail(email))
        return res.status(400).json({ msg: 'Please provide valid email address.' })

      const user = await db<IUser>('account').where('email', email)
      if (user.length === 0)
        return res.status(404).json({ msg: 'Account not found.' })

      if (user[0].type !== 'register')
        return res.status(400).json({ msg: `User that login with ${user[0].type} can't reset their password.` })

      const token = generateAccessToken({ id: user[0].id })
      const url = `${process.env.CLIENT_URL}/reset/${token}`

      sendEmail(email, 'Reset Password', url)

      return res.status(200).json({ msg: 'Password reset instruction has been sent to your email.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  resetPassword: async(req: Request, res: Response) => {
    try {
      const { password } = req.body
      if (!password)
        return res.status(400).json({ msg: 'Please provide new password.' })

      if (password.length < 8)
        return res.status(400).json({ msg: 'Password should be at least 8 characters.' })

      const decoded = <IDecodedToken>jwt.verify(req.params.token, `${process.env.ACCESS_TOKEN_SECRET}`)
      if (!decoded.id)
        return res.status(400).json({ msg: 'Invalid reset password token.' })

      const user = await db<IUser>('account').where('id', decoded.id)
      if (user.length === 0)
        return res.status(404).json({ msg: 'Account not found.' })

      if (user[0].type !== 'register')
        return res.status(400).json({ msg: `User that login with ${user[0].type} can't reset their password.` })

      const passwordHash = await bcrypt.hash(password, 12)

      await db<IUser>('account').where('id', decoded.id).update({ password: passwordHash })

      return res.status(200).json({ msg: 'Password has been changed successfully.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  googleLogin: async(req: Request, res: Response) => {
    try {
      const { token } = req.body
      const verify = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      })

      const { email, email_verified, name, picture } = <IGooglePayload>verify.getPayload()

      if (!email_verified)
        return res.status(400).json({ msg: 'Email hasn\'t been verified yet.' })

      const password = email + '824jjKFdjFJFJYYouuRURRd))DPP-__pPpapPasswordddRR))=-_hHeree'
      const passwordHash = await bcrypt.hash(password, 12)

      const user = await db<IUser>('account').where('email', email)
      if (user.length !== 0) {
        loginUser(user[0], password, res)
      } else {
        const user = {
          name,
          email,
          password: passwordHash,
          type: 'google',
          avatar: picture
        }
        registerUser(user, res)
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  facebookLogin: async(req: Request, res: Response) => {
    try {
      const { accessToken, userID } = req.body

      const facebookEndpoint = `https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

      const data = await fetch(facebookEndpoint)
        .then(res => res.json())
        .then(res => { return res })

      const { email, name, picture } = data

      const password = email + 'd8f9jio3jkledskflYYufouroruuuRURRpPpasosowrdddsoGoosgghheereREerer'
      const passwordHash = await bcrypt.hash(password, 12)

      const user = await db<IUser>('account').where('email', email)
      if (user.length  !== 0) {
        loginUser(user[0], password, res)
      } else {
        const user = {
          name,
          email,
          password: passwordHash,
          type: 'facebook',
          avatar: picture.data.url
        }
        registerUser(user, res)
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

const loginUser = async(user: IUser, password: string, res: Response) => {
  const isPwMatch = await bcrypt.compare(password, user.password)
  if (!isPwMatch) {
    let msg = user.type === 'register' ? 'Invalid credential.' : `This account use ${user.type} login feature.`
    return res.status(400).json({ msg })
  }

  const accessToken = generateAccessToken({ id: user.id })
  const refreshToken = generateRefreshToken({ id: user.id }, res)

  await db<IUser>('account').where('id', user.id).update({ rf_token: refreshToken })

  return res.status(200).json({
    msg: `Authenticated as ${user.name}`,
    accessToken,
    user: {
      ...user,
      password: ''
    }
  })
}

const registerUser = async (user: IUserSocialRegister, res: Response) => {
  await db<IUser>('account').insert(user)

  const userData = await db<IUser>('account').where('email', user.email)

  const accessToken = generateAccessToken({ id: userData[0].id })
  const refreshToken = generateRefreshToken({ id: userData[0].id }, res)
  
  await db<IUser>('account').where('id', userData[0].id).update({ rf_token: refreshToken })

  return res.status(200).json({
    msg: `Authenticated as ${userData[0].name}`,
    accessToken,
    user: {
      ...userData[0],
      password: ''
    }
  })
}

export default authCtrl