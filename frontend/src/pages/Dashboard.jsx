import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) return navigate('/login');

    fetch(`http://localhost:5000/api/expenses/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setExpenses(data|| []);
      })
      .catch((err) => {
        console.error('Failed to fetch expenses:', err);
        alert('Error loading expenses.');
      });
  }, [navigate]);

  const totalSpent = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const uniqueDates = new Set(expenses.map((e) => e.date));
  const dailyAverage = totalSpent / Math.max(uniqueDates.size, 1);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Total Expenses</h2>
          <p className="text-2xl text-blue-600">₹{totalSpent.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Daily Average</h2>
          <p className="text-2xl text-green-600">₹{dailyAverage.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Expenses</h2>
        <Link to="/add-expense" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Expense
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{exp.title}</td>
                <td className="px-4 py-2 text-red-500">₹{parseFloat(exp.amount).toFixed(2)}</td>
                <td className="px-4 py-2">{exp.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
