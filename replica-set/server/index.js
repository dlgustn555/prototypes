require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log('Successfully coinnected to MongoDB!!'))
  .catch(error => console.log(error))

app.use('/books', require('./routes/bookRouter'))  

app.listen(port, function () {
  console.log(`Server listening on PORT: ${port}!!`)
})