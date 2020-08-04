const router = require("express-promise-router")();

const UsersController = require('../controllers/usersController');

const {validateParam, schemas, validateBody }= require('../helpers/routeHelpers');

router.route('/')
    .get(UsersController.index)
    .post(validateBody(schemas.userSchema), UsersController.create);

// /users/:id
router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'),UsersController.show)
    .put(validateParam(schemas.idSchema, 'userId'),
        validateBody(schemas.userSchemaUpdate), 
        UsersController.replace)
    .patch(validateParam(schemas.idSchema, 'userId'),
        validateBody(schemas.userSchemaUpdate),
        UsersController.update)
    .delete(validateParam(schemas.idSchema, 'userId'),UsersController.delete)

router.route('/:userId/cars')
    .get(validateParam(schemas.idSchema, 'userId'),UsersController.getCars)
    .post(UsersController.assigendCar)
module.exports = router;