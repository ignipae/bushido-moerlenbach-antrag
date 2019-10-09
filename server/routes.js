const router = require('express').Router();
const antragRouter = require('./router/antrag-router');

router.use('/antrag', antragRouter);

module.exports = router;