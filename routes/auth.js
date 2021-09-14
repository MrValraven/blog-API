const router = require('express').Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    console.log("registering");
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    try {
        console.log("registering user");
        let savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;