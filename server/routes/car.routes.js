import express from 'express'
import carCtrl from '../controllers/car.controller'

const router = express.Router()

router.route('/api/cars')
 .get(carCtrl.list)
 .post(carCtrl.create)

export default router