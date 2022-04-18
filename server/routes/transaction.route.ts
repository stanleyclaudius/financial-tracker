import express from 'express'
import transactionCtrl from './../controllers/transactionCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, transactionCtrl.getTransactions)
  .post(isAuthenticated, transactionCtrl.insertTransaction)

router.route('/monthly').get(isAuthenticated, transactionCtrl.getTransactionsByMonth)
router.route('/latest').get(isAuthenticated, transactionCtrl.getLatestTransaction)
router.route('/balance').get(isAuthenticated, transactionCtrl.getCurrentBalance)
router.route('/year').get(isAuthenticated, transactionCtrl.getTransactionYear)

export default router