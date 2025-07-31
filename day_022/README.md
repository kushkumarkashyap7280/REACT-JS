# Day 022 - React useReducer Hook: Advanced State Management

## Understanding useReducer Hook

The `useReducer` hook is an alternative to `useState` for managing complex state logic in React components. It follows the reducer pattern, similar to Redux, and is particularly useful when you have complex state transitions or when the next state depends on the previous one.

---

## 1. What is useReducer?

`useReducer` is a React hook that manages state using a reducer function. It's based on the reducer pattern from functional programming and is particularly useful for managing complex state logic.

### Key Concepts:

- **Reducer**: A pure function that takes the current state and an action, then returns the new state
- **Dispatch**: A function that sends actions to the reducer
- **Action**: An object that describes what happened (typically with a `type` and optional `payload`)
- **State**: The current state of the component

### Basic Syntax:

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

---

## 2. useReducer vs useState

### When to Use useState:

- **Simple State**: Single values or simple objects
- **Independent Updates**: State updates don't depend on previous state
- **Local Component State**: State that doesn't need to be shared

### When to Use useReducer:

- **Complex State Logic**: When state logic involves multiple sub-values
- **State Dependencies**: When the next state depends on the previous one
- **Predictable State Transitions**: When you want to make state changes more predictable
- **Testing**: Easier to test reducer functions in isolation

### Comparison:

| Aspect             | useState                   | useReducer                 |
| ------------------ | -------------------------- | -------------------------- |
| **Complexity**     | ✅ Simple state management | ✅ Complex state logic     |
| **Predictability** | ❌ Can be unpredictable    | ✅ Predictable transitions |
| **Testing**        | ❌ Harder to test          | ✅ Easy to test            |
| **Boilerplate**    | ✅ Minimal                 | ❌ More boilerplate        |
| **Performance**    | ✅ Good for simple cases   | ✅ Good for complex cases  |

---

## 3. Basic useReducer Example

### Simple Counter with useReducer:

```jsx
import React, { useReducer } from "react";

function App() {
  const reducer = (state, action) => {
    switch (action) {
      case "increment":
        return state + 1;
      case "decrement":
        return state - 1;
      case "reset":
        return 0;
      default:
        return state;
    }
  };

  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch("increment")}>Increment</button>
      <button onClick={() => dispatch("decrement")}>Decrement</button>
      <button onClick={() => dispatch("reset")}>Reset</button>
    </div>
  );
}
```

### Same Counter with useState (for comparison):

```jsx
import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

---

## 4. useReducer with Objects and Payload

### Managing Object State:

```jsx
import React, { useReducer } from "react";

function App() {
  const reducer = (state, action) => {
    console.log(action.type); // action has type and payload
    switch (action.type) {
      case "setName":
        return { ...state, name: action.payload };
      case "setAge":
        return { ...state, age: action.payload };
      default:
        return state;
    }
  };

  const initialState = {
    name: "",
    age: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={state.name}
        onChange={(e) => dispatch({ type: "setName", payload: e.target.value })}
      />
      <input
        type="text"
        placeholder="Age"
        value={state.age}
        onChange={(e) => dispatch({ type: "setAge", payload: e.target.value })}
      />
      <h1>Name: {state.name}</h1>
      <h1>Age: {state.age}</h1>
    </div>
  );
}
```

### Action Structure:

```jsx
// Action with type only
dispatch("increment");

// Action with type and payload
dispatch({ type: "setName", payload: "John" });

// Action with multiple properties
dispatch({
  type: "updateUser",
  payload: { name: "John", age: 25 },
});
```

---

## 5. useReducer with Arrays

### Todo List Example:

```jsx
import React, { useReducer, useRef } from "react";

