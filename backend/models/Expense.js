const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  email: { type: String, required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  detail:{type:String},
  date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);