# Day 021 - React Context API: Solving Prop Drilling

## Understanding Context API and Prop Drilling

The Context API is React's built-in solution for sharing data between components without prop drilling. It provides a way to pass data through the component tree without having to explicitly pass props down through every level.

---

## 1. What is Prop Drilling?

Prop drilling is a technique where you pass data from a parent component to a child component through multiple levels of nested components, even when some of those intermediate components don't need the data.

### Problems with Prop Drilling:

- **Verbose Code**: Props need to be passed through every intermediate component
- **Maintenance Issues**: Changes require updating multiple component signatures
- **Performance**: Unnecessary re-renders of intermediate components
- **Readability**: Code becomes harder to read and understand

### Example of Prop Drilling:

```jsx
// App.jsx - Parent component
function App() {
  const [userName, setUserName] = useState("John Doe");

  return (
    <div>
      <Header userName={userName} />
      <Main userName={userName} />
      <Footer userName={userName} />
    </div>
  );
}

// Header.jsx - Intermediate component (doesn't need userName)
function Header({ userName }) {
  return (
    <header>
      <Navigation userName={userName} /> {/* Passes through */}
    </header>
  );
}

// Navigation.jsx - Deep child component (actually needs userName)
function Navigation({ userName }) {
  return <nav>Welcome, {userName}!</nav>;
}
```

---

## 2. Introduction to Context API

The Context API provides a way to share data between components without explicitly passing props through every level.

### Key Concepts:

- **Context**: A way to share data between components
- **Provider**: Wraps components and provides the context value
- **Consumer**: Components that consume the context value
- **useContext Hook**: Modern way to consume context in functional components

---

## 3. Creating and Using Context

### Step 1: Create Context

```jsx
import { createContext } from "react";

const UserContext = createContext();
export { UserContext };
```

### Step 2: Create Provider Component

```jsx
import React, { createContext, useState } from "react";

const DarkModeContext = createContext();
export { DarkModeContext };

function DarkModeContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#1a1a1a" : "#ffffff";
    document.body.style.color = isDarkMode ? "#ffffff" : "#000000";
    document.body.style.transition = "all 0.3s ease";
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeContextProvider;
```

### Step 3: Wrap Components with Provider

```jsx
import DarkModeContextProvider from "./components/DarkModeContextProvider";

function App() {
  return (
    <div>
      <DarkModeContextProvider>
        <UserContext.Provider value={{ name: "kush kumar" }}>
          <Child Name="kush kumar" />
        </UserContext.Provider>
      </DarkModeContextProvider>
    </div>
  );
}
```

### Step 4: Consume Context in Components

```jsx
import { useContext } from "react";
import { UserContext } from "../App";
import { DarkModeContext } from "./DarkModeContextProvider";

function Child3(props) {
  const { name } = useContext(UserContext);
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  return (
    <div>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div>Name from context: {name}</div>
      <div>Name from props: {props.Name}</div>
    </div>
  );
}
```

---

## 4. Multiple Contexts

You can use multiple contexts in the same application:

```jsx
// Theme Context
const ThemeContext = createContext();

// User Context
const UserContext = createContext();

// App with multiple providers
function App() {
  return (
    <ThemeContext.Provider value={{ theme: "dark" }}>
      <UserContext.Provider value={{ user: "John" }}>
        <Child />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// Component using multiple contexts
function Child() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  return (
    <div>
      <p>Theme: {theme.theme}</p>
      <p>User: {user.user}</p>
    </div>
  );
}
```

---

## 5. Context vs Props

### When to Use Context:

- **Global State**: User authentication, theme settings, language preferences
- **Deep Component Trees**: When props need to pass through many levels
- **Shared Data**: Data that multiple components need access to
- **Avoiding Prop Drilling**: When intermediate components don't need the data

### When to Use Props:

- **Component-Specific Data**: Data that only one component needs
- **Simple Component Trees**: When there are only 1-2 levels of nesting
- **Explicit Data Flow**: When you want to make data flow obvious
- **Performance**: When you need fine-grained control over re-renders

### Comparison:

| Aspect          | Props                     | Context                             |
| --------------- | ------------------------- | ----------------------------------- |
| **Explicit**    | ✅ Clear data flow        | ❌ Hidden data flow                 |
| **Performance** | ✅ Granular control       | ❌ Can cause unnecessary re-renders |
| **Maintenance** | ❌ Verbose for deep trees | ✅ Clean for global state           |
| **Flexibility** | ❌ Rigid structure        | ✅ Flexible access                  |

---

## 6. Best Practices

### 1. Split Contexts by Domain

```jsx
// ❌ Bad - One large context
const AppContext = createContext();

// ✅ Good - Separate contexts by domain
const UserContext = createContext();
const ThemeContext = createContext();
const CartContext = createContext();
```

### 2. Use Custom Hooks for Context

```jsx
// Custom hook for user context
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}

// Usage
function Component() {
  const { user, login, logout } = useUser();
  // ...
}
```

### 3. Provide Default Values

```jsx
const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});
```

### 4. Memoize Context Values

```jsx
function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(
    () => ({
      user,
      login: (userData) => setUser(userData),
      logout: () => setUser(null),
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
```

---

## 7. Common Patterns

### Pattern 1: Theme Context

```jsx
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={theme === "dark" ? "dark-btn" : "light-btn"}
    >
      Toggle Theme
    </button>
  );
}
```

### Pattern 2: Authentication Context

