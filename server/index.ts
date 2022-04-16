import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes'

dotenv.config({
  path: './server/config/.env'
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/v1/auth', router.authRouter)
app.use('/api/v1/transaction', router.transactionRouter)

app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`))