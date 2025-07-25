# Day 010 - Import and Export Patterns in React

## Understanding Import and Export in React

React projects often consist of multiple components split across different files. To use these components together, you need to understand how to export them from one file and import them into another. There are two main types of exports in JavaScript modules: **default export** and **named export**.

---

## 1. Default Export

A file can have only one default export. You can import it with any name you like.

### Example: Default Export (from Child.jsx)

```jsx
// Child.jsx
export default function Child() {
  return (
    <div>
      <h1>I am default child</h1>
    </div>
  );
}
```

**Importing a Default Export:**

```jsx
// App.jsx
import Child from "./components/Child"; // You can use any name for the import
```

---

## 2. Named Export

A file can have multiple named exports. You must import them using the exact exported name, wrapped in curly braces.

### Example: Named Export (from Child.jsx)

```jsx
function Child1() {
  return (
    <div>
      <h1>I am child 1</h1>
    </div>
  );
}

function Child2() {
  return (
    <div>
      <h1>I am child 2</h1>
    </div>
  );
}

export { Child1, Child2 };
```

**Importing Named Exports:**

```jsx
// App.jsx
import { Child1, Child2 } from "./components/Child";
```

---

## 3. Mixing Default and Named Exports

You can have both a default export and named exports in the same file. Import the default export without curly braces, and named exports with curly braces.

```jsx
// Child.jsx
export default function Child() {
  /* ... */
}
export { Child1, Child2 };
```

```jsx
// App.jsx
import Child, { Child1, Child2 } from "./components/Child";
```

---

## 4. Best Practices

1. Use default export for the main component of a file
2. Use named exports for additional components or utilities
3. Keep file exports clear and consistent
4. Avoid having multiple default exports in a single file
5. Use meaningful names for components and imports

---

## 5. Key Takeaways

- **Default export:** Only one per file, import with any name
- **Named export:** Multiple per file, import with exact names in curly braces
- You can mix default and named exports in the same file
- Proper import/export structure keeps your code modular and maintainable

---

## 6. Interview Questions

1. What is the difference between default and named exports in JavaScript modules?
2. How do you import a default export vs. a named export?
3. Can you have multiple default exports in a file?
4. How would you import both the default and named exports from the same file?
5. Why is it important to structure your exports and imports clearly in a React project?

---

## 7. Practical Example (from App.jsx)

```jsx
import Child from "./components/Child"; // Default export
import { Child1, Child2 } from "./components/Child"; // Named exports

function App() {
  return (
    <div>
      <Child />
      <Child1 />
      <Child2 />
    </div>
  );
}
```
