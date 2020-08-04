const {Router} = require('express');
const router = Router();
const CarsController = require('../controllers/carsController');

router.route('/')
.get(CarsController.index)
.post(CarsController.create)

// Car/:id
router.route('/:carId')
    .get(CarsController.show)
    .put(CarsController.replace)
    .patch(CarsController.update)
    .delete(CarsController.delete)

 
module.exports = router;