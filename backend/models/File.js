const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  }, // Original file name shown to user

  filePath: {
    type: String,
    required: true,
  }, // Saved filename on server (used for download)

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },

  password: {
    type: String,
    default: null,
  }, // Only for private files

  code: {
    type: String,
    unique: true,
    sparse: true,
  }, // Unique short code for private file access

  mimetype: {
    type: String,
    required: true,
  },

  size: {
    type: Number,
  }, // Optional - you can include file size if needed

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('File', fileSchema);
