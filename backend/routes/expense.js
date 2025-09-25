// File: server/routes/expense.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add Expense
router.post('/add', async (req, res) => {
  const { email, title, amount, date,detail} = req.body;
  try {
    const newExpense = new Expense({ email, title, amount, date, detail});
    await newExpense.save();
    res.json({ message: 'Expense added' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get Expenses by User
router.get('/:email', async (req, res) => {
  try {
    const expenses = await Expense.find({ email: req.params.email });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
