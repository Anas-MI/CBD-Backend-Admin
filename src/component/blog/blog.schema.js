const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Blog = new Schema(
  {
    heading: { type: String, required: true },
    subHeading: { type: String },
    content: { type: String, required: true },
    author: { type: String, required: true },
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    tags: [{ type: String }],
    image: { type: String, default: '' },
    proTip: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('blog', Blog)
