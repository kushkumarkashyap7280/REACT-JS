import React, { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const baseUrl = "https://api.api-ninjas.com/v1/randomuser";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_KEY;

  // ===== HTTP REQUEST METHODS WITH AXIOS =====

  // GET Request - Fetch data
  // axios.get(url, config)
  // Example: axios.get('https://api.example.com/users', { headers: {...} })

  // POST Request - Create new data
  // axios.post(url, data, config)
  // Example: axios.post('https://api.example.com/users', { name: 'John', email: 'john@example.com' })

  // PUT Request - Update entire resource
  // axios.put(url, data, config)
  // Example: axios.put('https://api.example.com/users/1', { name: 'John Updated', email: 'john@example.com' })

  // PATCH Request - Update partial resource
  // axios.patch(url, data, config)
  // Example: axios.patch('https://api.example.com/users/1', { name: 'John Updated' })

  // DELETE Request - Delete resource
  // axios.delete(url, config)
  // Example: axios.delete('https://api.example.com/users/1')

  // ===== AXIOS CONFIGURATION OPTIONS =====

  // Headers - Authentication, Content-Type, etc.
  // headers: {
  //   'Authorization': 'Bearer token',
  //   'Content-Type': 'application/json',
  //   'X-Api-Key': 'your-api-key',
  //   'Accept': 'application/json'
  // }

  // Params - Query parameters
  // params: {
  //   page: 1,
  //   limit: 10,
  //   search: 'john'
  // }

  // Timeout - Request timeout in milliseconds
  // timeout: 5000

  // Response Type - Expected response format
  // responseType: 'json' | 'text' | 'blob' | 'arraybuffer' | 'stream'

  // ===== DATA FORMATS WITH AXIOS =====

  // 1. JSON Data (Default)
  // axios.post('/api/users', {
  //   name: 'John',
  //   email: 'john@example.com',
  //   age: 25
  // })

  // 2. Form Data (multipart/form-data)
  // const formData = new FormData();
  // formData.append('name', 'John');
  // formData.append('email', 'john@example.com');
  // formData.append('file', fileInput.files[0]);
  // axios.post('/api/upload', formData, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // })

  // 3. URL Encoded Data (application/x-www-form-urlencoded)
  // const urlEncodedData = new URLSearchParams();
  // urlEncodedData.append('name', 'John');
  // urlEncodedData.append('email', 'john@example.com');
  // axios.post('/api/users', urlEncodedData, {
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // })

  // 4. Raw Text Data
  // axios.post('/api/text', 'Hello World', {
  //   headers: {
  //     'Content-Type': 'text/plain'
  //   }
  // })

  // 5. Binary Data (Blob/ArrayBuffer)
  // const blob = new Blob(['Hello World'], { type: 'text/plain' });
  // axios.post('/api/binary', blob, {
  //   headers: {
  //     'Content-Type': 'application/octet-stream'
  //   }
  // })

  // 6. XML Data
  // const xmlData = '<user><name>John</name><email>john@example.com</email></user>';
  // axios.post('/api/xml', xmlData, {
  //   headers: {
  //     'Content-Type': 'application/xml'
  //   }
  // })

  // ===== ADVANCED AXIOS CONFIGURATION =====

  // Base URL Configuration
  // axios.defaults.baseURL = 'https://api.example.com';
  // axios.defaults.headers.common['Authorization'] = 'Bearer token';
  // axios.defaults.timeout = 10000;

  // Request/Response Interceptors
  // axios.interceptors.request.use(config => {
  //   // Add auth token to every request
  //   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  //   return config;
  // });

  // axios.interceptors.response.use(
  //   response => response,
  //   error => {
  //     if (error.response.status === 401) {
  //       // Handle unauthorized access
  //       localStorage.removeItem('token');
  //       window.location.href = '/login';
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  // ===== ERROR HANDLING PATTERNS =====

  // Try-Catch Pattern
  // try {
  //   const response = await axios.get('/api/users');
  //   console.log(response.data);
  // } catch (error) {
  //   if (error.response) {
  //     // Server responded with error status
  //     console.error('Error:', error.response.data);
  //     console.error('Status:', error.response.status);
  //   } else if (error.request) {
  //     // Request was made but no response received
  //     console.error('Network error:', error.request);
  //   } else {
  //     // Something else happened
  //     console.error('Error:', error.message);
  //   }
  // }

  // ===== CONCURRENT REQUESTS =====

  // Multiple requests at once
  // const [users, posts] = await Promise.all([
  //   axios.get('/api/users'),
  //   axios.get('/api/posts')
  // ]);

  // ===== FILE UPLOAD EXAMPLES =====

  // Single file upload
  // const handleFileUpload = async (file) => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   const response = await axios.post('/api/upload', formData);
  // };

  // Multiple files upload
  // const handleMultipleFiles = async (files) => {
  //   const formData = new FormData();
  //   Array.from(files).forEach((file, index) => {
  //     formData.append(`file${index}`, file);
  //   });
  //   const response = await axios.post('/api/upload-multiple', formData);
  // };

  // ===== DOWNLOAD FILES =====

  // Download file as blob
  // const downloadFile = async (url) => {
  //   const response = await axios.get(url, {
  //     responseType: 'blob'
  //   });
  //   const url = window.URL.createObjectURL(new Blob([response.data]));
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.setAttribute('download', 'filename.pdf');
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  // };

  useEffect(() => {
    async function getdata() {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(baseUrl, {
          headers: {
            'X-Api-Key': API
          }
        });
        setUser(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    }
    getdata();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Random User</h1>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Location: {user.location}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  )
}

export default App
