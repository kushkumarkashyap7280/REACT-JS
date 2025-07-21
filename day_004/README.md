# 📘 React Rules & Best Practices Demonstrated in This App

This example demonstrates several important React rules and best practices for beginners. Read below to understand each one!

---

## 1️⃣ Every Component Must Return a Single Parent Element

- In React, each component must return only one parent element. This is because a function can only return a single value.
- Example:

  ```jsx
  // ✅ Correct
  return (
    <div>
      <h1>Hello</h1>
      <p>Welcome!</p>
    </div>
  )

  // ❌ Incorrect (will cause an error)
  return (
    <h1>Hello</h1>
    <p>Welcome!</p>
  )
  ```

---

## 2️⃣ Using React Fragments (`<> </>`) as Parent

- Sometimes, you don't want to add an extra HTML tag as a parent (like a `<div>`), but you still need a single parent.
- In these cases, you can use a **React Fragment**: `<> ... </>`
- Example:
  ```jsx
  // ✅ Using a Fragment as parent
  return (
    <>
      <h1>Hello</h1>
      <p>Welcome!</p>
    </>
  );
  ```
- This works the same as using a `<div>`, but does not add an extra element to the DOM.

---

## 3️⃣ Component Naming Convention

- Always start your component file and function names with a **capital letter**.
- Example:
  ```jsx
  function CustomUL() { ... }
  export default CustomUL;
  ```

## 4️⃣ Using Components as Children

- To use a component inside another, use the syntax:
  ```jsx
  <CustomUL />
  // or
  <CustomUL></CustomUL>
  ```
- You cannot use it like an HTML tag (e.g., `<customul>`), it must be capitalized.

---

## 5️⃣ Use `className` Instead of `class`

- In JSX, use `className` instead of `class` for CSS classes:
  ```jsx
  <div className="container">Hello</div>
  ```

---

## 6️⃣ Comments in JSX

- Use curly braces for comments inside JSX:
  ```jsx
  {
    /* This is a comment in JSX */
  }
  ```

---

## 7️⃣ Reusability with Custom Components (DRY Principle)

- You can create a custom component (like `CustomUL`) and use it multiple times to avoid repeating code.
- Example:
  ```jsx
  <CustomUL />
  <CustomUL />
  <CustomUL />
  ```
- This follows the **DRY (Don't Repeat Yourself)** principle.

---

## 8️⃣ Example from This App

- The `App` component demonstrates all these rules:
  - Returns a single parent `<div>` or uses a Fragment
  - Uses `<CustomUL />` multiple times
  - Comments are written in JSX style
  - Explains the use of `className`

---

## 📂 Explore the Code

- See `src/App.jsx` for the main app logic and rules
- See `src/components/CustomUL.jsx` for the reusable list component

---

Happy React Learning! 🚀
