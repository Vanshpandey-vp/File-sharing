// File: App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import Navbar from './components/Navbar';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import PublicFiles from './pages/PublicFiles';
import SearchPrivateFile from './pages/SearchPrivateFile';
export default function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-expense' element={<AddExpense />} />
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/public' element={<PublicFiles/>}/>
        <Route path='/search-private' element={<SearchPrivateFile/>}/>


      </Routes>
    </Router>
  );
}
