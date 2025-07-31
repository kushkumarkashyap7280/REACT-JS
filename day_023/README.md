# Day 023 - React Performance Optimization: React.memo, useMemo, and useCallback

## Understanding React Performance Optimization

React Performance Optimization is crucial for building fast and responsive applications. This day covers three essential optimization techniques: `React.memo`, `useMemo`, and `useCallback` that help prevent unnecessary re-renders and expensive calculations.

---

## 1. The Problem: Unnecessary Re-renders

### Why Performance Optimization Matters:

- **Unnecessary Re-renders**: Child components re-render when parent state changes, even if their props haven't changed
- **Expensive Calculations**: Functions and objects are recreated on every render, causing performance issues
- **Memory Leaks**: Repeated calculations and object creation can lead to memory problems
- **Poor User Experience**: Slow rendering affects user interaction and responsiveness

### Example of the Problem:

```jsx
import React from "react";
import Button from "./components/Button";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  // This function is recreated on every render
  const Increment = () => {
    setCount(count + 1);
  };

  const Decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <Button onClick={Increment}>Increment</Button>
      <Button onClick={Decrement}>Decrement</Button>
    </div>
  );
}
```

In this example, every time `count` changes, the `Increment` and `Decrement` functions are recreated, causing the `Button` components to re-render unnecessarily.

---

## 2. React.memo: Preventing Unnecessary Re-renders

### What is React.memo?

`React.memo` is a higher-order component that memoizes your component, preventing re-renders when props haven't changed.

### Basic Usage:

```jsx
import React, { memo } from "react";

function MyComponent({ name, age }) {
  console.log("MyComponent rendered");
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}

// Without memo - re-renders on every parent render
// export default MyComponent;

// With memo - only re-renders when props change
export default memo(MyComponent);
```

### Example with Button Component:

```jsx
import React from "react";

function Button({ onClick, children }) {
  console.log(`rendering ${children}`);
  return (
    <div>
      <button onClick={onClick}>{children}</button>
    </div>
  );
}

// Without memo - re-renders every time parent renders
// export default Button;

// With memo - only re-renders when onClick or children change
export default React.memo(Button);
```

### When React.memo Doesn't Work:

```jsx
// ❌ Problem: New object created on every render
<Memo user={{ name: "john", age: 20 }} />

// ✅ Solution: Use useMemo to maintain reference
const userData = useMemo(() => {
  return { name: "john", age: 20 }
}, [])

<Memo user={userData} />
```

---

## 3. useMemo: Memoizing Expensive Calculations

### What is useMemo?

`useMemo` is a hook that memoizes the result of expensive calculations, only recalculating when dependencies change.

### Basic Syntax:

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### Expensive Function Example:

```jsx
import React, { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState(0);

  // Expensive function that does heavy computation
  function Expensive(num) {
    console.log("inside expensive task");
    for (let i = 0; i < 1000000000; i++) {}
    console.log("outside expensive task");
    return num * 2;
  }

  // ❌ Without useMemo - recalculates on every render
  // let double = Expensive(input);

  // ✅ With useMemo - only recalculates when input changes
  let double = useMemo(() => {
    return Expensive(input);
  }, [input]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Render</button>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <h1>Answer of doubling is: {double}</h1>
    </div>
  );
}
```

### Object Memoization:

```jsx
import React, { useState, useMemo } from "react";
import Memo from "./components/Memo";

function App() {
  const [count, setCount] = useState(0);

  // ❌ Problem: New object reference on every render
  // const user = { name: "john", age: 20 }

  // ✅ Solution: Memoized object with stable reference
  const userData = useMemo(() => {
    return { name: "john", age: 20 };
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      {/* This component will only re-render when userData actually changes */}
      <Memo user={userData} />
    </div>
  );
}
```

---

## 4. useCallback: Memoizing Functions

### What is useCallback?

`useCallback` is a hook that memoizes functions, preventing them from being recreated on every render.

### Basic Syntax:

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### Function Memoization Example:

```jsx
import React from "react";
import Button from "./components/Button";
import { useState, useCallback } from "react";

function App() {
  const [count, setCount] = useState(0);

  // ❌ Without useCallback - function recreated on every render
  // const Increment = () => {
  //   setCount(count + 1)
  // }

  // ✅ With useCallback - function only recreated when dependencies change
  const Increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const Decrement = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <Button onClick={Increment}>Increment</Button>
      <Button onClick={Decrement}>Decrement</Button>
    </div>
  );
}
```

