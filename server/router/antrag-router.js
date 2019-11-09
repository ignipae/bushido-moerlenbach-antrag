const router = require('express').Router();
const mailhelper = require("../mailhelper");

const register = (req, res) => {
    mailhelper.sendMail({
       
    },
    () => {
        res.status(200).json({
            message: 'success',
        });
    });
   
};

router.get('/registrieren', register);

module.exports = router;