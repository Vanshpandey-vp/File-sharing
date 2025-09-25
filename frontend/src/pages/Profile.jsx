import React, { useEffect, useState } from 'react';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const [files, setFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [visibility, setVisibility] = useState('');
  const [accessCode, setAccessCode] = useState('');

  useEffect(() => {
    if (!user?._id) return;

    const fetchFiles = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/files/user/${user._id}`);
        const data = await res.json();
        if (res.ok) setFiles(data);
        else alert(data.message || 'Could not fetch your files');
      } catch (err) {
        console.error(err);
        alert('Error fetching files');
      }
    };

    fetchFiles();
  }, [user]);

  const handleEditClick = (file) => {
    setEditingId(file._id);
    setVisibility(file.visibility);
    setAccessCode(file.password || '');
  };

  const handleUpdate = async (fileId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/files/${fileId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visibility, accessCode }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('File updated!');
        setEditingId(null);
        setFiles(prev =>
          prev.map(f => (f._id === fileId ? data.file : f))
        );
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating file');
    }
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/files/${fileId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok) {
        alert('File deleted');
        setFiles(prev => prev.filter(f => f._id !== fileId));
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting file');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">My Profile</h2>

        <div className="bg-purple-50 p-4 rounded mb-6">
          <p className="text-lg font-semibold text-gray-700">
            Name: <span className="font-normal">{user?.name}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Email: <span className="font-normal">{user?.email}</span>
          </p>
        </div>

        <h3 className="text-2xl font-bold text-blue-700 mb-4">Uploaded Files</h3>

        {files.length === 0 ? (
          <p className="text-gray-600">You haven’t uploaded any files yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded overflow-hidden">
              <thead className="bg-purple-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">File Name</th>
                  <th className="px-4 py-2 border">Visibility</th>
                  <th className="px-4 py-2 border">Code</th>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">Uploaded</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file._id} className="text-sm text-gray-700">
                    <td className="px-4 py-2 border">{file.filename}</td>

                    <td className="px-4 py-2 border capitalize">
                      {editingId === file._id ? (
                        <select
                          value={visibility}
                          onChange={(e) => setVisibility(e.target.value)}
                          className="border p-1 rounded"
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                        </select>
                      ) : (
                        file.visibility
                      )}
                    </td>

                    <td className="px-4 py-2 border text-center">
                      {editingId === file._id && visibility === 'private' ? (
                        <input
                          type="text"
                          className="border rounded px-2 py-1"
                          placeholder="New Access Code"
                          value={accessCode}
                          onChange={(e) => setAccessCode(e.target.value)}
                        />
                      ) : file.visibility === 'private' ? (
                        file.code
                      ) : (
                        '-'
                      )}
                    </td>

                    <td className="px-4 py-2 border">{file.mimetype}</td>
                    <td className="px-4 py-2 border">
                      {new Date(file.createdAt).toLocaleString()}
                    </td>

                    <td className="px-4 py-2 border space-x-2">
                      {editingId === file._id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(file._id)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-gray-500 hover:underline"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(file)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(file._id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
