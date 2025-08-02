# Day 025 - Axios HTTP Requests: Complete API Integration Guide

## Understanding Axios HTTP Requests

Axios is a popular HTTP client library for making API requests in JavaScript applications. This day covers essential HTTP request methods, data formats, error handling, and advanced configuration patterns for seamless API integration.

---

## Installation and Setup

### Installing Axios:

```bash
# Using npm
npm install axios

# Using yarn
yarn add axios

# Using pnpm
pnpm add axios
```

### Package.json Dependencies:

After installation, your `package.json` should include:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0"
  }
}
```

### Importing Axios:

```jsx
// Basic import
import axios from 'axios';

// Named imports for specific methods
import { get, post, put, patch, delete } from 'axios';

// Creating axios instance
import axios from 'axios';
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000
});
```

---

## 1. The Problem: HTTP Requests in React Applications

### Why Axios Matters:

- **HTTP Client**: Simplified way to make HTTP requests
- **Promise-based**: Modern async/await support
- **Request/Response Interceptors**: Global request/response handling
- **Error Handling**: Comprehensive error management
- **Data Transformation**: Automatic JSON parsing
- **Browser/Node.js Support**: Works in both environments

### Traditional vs Axios Approach:

```jsx
// ❌ Traditional fetch approach
fetch("https://api.example.com/users")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// ✅ Axios approach
const response = await axios.get("https://api.example.com/users");
console.log(response.data);
```

---

## 2. Basic HTTP Request Methods

### Core Methods:

- **GET**: Retrieve data from server
- **POST**: Create new data on server
- **PUT**: Update entire resource
- **PATCH**: Update partial resource
- **DELETE**: Remove data from server

### GET Request - Fetch Data:

```jsx
import axios from "axios";

// Basic GET request
const response = await axios.get("https://api.example.com/users");

// GET with query parameters
const response = await axios.get("https://api.example.com/users", {
  params: {
    page: 1,
    limit: 10,
    search: "john",
  },
});

// GET with headers
const response = await axios.get("https://api.example.com/users", {
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
});
```

### POST Request - Create Data:

```jsx
// Basic POST request
const response = await axios.post("https://api.example.com/users", {
  name: "John Doe",
  email: "john@example.com",
  age: 25,
});

// POST with headers
const response = await axios.post("https://api.example.com/users", userData, {
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
});
```

### PUT Request - Update Entire Resource:

```jsx
// Update entire user resource
const response = await axios.put("https://api.example.com/users/1", {
  name: "John Updated",
  email: "john@example.com",
  age: 26,
  city: "New York",
});
```

### PATCH Request - Update Partial Resource:

```jsx
// Update only specific fields
const response = await axios.patch("https://api.example.com/users/1", {
  age: 26,
  city: "New York",
});
```

### DELETE Request - Remove Data:

```jsx
// Delete user
const response = await axios.delete("https://api.example.com/users/1");

// Delete with headers
const response = await axios.delete("https://api.example.com/users/1", {
  headers: {
    Authorization: "Bearer token",
  },
});
```

---

## 3. Axios Configuration Options

### Request Configuration:

```jsx
const config = {
  // URL parameters
  params: {
    page: 1,
    limit: 10,
  },

  // Request headers
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Request timeout
  timeout: 5000,

  // Response type
  responseType: "json", // 'text' | 'blob' | 'arraybuffer' | 'stream'

  // Request cancellation
  cancelToken: new CancelToken((c) => {
    // Cancel function
  }),
};

const response = await axios.get("https://api.example.com/users", config);
```

### Global Configuration:

```jsx
// Set default base URL
axios.defaults.baseURL = "https://api.example.com";

// Set default headers
axios.defaults.headers.common["Authorization"] = "Bearer token";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Set default timeout
axios.defaults.timeout = 10000;

// Set default response type
axios.defaults.responseType = "json";
```

---

## 4. Data Formats with Axios

### JSON Data (Default):

```jsx
// Automatic JSON parsing
const response = await axios.post("/api/users", {
  name: "John Doe",
  email: "john@example.com",
  age: 25,
  address: {
    street: "123 Main St",
    city: "New York",
    country: "USA",
  },
});

// Response data is automatically parsed
console.log(response.data); // JavaScript object
```

### Form Data (multipart/form-data):

```jsx
// File upload with form data
const formData = new FormData();
formData.append("name", "John Doe");
formData.append("email", "john@example.com");
formData.append("avatar", fileInput.files[0]);