### Optimized Version with Functional Updates:

```jsx
import React from "react";
import Button from "./components/Button";
import { useState, useCallback } from "react";

function App() {
  const [count, setCount] = useState(0);

  // ✅ Even better: Use functional updates to avoid count dependency
  const Increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // Empty dependency array - function never changes

  const Decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []); // Empty dependency array - function never changes

  return (
    <div>
      <h1>Count: {count}</h1>
      <Button onClick={Increment}>Increment</Button>
      <Button onClick={Decrement}>Decrement</Button>
    </div>
  );
}
```

---

## 5. When to Use Each Optimization

### React.memo:

- **Use when**: Component receives props that don't change frequently
- **Don't use when**: Component always receives new props or props change frequently
- **Best for**: Pure components that render the same output for the same props

```jsx
// ✅ Good use case
const UserProfile = memo(({ user }) => {
  return <div>{user.name}</div>;
});

// ❌ Bad use case - props change on every render
const UserProfile = memo(({ user }) => {
  return <div>{user.name}</div>;
});
// Parent: <UserProfile user={{ name: "John" }} /> // New object every time
```

### useMemo:

- **Use when**: Expensive calculations or object creation
- **Don't use when**: Simple calculations or primitive values
- **Best for**: Heavy computations, object/array creation, API data processing

```jsx
// ✅ Good use case - expensive calculation
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ❌ Bad use case - simple calculation
const simpleValue = useMemo(() => {
  return a + b;
}, [a, b]); // Just use: const simpleValue = a + b
```

### useCallback:

- **Use when**: Passing functions as props to memoized components
- **Don't use when**: Functions are simple or components aren't memoized
- **Best for**: Event handlers, callbacks passed to child components

```jsx
// ✅ Good use case - function passed to memoized component
const handleClick = useCallback(() => {
  setCount((prev) => prev + 1);
}, []);

// ❌ Bad use case - simple function, no memoized children
const handleClick = useCallback(() => {
  console.log("clicked");
}, []); // Just use: const handleClick = () => console.log('clicked')
```

---

## 6. Performance Comparison

### Before Optimization:

```jsx
function App() {
  const [count, setCount] = useState(0);

  // Recreated on every render
  const user = { name: "john", age: 20 };
  const handleClick = () => setCount(count + 1);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increment</button>
      <UserProfile user={user} />
    </div>
  );
}
```

**Problems:**

- `user` object recreated on every render
- `handleClick` function recreated on every render
- `UserProfile` re-renders even when props haven't changed

### After Optimization:

```jsx
function App() {
  const [count, setCount] = useState(0);

  // Memoized values
  const user = useMemo(() => ({ name: "john", age: 20 }), []);
  const handleClick = useCallback(() => setCount((prev) => prev + 1), []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increment</button>
      <UserProfile user={user} />
    </div>
  );
}

// Memoized component
const UserProfile = memo(({ user }) => {
  return <div>{user.name}</div>;
});
```

**Benefits:**

- `user` object reference stays the same
- `handleClick` function reference stays the same
- `UserProfile` only re-renders when `user` actually changes

---

## 7. Common Patterns and Best Practices

### Pattern 1: Memoized Child Components

```jsx
// Parent component
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const userData = useMemo(
    () => ({
      name: "John",
      age: 30,
    }),
    []
  );

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increment</button>
      <ChildComponent user={userData} onAction={handleClick} />
    </div>
  );
}

// Memoized child component
const ChildComponent = memo(({ user, onAction }) => {
  console.log("ChildComponent rendered");
  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
});
```

### Pattern 2: Expensive Calculations

```jsx
function DataProcessor({ data }) {
  const processedData = useMemo(() => {
    console.log("Processing data...");
    return data.map((item) => ({
      ...item,
      processed: item.value * 2,
      timestamp: new Date().toISOString(),
    }));
  }, [data]);

  return (
    <div>
      {processedData.map((item) => (
        <div key={item.id}>
          {item.name}: {item.processed}
        </div>
      ))}
    </div>
  );
}
```

### Pattern 3: API Call Optimization

