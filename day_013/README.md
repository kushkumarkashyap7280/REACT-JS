# Day 013 - Event Handling in React

## Understanding Event Handling in React

Event handling in React allows you to respond to user interactions like clicks, hovers, form submissions, and more. React uses synthetic events, which are wrappers around the native DOM events, providing a consistent API across different browsers.

---

## 1. Basic Event Handling

You can handle events by passing a function to the event prop (e.g., `onClick`, `onMouseEnter`).

### Example: Basic Event Handling (from App.jsx)

```jsx
const handleButtonClick = (e) => {
  console.log(e);
  alert("button clicked");
};

<button onClick={handleButtonClick}>click me</button>;
```

---

## 2. Synthetic Events

React's synthetic events provide a consistent interface across browsers. The event object contains information about the event, such as the target element, event type, and coordinates.

### Example: Synthetic Event (from App.jsx)

```jsx
const handleButtonClick = (e) => {
  console.log(e);
  // Output: SyntheticBaseEvent with properties like type, target, clientX, clientY, etc.
};
```

---

## 3. Inline Event Handlers

You can define event handlers inline using arrow functions, especially useful for passing arguments.

### Example: Inline Event Handler (from App.jsx)

```jsx
<button onDoubleClick={() => alert("you clicked second button")}>
  button 2
</button>;

const welcomeUser = (name) => {
  alert(`welcome ${name} this is with arrow function`);
};

<button onClick={() => welcomeUser("hello")}>welcome user</button>;
```

---

## 4. Passing Event Handlers as Props

You can pass event handlers to child components as props, enabling component communication.

### Example: Passing Event Handlers (from App.jsx and Child.jsx)

```jsx
// App.jsx
const onHover = () => {
  alert(
    "you hovered on child component having event handler as props the button"
  );
};

<Child onMouseEnter={onHover} onClick={() => welcomeUser("vinay")} />;

// Child.jsx
function Child({ onClick, onMouseEnter }) {
  return (
    <div>
      <h1>Child component</h1>
      <button onClick={onClick}>click me</button>
      <button onMouseEnter={onMouseEnter}>mouse enter</button>
    </div>
  );
}
```

---

## 5. Event Propagation

Events in React follow the same bubbling and capturing phases as native DOM events.

### Example: Event Propagation (from App.jsx)

```jsx
// Event bubbling
<div onClick={() => alert("you clicked on parent")}>
  <button onClick={() => alert("you clicked on child")}>event propagation</button>
</div>

// Stopping event propagation
<div onClick={() => alert("you clicked on parent")}>
  <button onClick={(e) => { e.stopPropagation(); alert("you clicked on child"); }}>
    event propagation
  </button>
</div>

// Event capturing
<div onClickCapture={() => alert("you clicked on parent")}>
  <button onClick={(e) => { alert("you clicked on child"); }}>event propagation</button>
</div>
```

---

## Best Practices

1. Use descriptive names for event handler functions
2. Pass event handlers as props for component communication
3. Use arrow functions for inline handlers when passing arguments
4. Be mindful of event propagation and use `stopPropagation()` when needed
5. Avoid creating new functions in render for performance

---

## Key Takeaways

- React uses synthetic events for consistent cross-browser event handling
- Event handlers can be passed as props to child components
- Use arrow functions for inline handlers, especially when passing arguments
- Events bubble up the DOM tree by default; use `stopPropagation()` to prevent this
- Event capturing allows you to handle events during the capture phase

---

## Interview Questions

1. What are synthetic events in React?
2. How do you handle events in React components?
3. How can you pass event handlers to child components?
4. What is event propagation and how do you control it?
5. What is the difference between event bubbling and event capturing?

---

## Practical Example (from App.jsx and Child.jsx)

```jsx
// App.jsx
const handleButtonClick = (e) => {
  console.log(e);
  alert("button clicked");
};

const onHover = () => {
  alert("you hovered on child component");
};

<button onClick={handleButtonClick}>click me</button>
<Child onMouseEnter={onHover} onClick={() => welcomeUser("vinay")} />

// Child.jsx
function Child({ onClick, onMouseEnter }) {
  return (
    <div>
      <h1>Child component</h1>
      <button onClick={onClick}>click me</button>
      <button onMouseEnter={onMouseEnter}>mouse enter</button>
    </div>
  );
}
```
