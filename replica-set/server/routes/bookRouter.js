const router = require('express').Router()
const BookModel = require('../models/bookModel')

router.get('/list', (_, response) => {
  console.log('[GET] /list ')
  BookModel.find({})
    .then(books => response.send(books))
    .catch(error => response.send(error))
})


router.get('/insert', (_, response) => {
  console.log('[GET] /insert ')
  new BookModel({ title: 'TEST ...' })
    .save()
    .then(result => response.send(result))
    .catch(error => response.send(error))
})

module.exports = router