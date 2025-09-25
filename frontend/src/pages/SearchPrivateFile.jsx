import React, { useState } from 'react';

export default function SearchPrivateFile() {
  const [code, setCode] = useState('');
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1 = enter code, 2 = enter password

  const handleCodeSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/files/private/${code}`);
      const data = await res.json();
      if (res.ok) {
        setFile(data);
        setStep(2);
      } else {
        alert(data.message || 'Invalid code');
      }
    } catch (err) {
      console.error(err);
      alert('Error finding file');
    }
  };

  const handleAccess = async (action) => {
    try {
      const res = await fetch(`http://localhost:5000/api/files/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, password }),
      });

      const result = await res.json();
      if (!res.ok) return alert(result.message || 'Invalid password');

      const fileUrl = `http://localhost:5000/uploads/${file.filePath}`;
      if (action === 'open') {
        window.open(fileUrl, '_blank');
      } else if (action === 'download') {
        const link = document.createElement('a');
        link.href = `http://localhost:5000/api/files/download/${file.filePath}`;
        link.download = file.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      alert('Error verifying password');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">🔐 Search Private File</h2>

        {step === 1 && (
          <>
            <label className="block mb-2 font-medium">Enter Access Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border rounded px-4 py-2 mb-4"
              placeholder="e.g. A1B2C3"
            />
            <button
              onClick={handleCodeSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
            >
              Search File
            </button>
          </>
        )}

        {step === 2 && file && (
          <>
            <div className="mb-4">
              <h4 className="text-xl font-semibold mb-1">📄 {file.filename}</h4>
              <p className="text-gray-600 text-sm">Type: {file.mimetype}</p>
              <p className="text-gray-600 text-sm">Uploaded At: {new Date(file.createdAt).toLocaleString()}</p>
            </div>

            <label className="block mb-2 font-medium">Enter Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-4 py-2 mb-4"
              placeholder="Enter password to access file"
            />

            <div className="flex gap-4">
              <button
                onClick={() => handleAccess('open')}
                className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
              >
                Open
              </button>
              <button
                onClick={() => handleAccess('download')}
                className="w-1/2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold"
              >
                Download
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
