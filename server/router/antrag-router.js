const router = require('express').Router();

const register = (req, res) => {
    res
        .status(200)
        .json({message: 'This is the registration endpoint'});
};

router.get('/registrieren', register);

module.exports = router;