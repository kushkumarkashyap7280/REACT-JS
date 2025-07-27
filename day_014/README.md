# Day 014 - React Hooks: useState and State Management

## Understanding React Hooks and State

React Hooks are functions that allow you to use state and other React features in functional components. The `useState` hook is the most fundamental hook that enables components to manage local state.

---

## 1. What are React Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 to allow you to use state without writing a class.

### Key Rules for Hooks:

- Only call hooks at the top level of your function component
- Don't call hooks inside loops, conditions, or nested functions
- Only call hooks from React function components or custom hooks

---

## 2. The useState Hook

The `useState` hook returns an array with two elements:

- The current state value
- A function to update the state

### Basic Syntax (from App.jsx)

```jsx
const [state, setState] = useState(initialValue);
```

### Example: Basic useState (from App.jsx)

```jsx
const [name, setName] = useState("rohan");
const [count, setCount] = useState(0);
```

---

## 3. Why Regular Variables Don't Work

When you update a regular variable inside a React component, React doesn't know that something changed and won't re-render the component.

### Example: Regular Variable (from App.jsx)

```jsx
let regularCount = 0;

const incrementRegular = () => {
  regularCount++;
  console.log("Regular count:", regularCount);
  // This won't update the UI because React doesn't know about the change
};

<button onClick={incrementRegular}>Click me: {regularCount}</button>;
```

**Problem:** The button text won't update even though the variable changes.

### Example: useState Hook (from App.jsx)

```jsx
const [count, setCount] = useState(0);

const incrementState = () => {
  setCount(count + 1);
  console.log("State count:", count);
  // This will update the UI because we're using useState
};

<button onClick={incrementState}>Click me: {count}</button>;
```

**Solution:** The button text updates because React knows when state changes.

---

## 4. When React Re-renders

React only re-renders a component when:

- Props change
- A state variable changes using useState
- A parent component re-renders and passes new data
- Context value changes (if using useContext)

---

## 5. Derived State

Derived state is calculated from existing state or props and doesn't need its own useState hook.

### Example: Derived State (from App.jsx)

```jsx
const students = ["sahil", "sahil", "sahil", "sahil", "sahil", "sahil"];
const studentCount = students.length; // Derived state - no need for useState

<p>Number of students: {studentCount}</p>;
```

**Benefits:**

- No extra state management needed
- Automatically updates when source data changes
- Reduces complexity and potential bugs

---

## 6. State Lifting

State lifting is the process of moving state up to a common ancestor component so that multiple components can share and modify the same state.

### Problem: Child Can't Update Parent State

```jsx
// This doesn't work - child can't directly update parent state
<Child />
```

### Solution: Pass State and Setter as Props (from App.jsx)

```jsx
// Parent component
const [name, setName] = useState("rohan");

<Child name={name} setName={setName} />;

// Child component
const Child = ({ name, setName }) => {
  return (
    <div>
      <h3>Child Component</h3>
      <p>Received name: {name}</p>
      <button onClick={() => setName("kush")}>Change name to Kush</button>
      <button onClick={() => setName("rohan")}>Change name to Rohan</button>
    </div>
  );
};
```

**How it works:**

1. State is defined in the parent component
2. State value and setter function are passed as props to child
3. Child can update parent's state by calling the setter function
4. Parent re-renders with new state value

---

## 7. Best Practices

1. **Use descriptive names** for state variables and setters
2. **Initialize state** with appropriate default values
3. **Use derived state** when possible instead of separate useState
4. **Lift state up** when multiple components need the same data
5. **Keep state minimal** - don't store data that can be calculated
6. **Use functional updates** when new state depends on previous state

### Functional Updates

```jsx
// Instead of this (can cause issues with stale closures)
setCount(count + 1);

// Use this (always uses latest state)
setCount((prevCount) => prevCount + 1);
```

---

## 8. Key Takeaways

- **useState** enables state management in functional components
- **Regular variables** don't trigger re-renders in React
- **Derived state** should be calculated, not stored
- **State lifting** allows child components to update parent state
- **Hooks** must be called at the top level of components
- **Functional updates** prevent stale closure issues

---

## 9. Interview Questions

1. What are React Hooks and why were they introduced?
2. How does the useState hook work?
3. Why don't regular variables trigger re-renders in React?
4. What is state lifting and when would you use it?
5. What are the rules for using React Hooks?
6. What is derived state and when should you use it?
7. How do you handle state updates that depend on previous state?

---

## 10. Practical Example (from App.jsx)

```jsx
import React from "react";
import { useState } from "react";

function App() {
  // Basic useState Hook
  const [name, setName] = useState("rohan");
  const [count, setCount] = useState(0);

  // Regular variable (doesn't trigger re-render)
  let regularCount = 0;

  const incrementRegular = () => {
    regularCount++;
    console.log("Regular count:", regularCount);
  };

  const incrementState = () => {
    setCount(count + 1);
    console.log("State count:", count);
  };

  // Derived State
  const students = ["sahil", "sahil", "sahil", "sahil", "sahil", "sahil"];
  const studentCount = students.length;

  return (
    <div>
      <h1>React Hooks and State Management</h1>

      {/* Regular Variable Example */}
      <button onClick={incrementRegular}>Click me: {regularCount}</button>

      {/* useState Hook Example */}
      <button onClick={incrementState}>Click me: {count}</button>

      {/* Derived State Example */}
      <p>Number of students: {studentCount}</p>

      {/* State Lifting Example */}
      <Child name={name} setName={setName} />
    </div>
  );
}

const Child = ({ name, setName }) => {
  return (
    <div>
      <h3>Child Component</h3>
      <p>Received name: {name}</p>
      <button onClick={() => setName("kush")}>Change name to Kush</button>
    </div>
  );
};
```
