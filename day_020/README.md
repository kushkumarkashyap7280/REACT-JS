# Day 020 - React Hooks: useRef and DOM Access

## Understanding useRef Hook

The `useRef` hook is a React hook that provides a way to access DOM elements directly and persist values across renders without causing re-renders. It's particularly useful when you need to interact with DOM elements or store mutable values that don't trigger component updates.

---

## 1. What is useRef?

`useRef` returns a mutable ref object with a `.current` property that can be initialized with a value. The ref object persists for the full lifetime of the component.

### Key Characteristics:

- **Mutable**: You can modify `.current` without causing re-renders
- **Persistent**: The ref object stays the same between renders
- **DOM Access**: Can be attached to DOM elements via the `ref` attribute
- **Value Storage**: Can store any mutable value

---

## 2. Basic Syntax

```jsx
import { useRef } from "react";

const ref = useRef(initialValue);
```

### Parameters:

- `initialValue`: The initial value for the `.current` property

### Returns:

- A ref object with a `.current` property

---

## 3. Three Main Use Cases

### Use Case 1: Accessing DOM Elements

```jsx
import { useRef } from "react";

function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
```

### Use Case 2: Storing Mutable Values

```jsx
import { useRef, useEffect } from "react";

function Timer() {
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log("Timer tick");
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return <div>Timer is running</div>;
}
```

### Use Case 3: Storing Previous Values

```jsx
import { useRef, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  });

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## 4. DOM Access with useRef

### Basic Form Handling

```jsx
import { useRef } from "react";

function Form() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", nameRef.current.value);
    console.log("Email:", emailRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" placeholder="Name" />
      <input ref={emailRef} type="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Focus Management

```jsx
import { useRef } from "react";

function FocusExample() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  const blurInput = () => {
    inputRef.current.blur();
  };

  const selectText = () => {
    inputRef.current.select();
  };

  return (
    <div>
      <input ref={inputRef} type="text" defaultValue="Hello World" />
      <button onClick={focusInput}>Focus</button>
      <button onClick={blurInput}>Blur</button>
      <button onClick={selectText}>Select All</button>
    </div>
  );
}
```

---

## 5. Traditional DOM Access vs useRef

### Traditional Way (Not Recommended in React)

```jsx
// ❌ Traditional DOM access
function TraditionalForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    console.log(name.value, email.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id="name" type="text" />
      <input id="email" type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### React Way with useRef (Recommended)

```jsx
// ✅ React way with useRef
function ReactForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nameRef.current.value, emailRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" />
      <input ref={emailRef} type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 6. Advanced useRef Patterns

### Pattern 1: Storing Previous Values

```jsx
import { useRef, useEffect } from "react";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Pattern 2: Storing Mutable Values

```jsx
import { useRef, useEffect } from "react";

function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={stopTimer}>Stop Timer</button>
    </div>
  );
}
```

### Pattern 3: Storing Callback References

```jsx
import { useRef, useCallback } from "react";

