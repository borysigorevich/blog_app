const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

//register
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)

        const newUser = new User({...req.body, password: await bcrypt.hash(req.body.password, salt)})
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json('Wrong credentials')
        console.log(user)
        const validate = await bcrypt.compare(req.body.password, user.password)
        !validate && res.status(400).json('Wrong credentials')
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router