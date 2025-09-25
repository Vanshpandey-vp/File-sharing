import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-16 px-6 flex justify-center items-start">
      <div className="max-w-4xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">About FileShareX</h1>

        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>FileShareX</strong> is a modern and secure file sharing platform that allows users to easily upload and access files anytime, from anywhere.
          Whether you want to <span className="text-blue-600 font-semibold">share documents publicly</span> or
          <span className="text-purple-600 font-semibold"> keep sensitive files private with password protection</span>, FileShareX has got you covered.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">🔓 Public File Sharing</h3>
            <p className="text-gray-700">
              Upload files and share them openly with the community. Anyone can view and download public files without any login or password.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">🔐 Private & Secure</h3>
            <p className="text-gray-700">
              Mark files as private and secure them with a unique password/code. Only users with the correct code can find and access them.
            </p>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200 mt-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">💡 Why FileShareX?</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Easy upload and download experience</li>
            <li>Public & private sharing modes</li>
            <li>Password-protected secure access</li>
            <li>Clean and user-friendly interface</li>
            <li>Completely free to use</li>
          </ul>
        </div>

        <p className="text-center mt-6 text-gray-500 text-sm">
          Made with ❤️ by the FileShareX Team
        </p>
      </div>
    </div>
  );
}
