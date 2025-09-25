import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been submitted. We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100 py-16 px-6 flex justify-center items-start">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-8 p-8">
        
        {/* Left Side Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            Have questions or feedback? We'd love to hear from you!
            Fill out the form and we’ll get back to you as soon as possible.
          </p>
          <div className="text-gray-600 text-sm space-y-2">
            <p><strong>Email:</strong> support@filesharex.com</p>
            <p><strong>Phone:</strong> +91-9876543210</p>
            <p><strong>Address:</strong> Virtual Office, Internet Lane, WebWorld</p>
          </div>
        </div>

        {/* Right Side Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="subject"
            required
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <textarea
            name="message"
            rows="5"
            required
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
