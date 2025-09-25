import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddExpense() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [detail,setDetail]=useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) return navigate('/login');

    try {
      const response = await fetch('http://localhost:5000/api/expenses/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          title,
          amount: parseFloat(amount),
          date,
          detail
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Expense added!');
        navigate('/dashboard');
      } else {
        alert(data.message || 'Failed to add expense');
      }
    } catch (err) {
      console.error(err);
      alert('Server error while adding expense');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 shadow rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Expense</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-4 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 mb-4 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          className="w-full p-2 mb-4 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          className="w-full p-2 mb-4 border rounded"
          value={detail}
          onChange={(e) => setDetail(e.target.value)            
          }
          placeholder='Details About Expense'
        />
        <button
          onClick={handleAdd}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Expense
        </button>
      </div>
    </div>
  );
}
