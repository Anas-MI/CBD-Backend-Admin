const mongoose = require('mongoose')
const Schema = mongoose.Schema

let SEO = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    titleContent: {
      type: String,
      required: true,
    },
    keywords: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    robot: {
      type: String,
      // required: true,
    },

    og_type: {
      type: String,
      // required: true,
    },

    og_title: {
      type: String,
      // required: true,
    },

    og_description: {
      type: String,
      // required: true,
    },

    og_image: {
      type: String,
      // required: true,
    },

    og_url: {
      type: String,
      // required: true,
    },

    og_siteName: {
      type: String,
      // required: true
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('seo', SEO)
