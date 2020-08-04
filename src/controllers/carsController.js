const Car = require('../models/car');
const User = require('../models/user');


module.exports = {
    index: async (request, response, next) => {
        try {
            const cars = await Car.find({});
            response.status(201).json(cars);
        } catch (err) {
            next(err);
        }
    },
    create: async (request, response, next) => {

        try {
            const newCar = new Car(request.body);
            const car = await newCar.save();
            response.status(201).json(car);

        } catch (err) {
            next(err);
        }
    },
    show: async (request, response, next) => {

        try {       
            const { carId } = request.params;
            const car = await Car.findById(carId);
            if (car) {
                response.status(200).json(car);
            } else {
                response.status(200).json({
                    message: `NO SE ENCUENTRA REGISTRADO NINGUN REGISTRO CON EL ID: ${carId} EN NUESTROS SERVIDORES.`
                })
            }
        }
        catch (err) {
            next(err)
        }
    },

    replace: async (request, response, next) => { 
        try {
            const { carId } = request.params;
            const newcar = request.body;
            const car = await car.findByIdAndUpdate(carId, newcar);
            response.status(200).json({
                message: `Se ha modificado el registro el ${carId}`,
                antiguo_registro: car,
                nuevo_registro: newcar

            });

        } catch (error) {
            next("Se ha encontro este error:", error);
        }
    },

    update: async (request, response, next) => { },

    delete: async (request, response, next) => { },

   
};