const response = await axios.post("/api/upload", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
```

### URL Encoded Data:

```jsx
// URL encoded form data
const urlEncodedData = new URLSearchParams();
urlEncodedData.append("name", "John Doe");
urlEncodedData.append("email", "john@example.com");
urlEncodedData.append("age", "25");

const response = await axios.post("/api/users", urlEncodedData, {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
```

### Raw Text Data:

```jsx
// Send raw text
const response = await axios.post("/api/text", "Hello World", {
  headers: {
    "Content-Type": "text/plain",
  },
});
```

### Binary Data (Blob/ArrayBuffer):

```jsx
// Send binary data
const blob = new Blob(["Hello World"], { type: "text/plain" });
const response = await axios.post("/api/binary", blob, {
  headers: {
    "Content-Type": "application/octet-stream",
  },
});

// Download file as blob
const response = await axios.get("/api/download/file.pdf", {
  responseType: "blob",
});

// Create download link
const url = window.URL.createObjectURL(new Blob([response.data]));
const link = document.createElement("a");
link.href = url;
link.setAttribute("download", "file.pdf");
document.body.appendChild(link);
link.click();
link.remove();
```

### XML Data:

```jsx
// Send XML data
const xmlData = `
<user>
  <name>John Doe</name>
  <email>john@example.com</email>
  <age>25</age>
</user>
`;

const response = await axios.post("/api/xml", xmlData, {
  headers: {
    "Content-Type": "application/xml",
  },
});
```

---

## 5. Error Handling Patterns

### Basic Error Handling:

```jsx
try {
  const response = await axios.get("/api/users");
  console.log(response.data);
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.error("Error Status:", error.response.status);
    console.error("Error Data:", error.response.data);
    console.error("Error Headers:", error.response.headers);
  } else if (error.request) {
    // Request was made but no response received
    console.error("Network Error:", error.request);
  } else {
    // Something else happened
    console.error("Error:", error.message);
  }
}
```

### Advanced Error Handling:

```jsx
// Custom error handler
const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return "Bad Request: Invalid data provided";
      case 401:
        return "Unauthorized: Please login again";
      case 403:
        return "Forbidden: You don't have permission";
      case 404:
        return "Not Found: Resource not found";
      case 500:
        return "Server Error: Please try again later";
      default:
        return `Error ${status}: ${data.message || "Unknown error"}`;
    }
  } else if (error.request) {
    return "Network Error: Please check your connection";
  } else {
    return "Error: Something went wrong";
  }
};

// Usage
try {
  const response = await axios.get("/api/users");
  return response.data;
} catch (error) {
  const errorMessage = handleApiError(error);
  console.error(errorMessage);
  throw new Error(errorMessage);
}
```

---

## 6. Request/Response Interceptors

### Request Interceptors:

```jsx
// Add auth token to every request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add loading state
axios.interceptors.request.use(
  (config) => {
    // Show loading spinner
    document.body.classList.add("loading");
    return config;
  },
  (error) => {
    document.body.classList.remove("loading");
    return Promise.reject(error);
  }
);
```

### Response Interceptors:

```jsx
// Handle common response patterns
axios.interceptors.response.use(
  (response) => {
    // Hide loading spinner
    document.body.classList.remove("loading");
    return response;
  },
  (error) => {
    // Hide loading spinner
    document.body.classList.remove("loading");

    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
```

---

## 7. Concurrent Requests

### Multiple Requests:

```jsx
// Execute multiple requests simultaneously
const [users, posts, comments] = await Promise.all([
  axios.get("/api/users"),
  axios.get("/api/posts"),
  axios.get("/api/comments"),
]);

console.log("Users:", users.data);
console.log("Posts:", posts.data);
console.log("Comments:", comments.data);
```

### Sequential Requests:

```jsx
// Execute requests in sequence
const user = await axios.get("/api/users/1");
const userPosts = await axios.get(`/api/users/${user.data.id}/posts`);
const userComments = await axios.get(`/api/users/${user.data.id}/comments`);

console.log("User:", user.data);
console.log("Posts:", userPosts.data);
console.log("Comments:", userComments.data);
```

---

## 8. File Upload Examples

### Single File Upload:

```jsx
const handleFileUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log("Upload Progress:", percentCompleted);
      },
    });

    console.log("Upload successful:", response.data);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
