const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginValidation, registerValidation} = require('../validation/validation')

router.post('/register', async (req, res) => {

    //Data validation
    registerValidation(req.body);

    //Check if user is already in database
    const emailAlreadyExists = await User.findOne({email: req.body.email});

    if(emailAlreadyExists) {
        return res.status(400).send("Email is already registered");
    }

    //Hash passwords
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        //Save User in Database
        const savedUser = await user.save();
        res.send({message: "User added sucessfully!"});
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/login', async(req, res) => {

    //Data validation
    loginValidation(req.body);

    //Checking if email exists
    const user = await User.findOne({username: req.body.username});

    //If user doesn't exist, throw an error
    if(!user) {
        return res.status(400).json({message: "User doesn't exist"});
    }

    //Checking if password is correct
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordCorrect) {
        return res.status(400).json({message: "Invalid password"})
    }

    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token)

    res.json({message: "login sucessfull", token: token});
});

module.exports = router;