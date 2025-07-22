# Day 005 - React Interview Questions & Practical Implementation

### What We Learned Today - Practical React Implementation

1. **Setting up React without Create React App**

   - We learned how to use React directly in an HTML file using:

   ```html
   <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
   <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
   <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
   ```

   - Using `type="text/babel"` for JSX transformation

2. **Component Structure in React**

   - Created three main components: `Navbar`, `Main`, and `Footer`
   - Each component is a function that returns JSX
   - Components start with capital letters (React convention)
   - Used arrow function syntax for component definition

   ```jsx
   const Navbar = () => {
     return (
       // JSX here
     );
   };
   ```

3. **React Root and Rendering**

   - Created root using `ReactDOM.createRoot()`
   - Used React Fragment (`<>...</>`) to wrap multiple components

   ```jsx
   root.render(
     <>
       <Navbar />
       <Main />
       <Footer />
     </>
   );
   ```

4. **Styling in React**

   - External CSS file linked traditionally
   - CSS Flexbox for layout management:
     ```css
     main {
       display: flex;
       flex-direction: column;
       align-items: center;
     }
     ```
   - Component-specific styling (navbar, main content, footer)
   - Responsive image handling with max-width and auto height

5. **Project Structure**
   - Single page application structure
   - Separation of concerns:
     - HTML for structure
     - JSX for components
     - CSS for styling
   - Components organized by functionality (navigation, main content, footer)

### React Interview Questions

1. Question: What is a React component and what's its most basic requirement?
   Answer: A React component is a JavaScript function that:

   - Returns UI elements using JSX
   - Must return a single parent element
   - Name must start with a capital letter

2. Question: What's wrong with this code and how would you fix it?

```jsx
function profile() {
    return (
        <div>Welcome</div>
        <p>User</p>
    )
}
```

Answer: Two issues:

- Component name should be capitalized (Profile)
- Multiple elements need a single parent wrapper
  Correct version:

```jsx
function Profile() {
  return (
    <div>
      <div>Welcome</div>
      <p>User</p>
    </div>
  );
}
```

3. Question: Which is correct and why?
   A. `<div class="container">`
   B. `<div className="container">`

   Answer: B is correct. In React JSX, we use `className` instead of `class` because `class` is a reserved keyword in JavaScript.

4. Question: What's a React Fragment and when should you use it?
   Answer: React Fragment (`<> </>`) is a way to group multiple elements without adding an extra DOM node. Use it when:

   - You don't want an extra div in the DOM
   - You need to return multiple elements
   - You want to keep the DOM structure cleaner

5. Question: Fix the syntax in this component:

```jsx
function todolist() {
  return;
  <ul>
    <li>Task 1</li>
    <li>Task 2</li>
  </ul>;
}
```

Answer: Issues to fix:

- Capitalize component name to `TodoList`
- Return statement should have parentheses to avoid automatic semicolon insertion

```jsx
function TodoList() {
  return (
    <ul>
      <li>Task 1</li>
      <li>Task 2</li>
    </ul>
  );
}
```