```

### Multiple Files Upload:

```jsx
const handleMultipleFiles = async (files) => {
  try {
    const formData = new FormData();

    Array.from(files).forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    const response = await axios.post("/api/upload-multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Multiple files uploaded:", response.data);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
```

### File Upload with Progress:

```jsx
const uploadWithProgress = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      // Update progress bar
      setUploadProgress(percentCompleted);
    },
  });

  return response.data;
};
```

---

## 9. Authentication Patterns

### Bearer Token Authentication:

```jsx
// Set token in headers
const api = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Or set dynamically
const makeAuthenticatedRequest = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("/api/protected", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
```

### API Key Authentication:

```jsx
// Using API key in headers
const response = await axios.get("/api/data", {
  headers: {
    "X-API-Key": "your-api-key-here",
  },
});

// Using API key in query parameters
const response = await axios.get("/api/data", {
  params: {
    api_key: "your-api-key-here",
  },
});
```

### Basic Authentication:

```jsx
// Basic auth with username/password
const response = await axios.get("/api/protected", {
  auth: {
    username: "user",
    password: "password",
  },
});
```

---

## 10. Advanced Configuration

### Creating Axios Instance:

```jsx
// Create custom axios instance
const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Request Cancellation:

```jsx
import { CancelToken } from "axios";

// Create cancel token
const cancelTokenSource = CancelToken.source();

// Make request with cancel token
const response = await axios.get("/api/users", {
  cancelToken: cancelTokenSource.token,
});

// Cancel request
cancelTokenSource.cancel("Request cancelled by user");
```

---

## 11. React Integration Patterns

### Custom Hook for API Calls:

```jsx
import { useState, useEffect } from "react";
import axios from "axios";

const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(url, options);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Usage
function UserList() {
  const { data: users, loading, error } = useApi("/api/users");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### API Service Layer:

```jsx
// api/users.js
import api from "./api";

export const userApi = {
  // Get all users
  getUsers: (params) => api.get("/users", { params }),

  // Get user by ID
  getUser: (id) => api.get(`/users/${id}`),

  // Create user
  createUser: (userData) => api.post("/users", userData),

  // Update user
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),

  // Delete user
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// Usage in component
import { userApi } from "../api/users";

function UserComponent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.getUsers({ page: 1, limit: 10 });
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

---

## 12. Error Handling Best Practices

### Global Error Handler:

```jsx
// Global error interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error for debugging
    console.error("API Error:", error);

    // Handle specific error types
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Redirect to login
          window.location.href = "/login";
          break;
        case 403:
          // Show forbidden message
          alert("You don't have permission to access this resource");
          break;
        case 404:
          // Show not found message
          alert("Resource not found");
          break;
        case 500:
          // Show server error message
          alert("Server error. Please try again later");
          break;
        default:
          // Show generic error message
          alert(`Error ${status}: ${data.message || "Something went wrong"}`);
      }
    } else if (error.request) {
      // Network error
      alert("Network error. Please check your connection");
    } else {
      // Other error
      alert("Something went wrong");
    }

    return Promise.reject(error);
  }
);
```

### Retry Logic:

```jsx
const retryRequest = async (requestFn, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      // Wait before retrying (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
};

// Usage
const response = await retryRequest(() => axios.get("/api/users"));
```

---

## 13. Testing Axios Requests

### Mocking Axios:

```jsx
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

// Mock GET request
mock.onGet("/api/users").reply(200, [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
]);

// Mock POST request
mock.onPost("/api/users").reply(201, {
  id: 3,
  name: "New User",
});

// Mock error response
mock.onGet("/api/users/999").reply(404, {
  message: "User not found",
});
```

### Testing with Jest:

```jsx
import axios from "axios";

// Mock axios
jest.mock("axios");

test("fetches users successfully", async () => {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];

  axios.get.mockResolvedValue({ data: users });

  const response = await axios.get("/api/users");
  expect(response.data).toEqual(users);
});

test("handles error correctly", async () => {
  const errorMessage = "Network Error";
  axios.get.mockRejectedValue(new Error(errorMessage));

  await expect(axios.get("/api/users")).rejects.toThrow(errorMessage);
});
```

---

## 14. Performance Optimization

### Request Caching:

```jsx
const cache = new Map();

const cachedRequest = async (url, options = {}) => {
  const cacheKey = `${url}-${JSON.stringify(options)}`;

  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    const now = Date.now();

    // Cache for 5 minutes
    if (now - timestamp < 5 * 60 * 1000) {
      return data;
    }
  }

  const response = await axios.get(url, options);
  cache.set(cacheKey, {
    data: response.data,
    timestamp: Date.now(),
  });

  return response.data;
};
```

### Request Debouncing:

```jsx
import { useCallback } from "react";
import debounce from "lodash/debounce";

const useDebouncedApiCall = (apiCall, delay = 300) => {
  const debouncedCall = useCallback(debounce(apiCall, delay), [apiCall, delay]);

  return debouncedCall;
};

// Usage
function SearchComponent() {
  const searchUsers = useDebouncedApiCall(async (query) => {
    const response = await axios.get("/api/users", {
      params: { search: query },
    });
    setUsers(response.data);
  }, 500);

  const handleSearch = (e) => {
    searchUsers(e.target.value);
  };

  return (
    <input type="text" placeholder="Search users..." onChange={handleSearch} />
  );
}
```

---

## 15. Common Patterns and Best Practices

### Pattern 1: API Service Layer

```jsx
// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Pattern 2: Custom Hook for Data Fetching

```jsx
// hooks/useApi.js
import { useState, useEffect } from "react";
import api from "../services/api";

const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(endpoint, options);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useApi;
```

### Pattern 3: Form Submission with Axios

```jsx
// components/UserForm.jsx
import { useState } from "react";
import api from "../services/api";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/users", formData);
      console.log("User created:", response.data);
      // Reset form or redirect
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}
```

---

## 16. Debugging and Troubleshooting

### Common Issues:

#### Issue 1: CORS Errors

```jsx
// ❌ Problem: CORS error
const response = await axios.get('https://api.example.com/users');