```jsx
function UserList({ userIds }) {
  const [users, setUsers] = useState([]);

  // Memoized API call function
  const fetchUsers = useCallback(async () => {
    const userPromises = userIds.map((id) =>
      fetch(`/api/users/${id}`).then((res) => res.json())
    );
    const userData = await Promise.all(userPromises);
    setUsers(userData);
  }, [userIds]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

---

## 8. Debugging and Monitoring

### Console Logging for Debugging:

```jsx
function MyComponent({ data }) {
  console.log("MyComponent rendered with:", data);

  const processedData = useMemo(() => {
    console.log("Processing data...");
    return expensiveCalculation(data);
  }, [data]);

  return <div>{processedData}</div>;
}
```

### React DevTools Profiler:

1. **Install React DevTools** browser extension
2. **Use Profiler** to record renders
3. **Analyze** which components re-render and why
4. **Optimize** based on profiler data

### Performance Monitoring:

```jsx
import { useEffect, useRef } from "react";

function PerformanceMonitor({ children }) {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`Component rendered ${renderCount.current} times`);
  });

  return children;
}
```

---

## 9. Common Mistakes

### Mistake 1: Over-optimization

```jsx
// ❌ Unnecessary optimization
const simpleValue = useMemo(() => a + b, [a, b]);

// ✅ Just use regular calculation
const simpleValue = a + b;
```

### Mistake 2: Missing Dependencies

```jsx
// ❌ Missing dependency
const handleClick = useCallback(() => {
  setCount(count + 1);
}, []); // Missing count dependency

// ✅ Correct with dependency
const handleClick = useCallback(() => {
  setCount(count + 1);
}, [count]);

// ✅ Better: Use functional update
const handleClick = useCallback(() => {
  setCount((prev) => prev + 1);
}, []);
```

### Mistake 3: Memoizing Everything

```jsx
// ❌ Memoizing simple components
const SimpleText = memo(({ text }) => <p>{text}</p>);

// ✅ Only memoize when needed
const SimpleText = ({ text }) => <p>{text}</p>;
```

### Mistake 4: Ignoring Reference Equality

```jsx
// ❌ New object on every render
<ChildComponent data={{ name: "John" }} />;

// ✅ Memoized object
const data = useMemo(() => ({ name: "John" }), []);
<ChildComponent data={data} />;
```

---

## 10. Performance Testing

### Testing Memoization:

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("Button component should not re-render unnecessarily", () => {
  const consoleSpy = jest.spyOn(console, "log");

  render(<App />);

  // Initial render
  expect(consoleSpy).toHaveBeenCalledWith("rendering Increment");
  expect(consoleSpy).toHaveBeenCalledWith("rendering Decrement");

  // Clear console calls
  consoleSpy.mockClear();

  // Click button
  fireEvent.click(screen.getByText("Increment"));

  // Should not re-render Button components if properly memoized
  expect(consoleSpy).not.toHaveBeenCalledWith("rendering Increment");
  expect(consoleSpy).not.toHaveBeenCalledWith("rendering Decrement");
});
```

### Testing useMemo:

```jsx
test("Expensive calculation should be memoized", () => {
  const consoleSpy = jest.spyOn(console, "log");

  render(<App />);

  // Initial calculation
  expect(consoleSpy).toHaveBeenCalledWith("inside expensive task");

  // Clear console calls
  consoleSpy.mockClear();

  // Trigger re-render without changing input
  fireEvent.click(screen.getByText("Render"));

  // Should not recalculate if properly memoized
  expect(consoleSpy).not.toHaveBeenCalledWith("inside expensive task");
});
```

---

## 11. Key Takeaways

- **React.memo** prevents unnecessary re-renders of components when props haven't changed
- **useMemo** memoizes expensive calculations and object creation
- **useCallback** memoizes functions to prevent recreation on every render
- **Use optimization only when needed** - premature optimization can hurt performance
- **Monitor performance** with React DevTools and console logging
- **Test optimization** to ensure it's working as expected
- **Consider the trade-offs** between optimization and code complexity

---

## 12. Interview Questions

1. What is React.memo and when should you use it?
2. What's the difference between useMemo and useCallback?
3. How do you prevent unnecessary re-renders in React?
4. When should you avoid using React.memo?
5. How do you debug performance issues in React?
6. What are the trade-offs of using memoization?
7. How do you test if memoization is working correctly?
8. What's the difference between shallow and deep comparison in React.memo?

---

## 13. Practical Example (from App.jsx)

