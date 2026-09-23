const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    data: {
      type: Buffer,
      required: [true, 'Image data is required'],
    },
    contentType: {
      type: String,
      required: [true, 'Content type is required'],
    },
    filename: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Image', imageSchema);
