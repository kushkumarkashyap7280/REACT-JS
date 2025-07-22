# Day 009 - React Hooks and useState

## Understanding React Hooks

Hooks are special functions in React that let you "hook into" React features from functional components. They allow you to use state, lifecycle methods, and other React features without writing a class component.

### What are Hooks?

- Functions that let you use React features in functional components
- The most common hook is `useState`
- Hooks must be called at the top level of your component (not inside loops, conditions, or nested functions)
- All hooks start with the word "use" (e.g., `useState`, `useEffect`)

## The useState Hook

`useState` lets you add state to your functional components.

### Syntax

```jsx
const [state, setState] = useState(initialValue);
```

- `state`: The current value of the state variable
- `setState`: Function to update the state
- `initialValue`: The initial value for the state

### Example Usage

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

## Best Practices for useState

1. Use separate state variables for unrelated data
2. Always update state using the setter function (never mutate state directly)
3. You can use any type as state (number, string, array, object)
4. For derived state, compute it during render instead of storing it
5. Use functional updates if the new state depends on the previous state:
   ```jsx
   setCount((prevCount) => prevCount + 1);
   ```

## What We Learned Today

### 1. What are Hooks?

- Hooks let you use state and other React features in functional components
- `useState` is the most basic and commonly used hook

### 2. How to Use useState

- Import `useState` from React
- Call `useState(initialValue)` inside your component
- Use the state variable and setter in your JSX

### 3. Updating State

- Use the setter function to update state
- React will re-render the component with the new state

### 4. Multiple State Variables

- You can call `useState` multiple times for different pieces of state
  ```jsx
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  ```

## Practical Implementation

We built a simple counter app that demonstrates:

1. Using `useState` to manage the counter value
2. Updating state with button clicks
3. Resetting state to its initial value
4. Rendering state in the UI

## Component Structure

```jsx
// Counter.jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
```

## Key Takeaways

1. **Hooks** let you use React features in functional components
2. **useState** is used to add state to your components
3. Always use the setter function to update state
4. You can have multiple state variables in one component
5. State updates cause the component to re-render

## Exercise Suggestions

1. Add an input field and use `useState` to manage its value
2. Create a toggle button that switches between "ON" and "OFF" using state
3. Build a simple to-do list using `useState` for the list items
4. Try using multiple state variables in one component
5. Refactor a class component to use hooks instead

## Interview Questions

1. What are React hooks and why were they introduced?
2. How does `useState` work? What does it return?
3. Can you use hooks inside loops or nested functions? Why or why not?
4. How do you update state based on the previous value?
5. What happens when you call the setter function from `useState`?