function App() {
  const user = useRef(null);
  const initialState = [];

  const reducer = (state, action) => {
    switch (action.type) {
      case "add": {
        user.current.value = "";
        return [...state, action.payload];
      }
      case "remove":
        return state.filter((item, index) => index !== action.payload);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <input type="text" placeholder="Name" ref={user} />
      <button
        onClick={() => {
          dispatch({ type: "add", payload: { name: user.current.value } });
        }}
      >
        Add
      </button>
      <ul>
        {state.map((item, index) => (
          <li key={index}>
            {item.name}
            <button
              onClick={() => dispatch({ type: "remove", payload: index })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 6. Reducer Function Best Practices

### 1. Pure Function

```jsx
// ✅ Good - Pure function
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    default:
      return state;
  }
};

// ❌ Bad - Side effects in reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      console.log("Incrementing"); // Side effect
      return state + 1;
    default:
      return state;
  }
};
```

### 2. Immutable Updates

```jsx
// ✅ Good - Immutable update
const reducer = (state, action) => {
  switch (action.type) {
    case "updateUser":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// ❌ Bad - Mutable update
const reducer = (state, action) => {
  switch (action.type) {
    case "updateUser":
      state.user = action.payload; // Mutation
      return state;
    default:
      return state;
  }
};
```

### 3. Action Type Constants

```jsx
// ✅ Good - Action type constants
const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  RESET: "reset",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return state + 1;
    case ACTIONS.DECREMENT:
      return state - 1;
    case ACTIONS.RESET:
      return 0;
    default:
      return state;
  }
};
```

---

## 7. Common Patterns

### Pattern 1: Form Management

```jsx
const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET_FORM":
      return action.initialState;
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

function Form() {
  const initialState = { name: "", email: "", errors: {} };
  const [form, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const handleSubmit = () => {
    // Validation logic
    if (!form.name) {
      dispatch({
        type: "SET_ERRORS",
        errors: { name: "Name is required" },
      });
      return;
    }
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      {form.errors.name && <span>{form.errors.name}</span>}
    </form>
  );
}
```

### Pattern 2: Shopping Cart

```jsx
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
};
```

### Pattern 3: Authentication State

```jsx
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        isAuthenticated: true,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
```

---

## 8. Performance Considerations

### 1. Memoizing Reducer Functions

```jsx
// ✅ Good - Memoized reducer
const reducer = useCallback((state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    default:
      return state;
  }
}, []);

const [state, dispatch] = useReducer(reducer, 0);
```

### 2. Avoiding Unnecessary Re-renders

```jsx
// ✅ Good - Stable dispatch function
const [state, dispatch] = useReducer(reducer, initialState);

// dispatch is stable and won't cause re-renders
useEffect(() => {
  // This effect won't run unnecessarily
}, [dispatch]);
```

### 3. Using React.memo with useReducer

```jsx
const ExpensiveComponent = React.memo(function ExpensiveComponent({
  state,
  dispatch,
}) {
  return (
    <div>
      <button onClick={() => dispatch({ type: "increment" })}>
        Count: {state.count}
      </button>
    </div>
  );
});
```

---

## 9. Testing useReducer

### Testing Reducer Functions:

```jsx
// reducer.js
export const counterReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
};

// reducer.test.js
import { counterReducer } from "./reducer";

describe("counterReducer", () => {
  test("should increment state", () => {
    const initialState = 0;
    const action = { type: "increment" };
    const newState = counterReducer(initialState, action);
    expect(newState).toBe(1);
  });

  test("should decrement state", () => {
    const initialState = 1;
    const action = { type: "decrement" };
    const newState = counterReducer(initialState, action);
    expect(newState).toBe(0);
  });

  test("should reset state", () => {
    const initialState = 5;
    const action = { type: "reset" };
    const newState = counterReducer(initialState, action);
    expect(newState).toBe(0);
  });
});
```

### Testing Components with useReducer:

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("should increment counter", () => {
  render(<App />);

  const incrementButton = screen.getByText("Increment");
  const countDisplay = screen.getByText(/Count:/);

  fireEvent.click(incrementButton);

  expect(countDisplay).toHaveTextContent("Count: 1");
});
```

---

## 10. Common Mistakes

### Mistake 1: Mutating State in Reducer

```jsx
// ❌ Wrong - Mutating state
const reducer = (state, action) => {
  switch (action.type) {
    case "updateUser":
      state.user = action.payload; // Mutation!
      return state;
    default:
      return state;
  }
};

// ✅ Correct - Immutable update
const reducer = (state, action) => {
  switch (action.type) {
    case "updateUser":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
```

### Mistake 2: Side Effects in Reducer

```jsx
// ❌ Wrong - Side effects in reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      console.log("Incrementing"); // Side effect
      localStorage.setItem("count", state + 1); // Side effect
      return state + 1;
    default:
      return state;
  }
};

// ✅ Correct - Pure reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    default:
      return state;
  }
};

// Handle side effects in useEffect
useEffect(() => {
  localStorage.setItem("count", state);
}, [state]);
```

### Mistake 3: Not Handling Default Case

```jsx
// ❌ Wrong - No default case
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    // Missing default case!
  }
};

// ✅ Correct - With default case
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};
```

---

## 11. useReducer vs Redux

### When to Use useReducer:

- **Local State Management**: Complex state within a component
- **Simple Applications**: Small to medium-sized apps
- **Learning**: Understanding reducer pattern
- **No External Dependencies**: Built into React

### When to Use Redux:

- **Global State Management**: State shared across components
- **Large Applications**: Complex state management needs
- **Developer Tools**: Need for debugging and time-travel
- **Middleware**: Need for side effects, logging, etc.
- **Team Development**: Standardized patterns for large teams

### Comparison:

| Feature             | useReducer    | Redux         |
| ------------------- | ------------- | ------------- |
| **Bundle Size**     | ✅ Built-in   | ❌ Additional |
| **Learning Curve**  | ✅ Simple     | ❌ Complex    |
| **Global State**    | ❌ Local only | ✅ Global     |
| **Developer Tools** | ❌ Limited    | ✅ Excellent  |
| **Middleware**      | ❌ No         | ✅ Yes        |
| **Boilerplate**     | ✅ Minimal    | ❌ Verbose    |

---

## 12. Key Takeaways

- **useReducer** is perfect for complex state logic and predictable state transitions
- **Reducer functions** should be pure and handle immutable updates
- **Dispatch function** is stable and won't cause unnecessary re-renders
- **Action objects** should have a `type` and optional `payload`
- **Testing** reducer functions is straightforward and effective
- **Performance** is good when used correctly with proper patterns
- **Patterns** like form management, shopping carts, and authentication work well with useReducer

---

## 13. Interview Questions

1. What is useReducer and when should you use it instead of useState?
2. What's the difference between useReducer and Redux?
3. How do you structure a reducer function?
4. What are the best practices for using useReducer?
5. How do you test components that use useReducer?
6. What are the performance implications of useReducer?
7. How do you handle side effects with useReducer?
8. What are common patterns for using useReducer?

---

## 14. Practical Example (from App.jsx)

```jsx
import React, { useReducer, useRef } from "react";

function App() {
  const user = useRef(null);
  const initialState = [];

  const reducer = (state, action) => {
    switch (action.type) {
      case "add": {
        user.current.value = "";
        return [...state, action.payload];
      }
      case "remove":
        return state.filter((item, index) => index !== action.payload);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <input type="text" placeholder="Name" ref={user} />
      <button
        onClick={() => {
          dispatch({ type: "add", payload: { name: user.current.value } });
        }}
      >
        Add
      </button>
      <ul>
        {state.map((item, index) => (
          <li key={index}>
            {item.name}
            <button
              onClick={() => dispatch({ type: "remove", payload: index })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

This example demonstrates:

- **Array State Management**: Using useReducer to manage an array of items
- **Action Types**: Different actions for adding and removing items
- **Payload Usage**: Passing data through the action payload
- **Immutable Updates**: Creating new arrays instead of mutating existing ones
- **useRef Integration**: Using useRef to access input value
- **Clean State Transitions**: Predictable state changes through the reducer pattern

The key benefits are:

- **Predictable State Changes**: All state transitions go through the reducer
- **Easy Testing**: Reducer function can be tested in isolation
- **Complex Logic**: Easy to add validation, filtering, or other logic
- **Performance**: Stable dispatch function prevents unnecessary re-renders
