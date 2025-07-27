import React from 'react'
import { useState } from 'react';

function App() {
  // 1. Basic useState Hook
  const [name, setName] = useState("rohan");
  const [count, setCount] = useState(0);

  // 2. Regular variable (doesn't trigger re-render)
  let regularCount = 0;

  const incrementRegular = () => {
    regularCount++;
    console.log("Regular count:", regularCount);
    // This won't update the UI because React doesn't know about the change
  };

  const incrementState = () => {
    setCount(count + 1);
    console.log("State count:", count);
    // This will update the UI because we're using useState
  };

  // 3. Derived State (calculated from existing state)
  const students = ["sahil", "sahil", "sahil", "sahil", "sahil", "sahil"];
  const studentCount = students.length; // Derived state - no need for useState

  return (
    <div>
      <h1>React Hooks and State Management</h1>

      {/* Example 1: Why regular variables don't work */}
      <div>
        <h2>Regular Variable (No Re-render)</h2>
        <button onClick={incrementRegular}>Click me: {regularCount}</button>
        <p>This button won't update the display because React doesn't know about the change.</p>
      </div>

      {/* Example 2: useState Hook (Triggers Re-render) */}
      <div>
        <h2>useState Hook (Triggers Re-render)</h2>
        <button onClick={incrementState}>Click me: {count}</button>
        <p>This button updates the display because we're using useState.</p>
      </div>

      {/* Example 3: Derived State */}
      <div>
        <h2>Derived State</h2>
        <p>Number of students: {studentCount}</p>
        <p>This is calculated from the students array, no useState needed.</p>
      </div>

      {/* Example 4: State Lifting */}
      <div>
        <h2>State Lifting</h2>
        <p>Current name in parent: {name}</p>
        <Child name={name} setName={setName} />
        <p>Child component can change the parent's state through props.</p>
      </div>
    </div>
  )
}

// Child Component - Demonstrates State Lifting
const Child = ({ name, setName }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>Child Component</h3>
      <p>Received name: {name}</p>
      <button onClick={() => setName("kush")}>Change name to Kush</button>
      <button onClick={() => setName("rohan")}>Change name to Rohan</button>
    </div>
  )
}

export default App