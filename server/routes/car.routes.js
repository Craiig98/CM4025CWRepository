import express from 'express'
import carCtrl from '../controllers/car.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/cars')
 .get(carCtrl.list)
 .post(carCtrl.create)
 .put(carCtrl.updateHearts)

router.route('/api/cars/:userId')
 .put(carCtrl.updateHearts)
 .put(carCtrl.updateNormal)

export default router