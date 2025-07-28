# Day 016 - React Hooks: useEffect and Side Effects

## Understanding useEffect Hook

The `useEffect` hook is one of the most important React hooks that allows you to perform side effects in functional components. Side effects are operations that happen outside of the normal React render cycle, such as API calls, subscriptions, or manually changing the DOM.

---

## 1. What are Side Effects?

Side effects are operations that:

- Don't directly relate to rendering the UI
- Happen outside of React's render cycle
- Include API calls, subscriptions, timers, DOM manipulation
- Need to be managed carefully to avoid memory leaks

### Examples of Side Effects:

- Fetching data from an API
- Setting up subscriptions
- Updating document title
- Setting up timers/intervals
- Logging to console
- Local storage operations

---

## 2. The useEffect Hook

The `useEffect` hook takes two arguments:

1. A function (the effect)
2. A dependency array (optional)

### Basic Syntax

```jsx
useEffect(() => {
  // Side effect code here
}, [dependencies]);
```

---

## 3. Four Ways to Use useEffect

### Type 1: No Dependency Array (Runs on Every Render)

```jsx
useEffect(() => {
  console.log("I will change on every render");
  // This runs after every render
});
```

**When it runs:** After every render of the component
**Use case:** When you need to perform an effect on every render (rarely used)

### Type 2: Empty Dependency Array (Runs Only Once)

```jsx
useEffect(() => {
  console.log("I will run first time only");
}, []);
```

**When it runs:** Only once when the component mounts
**Use case:** Setting up subscriptions, initial API calls, one-time setup

### Type 3: With Dependencies (Runs When Dependencies Change)

```jsx
const [email, setEmail] = useState("");

useEffect(() => {
  console.log("I will change with dependency only");
}, [email]);
```

**When it runs:** When the component mounts AND whenever `email` changes
**Use case:** Responding to specific state or prop changes

### Type 4: With Cleanup Function

```jsx
const [time, setTime] = useState(new Date());

useEffect(() => {
  const changeTime = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => clearInterval(changeTime); // Cleanup function
}, []);
```

**When it runs:** Setup on mount, cleanup on unmount
**Use case:** Preventing memory leaks from timers, subscriptions, etc.

---

## 4. Understanding Dependencies

The dependency array tells React when to re-run the effect:

- **No array:** Runs after every render
- **Empty array `[]`:** Runs only once on mount
- **With values `[email, count]`:** Runs on mount and when any dependency changes

### Common Mistakes with Dependencies

```jsx
// ❌ Missing dependency
useEffect(() => {
  console.log(count);
}, []); // count is used but not in dependencies

// ✅ Correct
useEffect(() => {
  console.log(count);
}, [count]);
```

---

## 5. Cleanup Functions

Cleanup functions prevent memory leaks by cleaning up resources when the component unmounts or when dependencies change.

### Example: Timer Cleanup

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => clearInterval(timer); // Cleanup
}, []);
```

**Why cleanup is important:**

- Prevents memory leaks
- Stops ongoing operations when component unmounts
- Cancels API calls, subscriptions, timers

---

## 6. Real-World Examples

### Example 1: API Call with Loading State

```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("https://api.example.com/data");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []); // Empty dependency - runs once on mount
```

### Example 2: Document Title Update

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]); // Updates title whenever count changes
```

### Example 3: Event Listener

```jsx
useEffect(() => {
  const handleResize = () => {
    console.log("Window resized");
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []); // Setup once, cleanup on unmount
```

---

## 7. Best Practices

1. **Always include dependencies** that are used inside the effect
2. **Use cleanup functions** for subscriptions, timers, and event listeners
3. **Keep effects focused** - one effect per concern
4. **Avoid infinite loops** by being careful with dependencies
5. **Use multiple effects** instead of one large effect
6. **Consider using custom hooks** for reusable side effects

### Avoiding Infinite Loops

```jsx
// ❌ This will cause infinite loops
useEffect(() => {
  setCount(count + 1);
}, [count]);

// ✅ Use functional updates when possible
useEffect(() => {
  setCount((prev) => prev + 1);
}, []); // Only runs once
```

---

## 8. Common Patterns

### Pattern 1: Data Fetching

```jsx
useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    const data = await api.getData();
    if (isMounted) {
      setData(data);
    }
  };

  fetchData();

  return () => {
    isMounted = false;
  };
}, []);
```

### Pattern 2: Debounced Search

```jsx
useEffect(() => {
  const timeoutId = setTimeout(() => {
    // Perform search
    searchAPI(searchTerm);
  }, 500);

  return () => clearTimeout(timeoutId);
}, [searchTerm]);
```

---

## 9. Key Takeaways

- **useEffect** handles side effects in functional components
- **Dependency array** controls when the effect runs
- **Cleanup functions** prevent memory leaks
- **Side effects** are operations outside React's render cycle
- **Multiple effects** are better than one complex effect
- **Always clean up** subscriptions, timers, and event listeners

---

## 10. Interview Questions

1. What is useEffect and when would you use it?
2. What are the different ways to use useEffect?
3. What is the dependency array and why is it important?
4. How do you prevent memory leaks with useEffect?
5. What is a cleanup function and when do you need it?
6. How do you handle API calls with useEffect?
7. What are common mistakes when using useEffect?
8. How do you avoid infinite loops with useEffect?

---

## 11. Practical Example (from App.jsx)

```jsx
import React, { useEffect, useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [time, setTime] = useState(new Date());

  // Type 1: No dependency - runs on every render
  useEffect(() => {
    console.log("I will change on every render");
  });

  // Type 2: Empty dependency - runs only once
  useEffect(() => {
    console.log("I will run first time only");
  }, []);

  // Type 3: With dependency - runs when email changes
  useEffect(() => {
    console.log("I will change with dependency only");
  }, [email]);

  // Type 4: With cleanup function
  useEffect(() => {
    const changeTime = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(changeTime);
  }, []);

  return (
    <div>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <h2>Your email is: {email}</h2>
      {time.toLocaleTimeString()}
    </div>
  );
}

export default App;
```

This example demonstrates all four types of useEffect usage:

- Real-time email validation feedback
- One-time setup (timer)
- Dependency-based effects
- Proper cleanup to prevent memory leaks
