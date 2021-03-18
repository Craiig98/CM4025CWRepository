import express from 'express'
import carCtrl from '../controllers/car.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/cars')
 .get(carCtrl.list)
 .post(carCtrl.create)

 router.route('/api/dashboard/:userId')
 .get(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, carCtrl.listdashboard)


export default router