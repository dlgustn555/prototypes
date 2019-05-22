const mongoose = require('mongoose')


// default 읽기 : Primary 노드
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true }
})


/* 
// Secondary 노드에서 읽기
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true }
}, { read: 'secondary' })
 */

/* 
// 무한정 블록상태
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true }
}, {
  writeConcern: {
    w: 2,
} })
 */

/* 
// 10초뒤에 타임아웃발생 
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true }
}, {
  writeConcern: {
    w: 2,
    wtimeout: 10000
} })
 */


module.exports = mongoose.model('Book', bookSchema)