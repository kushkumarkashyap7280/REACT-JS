import React, { useState, useRef } from 'react'

function App() {
  // ============================================
  // CONTROLLED vs UNCONTROLLED COMPONENTS
  // ============================================

  // CONTROLLED COMPONENTS (React Way)
  // - Use state to control form values
  // - Use onChange handlers to update state
  // - React controls the form data
  // - Better for validation, real-time updates, and complex form logic
  // - More code but gives you full control

  // UNCONTROLLED COMPONENTS (Traditional Way)
  // - Use refs to access form values
  // - Form data is handled by the DOM
  // - Less code but less control
  // - Good for simple forms or when you need DOM access

  // ============================================
  // CONTROLLED COMPONENT EXAMPLE
  // ============================================
  const [controlledForm, setControlledForm] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleControlledChange = (e) => {
    const { name, value } = e.target;
    setControlledForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleControlledSubmit = (e) => {
    e.preventDefault();
    console.log('Controlled Form Data:', controlledForm);

    // Case 1: Sending JSON data (strings/numbers)
    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(controlledForm)
    });

    // Case 2: Sending FormData (files + text)
    // const formData = new FormData();
    // formData.append('username', controlledForm.username);
    // formData.append('password', controlledForm.password);
    // formData.append('email', controlledForm.email);
    // 
    // fetch('http://localhost:3000/api/users', {
    //   method: 'POST',
    //   body: formData
    // });
  };

  // ============================================
  // UNCONTROLLED COMPONENT EXAMPLE
  // ============================================
  const uncontrolledFormRef = useRef(null);

  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(uncontrolledFormRef.current);

    // Convert FormData to object
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log('Uncontrolled Form Data:', data);

    // Case 1: Sending JSON data
    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Case 2: Sending FormData (for files)
    // fetch('http://localhost:3000/api/users', {
    //   method: 'POST',
    //   body: formData
    // });
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        React Forms: Controlled vs Uncontrolled Components
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* CONTROLLED COMPONENT */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-200">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            ✅ Controlled Component (React Way)
          </h2>
          <p className="text-gray-600 mb-4">
            Uses state to control form values. React manages the form data.
          </p>

          <form onSubmit={handleControlledSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={controlledForm.username}
                onChange={handleControlledChange}
                placeholder="Enter username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={controlledForm.password}
                onChange={handleControlledChange}
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={controlledForm.email}
                onChange={handleControlledChange}
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
            >
              Submit (Controlled)
            </button>
          </form>

          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">
              <strong>Current State:</strong> {JSON.stringify(controlledForm, null, 2)}
            </p>
          </div>
        </div>

        {/* UNCONTROLLED COMPONENT */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-orange-200">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">
            🔄 Uncontrolled Component (Traditional Way)
          </h2>
          <p className="text-gray-600 mb-4">
            Uses refs to access form values. DOM manages the form data.
          </p>

          <form ref={uncontrolledFormRef} onSubmit={handleUncontrolledSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
            >
              Submit (Uncontrolled)
            </button>
          </form>

          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> Form data is accessed only on submit via FormData
            </p>
          </div>
        </div>
      </div>

      {/* COMPARISON TABLE */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          📊 Comparison: When to Use Each Approach
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Feature</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Controlled</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Uncontrolled</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Code Complexity</td>
                <td className="border border-gray-300 px-4 py-2">More code, more control</td>
                <td className="border border-gray-300 px-4 py-2">Less code, less control</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-medium">Real-time Validation</td>
                <td className="border border-gray-300 px-4 py-2">✅ Easy to implement</td>
                <td className="border border-gray-300 px-4 py-2">❌ Difficult</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">Form Reset</td>
                <td className="border border-gray-300 px-4 py-2">✅ Easy</td>
                <td className="border border-gray-300 px-4 py-2">❌ Requires refs</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-medium">Performance</td>
                <td className="border border-gray-300 px-4 py-2">⚠️ Re-renders on every keystroke</td>
                <td className="border border-gray-300 px-4 py-2">✅ No re-renders</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium">File Uploads</td>
                <td className="border border-gray-300 px-4 py-2">✅ Full control</td>
                <td className="border border-gray-300 px-4 py-2">✅ Native support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FETCH EXAMPLES */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          🌐 Fetch API Examples
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">JSON Data (Strings/Numbers)</h4>
            <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
              {`fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});`}
            </pre>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">FormData (Files + Text)</h4>
            <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
              {`const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('username', username);

fetch('/api/upload', {
  method: 'POST',
  body: formData
});`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
