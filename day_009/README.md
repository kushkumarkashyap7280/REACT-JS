# Day 009 - Conditional Rendering in React

## What is Conditional Rendering?

Conditional rendering in React refers to the ability to render different UI elements or components based on certain conditions. It allows you to dynamically decide what to display to the user, making your application interactive and responsive to data or user actions.

### Why is Conditional Rendering Important?

- It enables dynamic UIs that respond to user input or application state
- Helps in showing/hiding elements, error messages, loading spinners, etc.
- Essential for building real-world, interactive applications

## How Does Conditional Rendering Work?

React uses JavaScript expressions to determine what to render. You can use:

- **Ternary operators**
- **Logical && (AND) operators**
- **if/else statements (outside JSX)**
- **Switch statements**

### Example: Ternary Operator (from App.jsx)

```jsx
function App() {
  const age = 18;
  return (
    <div>
      <h1>Your age is: {age}</h1>
      <h2>You can vote {age >= 18 ? "yes" : "no"}</h2>
      {/* This is called conditional rendering: we decide what to render based on a condition */}
    </div>
  );
}
```

### Example: Logical AND (&&) Operator

```jsx
function UserGreeting({ isLoggedIn }) {
  return <div>{isLoggedIn && <h2>Welcome back!</h2>}</div>;
}
```

### Example: if/else Statement (Outside JSX)

```jsx
function StatusMessage({ status }) {
  let message;
  if (status === "loading") {
    message = <p>Loading...</p>;
  } else if (status === "error") {
    message = <p>Error occurred!</p>;
  } else {
    message = <p>Data loaded.</p>;
  }
  return <div>{message}</div>;
}
```

## Best Practices

1. Keep conditions simple and readable
2. Use ternary operators for short, simple conditions
3. Use if/else or switch for more complex logic (outside JSX)
4. Avoid deeply nested ternaries (can hurt readability)
5. Extract conditional logic into functions or components if it gets complex

## Common Use Cases

- Showing/hiding elements (modals, tooltips, menus)
- Displaying loading spinners or error messages
- Rendering different components based on user roles or permissions
- Handling authentication (show login/logout)

## Key Takeaways

1. **Dynamic UIs**: Conditional rendering is essential for interactive apps
2. **Multiple Approaches**: Use ternary, &&, if/else, or switch as needed
3. **Readability Matters**: Keep your conditions clear and maintainable
4. **Componentization**: Extract complex conditions into separate components

## Exercise Suggestions

1. Show a different message if a user is under 13, between 13-17, or 18+
2. Render a list only if it has items, otherwise show "No data"
3. Display a loading spinner while fetching data
4. Show different buttons based on user authentication status

## Interview Questions

1. What is conditional rendering in React?
2. How do you render different components based on a condition?
3. What are the different ways to implement conditional rendering in React?
4. When would you use a ternary operator vs. if/else for rendering?
5. How can you avoid deeply nested conditional logic in JSX?
