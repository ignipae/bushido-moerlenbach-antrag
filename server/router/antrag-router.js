const router = require("express").Router();
const mailhelper = require("../mailhelper");

const register = (req, res) => {
  mailhelper.sendRegistrationMail(req.body, () => {
    res.status(201).json({
      message: "success"
    });
  });
};
const unregister = (req, res) => {
  mailhelper.sendUnregistrationMail(req.body, () => {
    res.status(201).json({
      message: "success"
    });
  });
};

router.post("/registrieren", register);
router.post("/kuendigen", unregister);

module.exports = router;