function SearchComponent() {
  const searchTimeoutRef = useRef(null);

  const handleSearch = useCallback((searchTerm) => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout
    searchTimeoutRef.current = setTimeout(() => {
      // Perform search
      console.log("Searching for:", searchTerm);
    }, 500);
  }, []);

  return (
    <input
      type="text"
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

---

## 7. useRef vs useState

### When to Use useRef:

- **DOM Access**: When you need to access DOM elements
- **Mutable Values**: When you need to store values that don't trigger re-renders
- **Previous Values**: When you need to track previous state values
- **Timers/Intervals**: When you need to store timer IDs
- **Third-party Libraries**: When integrating with DOM-focused libraries

### When to Use useState:

- **UI State**: When the value should trigger re-renders
- **Form Data**: When you need controlled components
- **Calculated Values**: When the value affects the UI
- **User Interactions**: When user actions should update the UI

### Comparison Example:

```jsx
import { useState, useRef } from "react";

function Comparison() {
  // useState - triggers re-renders
  const [count, setCount] = useState(0);

  // useRef - doesn't trigger re-renders
  const renderCount = useRef(0);

  renderCount.current += 1;

  return (
    <div>
      <p>State count: {count}</p>
      <p>Render count: {renderCount.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment State</button>
    </div>
  );
}
```

---

## 8. Best Practices

1. **Don't Overuse**: Only use useRef when you need DOM access or mutable values
2. **Clean Up**: Always clean up timers, intervals, and subscriptions
3. **Avoid Direct DOM Manipulation**: Use React's declarative approach when possible
4. **Use for Mutable Values**: Store values that shouldn't trigger re-renders
5. **Combine with useEffect**: Use useEffect for cleanup and side effects

### Good Practices:

```jsx
// ✅ Good - Proper cleanup
useEffect(() => {
  const timer = setInterval(() => {
    // Do something
  }, 1000);

  return () => clearInterval(timer);
}, []);

// ✅ Good - Using ref for DOM access
const inputRef = useRef(null);
<input ref={inputRef} />;

// ❌ Bad - Direct DOM manipulation
useEffect(() => {
  document.getElementById("myInput").focus();
}, []);
```

---

## 9. Common Mistakes

### Mistake 1: Using useRef Instead of useState

```jsx
// ❌ Wrong - This won't trigger re-renders
const [count, setCount] = useState(0);
const countRef = useRef(0);

const increment = () => {
  countRef.current += 1; // UI won't update
};

// ✅ Correct - Use useState for UI state
const [count, setCount] = useState(0);

const increment = () => {
  setCount(count + 1); // UI will update
};
```

### Mistake 2: Not Cleaning Up

```jsx
// ❌ Wrong - Memory leak
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Tick");
  }, 1000);
  // No cleanup
}, []);

// ✅ Correct - Proper cleanup
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

### Mistake 3: Accessing ref Before Mount

```jsx
// ❌ Wrong - ref.current might be null
const inputRef = useRef(null);

const handleClick = () => {
  inputRef.current.focus(); // Might fail
};

// ✅ Correct - Check if ref exists
const handleClick = () => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
};
```

---

## 10. Key Takeaways

- **useRef** provides a way to access DOM elements and store mutable values
- **Refs don't trigger re-renders** when their `.current` property changes
- **Always clean up** timers, intervals, and subscriptions
- **Use for DOM access** when you need direct element manipulation
- **Combine with useEffect** for proper lifecycle management
- **Don't overuse** - prefer React's declarative approach when possible

---

## 11. Interview Questions

1. What is useRef and when would you use it?
2. What's the difference between useRef and useState?
3. How do you access DOM elements with useRef?
4. What are the main use cases for useRef?
5. How do you store previous values with useRef?
6. What are common mistakes when using useRef?
7. How do you clean up resources with useRef?
8. When should you use useRef vs useState?

---

## 12. Practical Example (from App.jsx)

```jsx
import { useRef } from "react";
import React from "react";

function App() {
  // Traditional way of getting data using querySelector or getElementById
  // const name = document.querySelector('#name');
  // const bio = document.querySelector('#bio');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(name.value, bio.value);
  // }

  // Using useRef hook - React way
  const nameRef = useRef(null);
  const bioRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", nameRef.current.value);
    console.log("Bio:", bioRef.current.value);
  };

  return (
    <div>
      <h2>useRef Hook Example</h2>
      <p>This demonstrates how to use useRef to access DOM elements directly</p>

      {/* Traditional way - commented out */}
      {/* <form onSubmit={handleSubmit}>
                <input type="text" id='name' placeholder="Enter name" />
                <input type="text" id="bio" placeholder="Enter bio" />
                <button type='submit'>Submit</button>
            </form> */}

      {/* Using useRef hook - React way */}
      <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} placeholder="Enter name" />
        <input type="text" ref={bioRef} placeholder="Enter bio" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
```

This example demonstrates:

- **Traditional DOM access** vs **React's useRef approach**
- **Direct DOM element access** through refs
- **Form handling** with useRef
- **Proper React patterns** for DOM manipulation
- **Clean separation** between commented traditional code and React implementation

The key difference is that useRef provides a React-friendly way to access DOM elements without breaking React's declarative paradigm.
