import { Response, NextFunction } from 'express'
import { IReqUser, IDecodedToken, IUser } from './../utils/Interface'
import jwt from 'jsonwebtoken'
import db from './../config/db'

export const isAuthenticated = async(req: IReqUser, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')
    if (!token)
      return res.status(401).json({ msg: 'Invalid authentication.' })

    const decoded = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    if (!decoded.id)
      return res.status(401).json({ msg: 'Invalid authentication.' })

    const user = await db<IUser>('account').where('id', decoded.id)
    if (user.length === 0)
      return res.status(404).json({ msg: 'Account not found.' })

    req.user = user[0]
    next()
  } catch (err: any) {
    return res.status(500).json({ msg: err.message })
  }
}