```jsx
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const userData = await loginAPI(credentials);
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Pattern 3: Language Context

```jsx
const LanguageContext = createContext();

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: { welcome: "Welcome", hello: "Hello" },
    es: { welcome: "Bienvenido", hello: "Hola" },
    fr: { welcome: "Bienvenue", hello: "Bonjour" },
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
```

---

## 8. Performance Considerations

### 1. Context Value Changes

```jsx
// ❌ Bad - New object on every render
function Provider({ children }) {
  const [state, setState] = useState({});

  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
}

// ✅ Good - Memoized value
function Provider({ children }) {
  const [state, setState] = useState({});

  const value = useMemo(() => ({ state, setState }), [state]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
```

### 2. Splitting Contexts

```jsx
// ❌ Bad - One large context
const AppContext = createContext();

// ✅ Good - Split by domain
const UserContext = createContext();
const SettingsContext = createContext();
const CartContext = createContext();
```

### 3. Using React.memo

```jsx
const ExpensiveComponent = React.memo(function ExpensiveComponent() {
  const { theme } = useContext(ThemeContext);

  return <div className={theme}>Expensive content</div>;
});
```

---

## 9. Common Mistakes

### Mistake 1: Not Providing Context

```jsx
// ❌ Wrong - Component outside provider
function App() {
  return <Child />; // No provider
}

function Child() {
  const value = useContext(MyContext); // undefined
  return <div>{value}</div>;
}

// ✅ Correct - Wrap with provider
function App() {
  return (
    <MyContext.Provider value="hello">
      <Child />
    </MyContext.Provider>
  );
}
```

### Mistake 2: Creating Context Inside Component

```jsx
// ❌ Wrong - Context created inside component
function App() {
  const MyContext = createContext(); // This is wrong!

  return (
    <MyContext.Provider value="hello">
      <Child />
    </MyContext.Provider>
  );
}

// ✅ Correct - Context created outside
const MyContext = createContext();

function App() {
  return (
    <MyContext.Provider value="hello">
      <Child />
    </MyContext.Provider>
  );
}
```

### Mistake 3: Not Handling Context Changes

```jsx
// ❌ Wrong - No error handling
function Child() {
  const context = useContext(MyContext);
  return <div>{context.value}</div>; // Might be undefined
}

// ✅ Correct - With error handling
function Child() {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("Child must be used within MyContext.Provider");
  }

  return <div>{context.value}</div>;
}
```

---

## 10. Context vs Redux

### When to Use Context:

- **Simple State Management**: For small to medium applications
- **Built-in Solution**: No additional dependencies
- **React Native**: Works well with React Native
- **Learning**: Good for understanding state management concepts

### When to Use Redux:

- **Complex State**: Large applications with complex state
- **Developer Tools**: Need for debugging and time-travel debugging
- **Middleware**: Need for side effects, logging, etc.
- **Performance**: Need for optimized re-renders
- **Team Size**: Large teams that need standardized patterns

### Comparison:

| Feature             | Context API    | Redux        |
| ------------------- | -------------- | ------------ |
| **Bundle Size**     | ✅ Small       | ❌ Larger    |
| **Learning Curve**  | ✅ Simple      | ❌ Complex   |
| **Developer Tools** | ❌ Limited     | ✅ Excellent |
| **Middleware**      | ❌ No          | ✅ Yes       |
| **Performance**     | ❌ Can be slow | ✅ Optimized |
| **Boilerplate**     | ✅ Minimal     | ❌ Verbose   |

---

## 11. Key Takeaways

- **Context API** solves prop drilling by providing global state management
- **useContext** is the modern way to consume context in functional components
- **Split contexts** by domain to avoid unnecessary re-renders
- **Memoize context values** to prevent performance issues
- **Use custom hooks** to make context consumption cleaner
- **Handle missing context** with proper error boundaries
- **Consider performance** when using context for frequently changing data

---

## 12. Interview Questions

1. What is prop drilling and how does Context API solve it?
2. What's the difference between Context API and Redux?
3. How do you create and use Context in React?
4. What are the performance implications of using Context?
5. How do you handle multiple contexts in a React application?
6. What are the best practices for using Context API?
7. When should you use Context vs Props?
8. How do you test components that use Context?

---

## 13. Practical Example (from App.jsx)

```jsx
import React from "react";
import Child from "./components/Child";
import { createContext } from "react";
import DarkModeContextProvider from "./components/DarkModeContextProvider.jsx";

const UserContext = createContext();
export { UserContext };

function App() {
  // What is prop drilling?
  // Prop drilling is a technique in which we pass data from a parent component
  // to a child component through multiple levels of nested components.

  return (
    <div>
      parent
      {/* Prop drilling example - commented out */}
      {/* <Child Name="kush kumar" /> */}
      <DarkModeContextProvider>
        <UserContext.Provider value={{ name: "kush kumar" }}>
          <Child Name="kush kumar" />
        </UserContext.Provider>
      </DarkModeContextProvider>
    </div>
  );
}

export default App;
```

This example demonstrates:

- **Multiple Context Providers**: Both `DarkModeContextProvider` and `UserContext.Provider`
- **Context Hierarchy**: How contexts can be nested
- **Prop Drilling Alternative**: Using context instead of passing props through multiple levels
- **Clean Component Structure**: Components can access context directly without prop drilling

The key benefit is that `Child3` can access both the user name and dark mode state directly through context, without needing to pass these values through `Child` and `Child2` components that don't actually use them.
