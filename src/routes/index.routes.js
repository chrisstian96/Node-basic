const router = require("express-promise-router")();

router.get('/',(request, response, next) => {
    response.status(200).json({
        message:'La petición ha sido recibida correctamente'
    })
});

module.exports = router;