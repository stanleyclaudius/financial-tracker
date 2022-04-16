import express from 'express'
import transactionCtrl from './../controllers/transactionCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, transactionCtrl.getTransactions)
  .post(isAuthenticated, transactionCtrl.insertTransaction)

export default router