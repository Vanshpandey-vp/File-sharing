import React, { useEffect, useState } from 'react';

export default function PublicFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicFiles = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/files/public');
        const data = await res.json();
        setFiles(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert('Failed to load public files');
        setLoading(false);
      }
    };

    fetchPublicFiles();
  }, []);

  const fileURL = (filename) => `http://localhost:5000/uploads/${filename}`;

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">📂 Public Files</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading files...</p>
        ) : files.length === 0 ? (
          <p className="text-center text-gray-500">No public files available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border bg-white text-sm">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">File Name</th>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">Uploader</th>
                  <th className="px-4 py-2 border">Uploaded At</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file._id} className="text-gray-700 text-center">
                    <td className="px-4 py-2 border">{file.filename}</td>
                    <td className="px-4 py-2 border">{file.mimetype}</td>
                    <td className="px-4 py-2 border">{file.uploadedBy?.name || 'Unknown'}</td>
                    <td className="px-4 py-2 border">{new Date(file.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-2 border space-x-2">
                      {/* Open in new tab */}
                      <a
                        href={fileURL(file.filePath)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Open
                      </a>

                      {/* Force download */}
                      <a
  href={`http://localhost:5000/api/files/download/${file.filePath}`}
  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
>
  Download
</a>

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
