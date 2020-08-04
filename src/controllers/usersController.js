const User = require('../models/user');
const Car = require('../models/car');


module.exports = {
    index: async (request, response, next) => {
        try {
            const users = await User.find({});
            response.status(201).json(users);
        } catch (err) {
            next(err);
        }
    },
    create: async (request, response, next) => {

        try {
            const newUser = new User(request.value.body);
            const user = await newUser.save();
            response.status(201).json(user);

        } catch (err) {
            next(err);
        }
    },
    show: async (request, response, next) => {
        const { userId } = request.value.params;
        const user = await User.findById(userId);
        response.status(200).json(user);
    },
    // Reemplaza completamente el registro por uno nuevo
    replace: async (request, response, next) => {

        try {
            const { userId } = request.value.params;
            const newUser = request.body;
            const user = await User.findByIdAndUpdate(userId, newUser);
            response.status(200).json({
                message: `Se ha modificado el registro el ${userId}`,
                antiguo_registro: user,
                nuevo_registro: newUser

            });

        } catch (error) {
            next("Se ha encontro este error:", error);
        }

    },
    // Actualiza los campos existentes con los datos obtenidos del usuario
    update: async (request, response, next) => {

        try {
            const { userId } = request.value.params;
            const newUser = request.value.body;
            const user = await User.findByIdAndUpdate(userId, newUser);
            response.status(200).json({
                message: `Se ha modificado el registro el ${userId}`,
                antiguo_registro: user,
                nuevo_registro: newUser

            });

        } catch (error) {
            next("Se ha encontro este error:", error);
        }

    },
    delete: async (request, response, next) => {
        try {
            const { userId } = request.value.params;
            const user = await User.findByIdAndDelete(userId);
            response.status(200).json({
                message: `Se ha eliminado el registro: ${userId}`
            })
        } catch (error) {
            next(error)
        }
    },
    getCars : async (request, response, next) => {
        try {
            const { userId } = request.params;
            const user = await User.findById(userId);
            const {cars} = user;
            response.status(200).json({
                cars: cars
            })
        } catch (error) {
            next(error)
        }
    },
    assigendCar: async (request, response, next) => {

        try {
            const {userId} = request.params;
            const user = await User.findById(userId);
            const newCar = new Car(request.body);

            newCar.seller = user;
            await newCar.save();

            user.cars.push(newCar);
            await user.save();
            response.status(201).json({
                message: newCar,
                message_2: user
            })
        } catch (error) {
            next(error)
        }

         
    }
};