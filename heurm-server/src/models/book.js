const mongoose = require("mongoose")
const { Schema } = mongoose

const Author = new Schema({
  name: String,
  email: String
})

const Book = new Schema({
  title: String,
  authors: [Author],
  publishedDate: Date,
  price: Number,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// 위에서 만든 스키마를 모델로 변환하고, 다른 파일에서 불러와 사용할 수 있도록 exports 함
// 모델은 스키마를 통해서 만드는 인스턴스입니다.
module.exports = mongoose.model("Book", Book)
