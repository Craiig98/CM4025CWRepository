import Car from '../models/car.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

//Create a new car object
const create = async (req, res) => {
    const car = new Car(req.body)
    try {
    await car.save()
    return res.status(200).json({
    message: "Successfully Created"
    })
    } catch (err) {
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err)
    })
    }   
}


//Returns a list of all cars
const list = async (req, res) => {
    try {
        let cars = await Cars.find().select('make model')
        res.json(cars)
        } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
        })
        }       
}


export default {
    create,
    list
   }