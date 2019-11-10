const router = require('express').Router();
const mailhelper = require("../mailhelper");

const register = (req, res) => {
    
    mailhelper.sendMail(req.body,
    () => {
        res.status(201).json({
            message: 'success',
        });
    });
   
};

router.post('/registrieren', register);

module.exports = router;