```jsx
import React, { useState, useCallback, useMemo } from "react";
import Button from "./components/Button";
import Memo from "./components/Memo";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState(0);
  const [theme, setTheme] = useState("light");

  // Expensive calculation function
  function Expensive(num) {
    console.log("inside expensive task");
    for (let i = 0; i < 1000000000; i++) {}
    console.log("outside expensive task");
    return num * 2;
  }

  // ✅ With useMemo - only recalculates when input changes
  let double = useMemo(() => {
    return Expensive(input);
  }, [input]);

  // ✅ With useCallback - functions only recreated when dependencies change
  const Increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const Decrement = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  // ✅ Even better: Use functional updates to avoid count dependency
  const IncrementOptimized = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // Empty dependency array - function never changes

  const DecrementOptimized = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []); // Empty dependency array - function never changes

  // Memoized object for React.memo demonstration
  const userData = useMemo(() => {
    return { name: "john", age: 20 };
  }, []);

  // Memoized theme object
  const themeData = useMemo(() => {
    return {
      theme,
      backgroundColor: theme === "dark" ? "#333" : "#fff",
      color: theme === "dark" ? "#fff" : "#333",
    };
  }, [theme]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>React Performance Optimization Demo</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Count: {count}</h2>
        <p>This demonstrates useCallback optimization</p>

        <div style={{ marginBottom: "10px" }}>
          <Button onClick={Increment}>Increment (with count dependency)</Button>
          <Button onClick={Decrement}>Decrement (with count dependency)</Button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <Button onClick={IncrementOptimized}>
            Increment Optimized (no dependency)
          </Button>
          <Button onClick={DecrementOptimized}>
            Decrement Optimized (no dependency)
          </Button>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>useMemo Demo - Expensive Calculation</h2>
        <p>This demonstrates useMemo optimization for expensive calculations</p>

        <input
          type="number"
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
          placeholder="Enter a number"
          style={{ padding: "5px", marginRight: "10px" }}
        />

        <button onClick={() => setCount(count + 1)} style={{ padding: "5px" }}>
          Trigger Re-render (should not recalculate expensive task)
        </button>

        <h3>Result: {double}</h3>
        <p>Check console to see if expensive calculation runs</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>React.memo Demo</h2>
        <p>This demonstrates React.memo optimization</p>

        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          style={{ padding: "5px", marginBottom: "10px" }}
        >
          Toggle Theme (should not re-render Memo component)
        </button>

        <Memo user={userData} />
        <Memo user={themeData} />
      </div>

      <div
        style={{
          backgroundColor: themeData.backgroundColor,
          color: themeData.color,
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <h3>Theme: {theme}</h3>
        <p>
          This section changes with theme, but Memo components should not
          re-render
        </p>
      </div>

      <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        <h3>Performance Tips:</h3>
        <ul>
          <li>Check console to see which components re-render</li>
          <li>
            Notice that Button components with optimized callbacks don't
            re-render
          </li>
          <li>Expensive calculation only runs when input changes</li>
          <li>
            Memo components only re-render when their props actually change
          </li>
        </ul>
      </div>
    </div>
  );
}
```

This comprehensive example demonstrates:

### **1. useCallback Optimization:**

- **Regular useCallback**: Functions with count dependency that still recreate when count changes
- **Optimized useCallback**: Functions with functional updates (no dependencies) that never change
- **Console logging**: Shows which buttons re-render and when

### **2. useMemo for Expensive Calculations:**

- **Expensive function**: Simulates heavy computation with billion-iteration loop
- **Memoized result**: Only recalculates when input value changes
- **Performance monitoring**: Console logs show when expensive calculation runs

### **3. useMemo for Object Creation:**

- **Stable references**: Objects maintain same reference between renders
- **React.memo compatibility**: Memoized objects work perfectly with React.memo

### **4. React.memo Demonstration:**

- **Memoized components**: Only re-render when props actually change
- **Theme changes**: Don't trigger re-renders of memoized components
- **Visual feedback**: Styled components with clear performance indicators

### **5. Interactive Performance Demo:**

- **Multiple sections**: Each optimization technique has its own demo area
- **Real-time feedback**: Console logs and visual indicators
- **Educational UI**: Clear explanations and performance tips

The key benefits are:

- **Comprehensive Coverage**: All three optimization techniques in one demo
- **Interactive Learning**: Real-time performance monitoring
- **Visual Feedback**: Styled components with clear performance indicators
- **Educational Value**: Console logging and performance tips
- **Practical Examples**: Real-world scenarios for each optimization technique