// ✅ Solution: Use proxy or backend CORS configuration
// In package.json
{
  "proxy": "https://api.example.com"
}

// Then use relative URL
const response = await axios.get('/users');
```

#### Issue 2: Request Timeout

```jsx
// ❌ Problem: Request times out
const response = await axios.get("/api/users");

// ✅ Solution: Increase timeout
const response = await axios.get("/api/users", {
  timeout: 30000, // 30 seconds
});
```

#### Issue 3: Large File Upload Fails

```jsx
// ❌ Problem: Large file upload fails
const response = await axios.post("/api/upload", formData);

// ✅ Solution: Increase timeout and add progress tracking
const response = await axios.post("/api/upload", formData, {
  timeout: 60000, // 60 seconds
  onUploadProgress: (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log("Upload Progress:", percentCompleted);
  },
});
```

---

## 17. Key Takeaways

- **Axios** provides a clean, promise-based API for HTTP requests
- **Request/Response Interceptors** enable global request/response handling
- **Error Handling** should be comprehensive and user-friendly
- **Data Formats** support JSON, FormData, URL-encoded, and binary data
- **Authentication** can be handled with tokens, API keys, or basic auth
- **File Uploads** require proper FormData handling and progress tracking
- **Caching and Debouncing** improve performance for repeated requests
- **Testing** requires proper mocking of axios requests
- **Service Layer Pattern** keeps API calls organized and reusable

---

## 18. Interview Questions

1. What is the difference between axios and fetch?
2. How do you handle errors in axios requests?
3. What are interceptors and how do you use them?
4. How do you upload files using axios?
5. How do you implement request cancellation?
6. What are the different ways to send data with axios?
7. How do you test axios requests in your application?
8. How do you handle authentication with axios?

---

## 19. Practical Example (from App.jsx)

```jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const baseUrl = "https://api.api-ninjas.com/v1/randomuser";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function getdata() {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(baseUrl, {
          headers: {
            "X-Api-Key": API,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user:", err);
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
  );
}

export default App;
```

This comprehensive example demonstrates:

### **1. API Integration:**

- **Axios Configuration**: Proper headers and API key setup
- **Error Handling**: Try-catch with loading and error states
- **State Management**: User data, loading, and error states

### **2. HTTP Request Pattern:**

- **GET Request**: Fetching user data from external API
- **Headers**: API key authentication
- **Response Handling**: Data extraction and state updates

### **3. User Experience:**

- **Loading State**: Shows loading indicator during request
- **Error State**: Displays error message if request fails
- **Data Display**: Renders user information when available

### **4. Best Practices:**

- **Environment Variables**: API key stored in environment
- **Error Logging**: Console logging for debugging
- **Clean Component**: Proper separation of concerns

### **5. Advanced Features:**

- **Multiple useEffect**: Separate effects for data fetching and logging
- **Conditional Rendering**: Different UI states based on data
- **Error Boundaries**: Graceful error handling

The key benefits are:

- **Reliable API Calls**: Proper error handling and loading states
- **User Experience**: Clear feedback during loading and errors
- **Maintainable Code**: Clean separation of concerns
- **Debugging Friendly**: Proper error logging and state management
- **Scalable Pattern**: Can be easily extended for other API calls
- **Security**: API key properly handled through environment variables

This pattern can be applied to any API integration in React applications, providing a solid foundation for handling HTTP requests with proper error handling and user feedback.
