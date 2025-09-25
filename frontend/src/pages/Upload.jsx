import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [visibility, setVisibility] = useState('public');
  const [password, setPassword] = useState('');
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleUpload = async () => {
    if (!user?._id) {
      return alert('Please login to upload files.');
    }

    if (!files.length) return alert('Please select at least one file.');

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('visibility', visibility);
    formData.append('uploadedBy', user._id);
    if (visibility === 'private') {
      if (!password.trim()) return alert('Please provide a password for private file');
      formData.append('password', password);
    }

    try {
      const res = await fetch('http://localhost:5000/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        alert('Files uploaded successfully!');
        setFiles([]);
        setPassword('');
        setVisibility('public');
      } else {
        alert(result.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading files');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Upload Your Files</h2>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-10 text-center transition-all duration-300 ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'
          } cursor-pointer hover:bg-gray-200`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            {isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to select files'}
          </p>
          <p className="text-xs text-gray-400 mt-1">(You can upload multiple files)</p>
        </div>

        {files.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-gray-700">Files Selected:</h4>
            <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
              {files.map((file, index) => (
                <li key={index}>
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <select
            className="border rounded px-4 py-2 w-full sm:w-1/2"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private (requires password)</option>
          </select>

          {visibility === 'private' && (
            <input
              type="text"
              placeholder="Set Password"
              className="border rounded px-4 py-2 w-full sm:w-1/2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}
        </div>

        <button
          onClick={handleUpload}
          className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold transition"
        >
          Upload Files
        </button>
      </div>
    </div>
  );
}
