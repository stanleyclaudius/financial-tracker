import express from 'express'
import authCtrl from './../controllers/authCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/register').post(authCtrl.register)
router.route('/activate').post(authCtrl.activateAccount)
router.route('/login').post(authCtrl.login)
router.route('/logout').get(isAuthenticated, authCtrl.logout)
router.route('/refresh_token').get(authCtrl.refreshToken)
router.route('/forget_password').post(authCtrl.forgetPassword)
router.route('/reset_password/:token').patch(authCtrl.resetPassword)
router.route('/google_login').post(authCtrl.googleLogin)
router.route('/facebook_login').post(authCtrl.facebookLogin)

export default router