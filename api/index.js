const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
//routers
const auth = require('./routes/auth')
const users = require('./routes/users')
const posts = require('./routes/posts')
const categories = require('./routes/categories')
//multer
const multer = require('multer')
//path
const path = require('path')

dotenv.config()
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')))

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to mongoDB')
    })
    .catch(error => {
        console.log(error)
    })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name)
    }
})

const upload = multer({storage})

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json('File has been uploaded')
})

app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/categories', categories)

app.listen(5000, () => {
    console.log('Backend is running')
})