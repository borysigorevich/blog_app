const router = require('express').Router()
const Category = require('../models/Category')

//create category
router.post('/', async (req, res) => {
    try {
        const newCategory = new Category(req.body)
        const savedCategory = await newCategory.save()

        res.status(200).json(savedCategory)
        // res.status(200).json(await new Category(req.body).save())
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router