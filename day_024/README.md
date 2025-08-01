# Day 024 - React Router DOM: Complete Routing Solution

## Understanding React Router DOM

React Router DOM is a powerful library for handling routing in React applications. This day covers essential routing concepts including basic routing, layouts, navigation components, dynamic routes, query parameters, and error handling.

---

## Installation and Setup

### Installing React Router DOM:

```bash
# Using npm
npm install react-router-dom

# Using yarn
yarn add react-router-dom

# Using pnpm
pnpm add react-router-dom
```

### Package.json Dependencies:

After installation, your `package.json` should include:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0"
  }
}
```

### Importing React Router DOM:

```jsx
// Basic imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

// For createBrowserRouter (recommended)
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Navigation components
import { Link, NavLink } from "react-router-dom";

// Hooks
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
```

---

## 1. The Problem: Single Page Application Navigation

### Why React Router DOM Matters:

- **Client-Side Routing**: Navigate between pages without full page reloads
- **URL Management**: Maintain browser history and bookmarkable URLs
- **Component Organization**: Structure applications with proper routing hierarchy
- **User Experience**: Smooth navigation without losing application state
- **SEO Friendly**: Proper URL structure for search engine optimization

### Traditional vs React Router Approach:

```jsx
// ❌ Traditional approach - causes page reload
<a href="/about">About</a>

// ✅ React Router approach - no page reload
<Link to="/about">About</Link>
```

---

## 2. Basic Router Setup

### Core Components:

- **RouterProvider**: Wraps the entire application with routing capabilities
- **createBrowserRouter**: Creates a router configuration object
- **Route**: Defines individual routes with paths and components

### Basic Setup:

```jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
```

---

## 3. Layout Pattern with Outlet

### Why Use Layouts?

- **Consistent UI**: Shared header, footer, and navigation across pages
- **Code Reusability**: Avoid repeating common elements
- **Better Organization**: Separate layout concerns from page content
- **Nested Routing**: Support for complex routing hierarchies

### Layout Implementation:

```jsx
// AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AppLayout() {
  return (
    <>
      <Header />
      {/* Outlet renders child routes */}
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
```

### Router with Layout:

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
```

---

## 4. Navigation Components

### Three Approaches to Navigation:

#### Approach 1: Anchor Tags (❌ Avoid)

```jsx
// ❌ Problem: Causes page reload, loses state
function Header() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
}
```

**Problems:**

- Full page reload on navigation
- Application state is lost
- Poor user experience
- Not SPA behavior

#### Approach 2: Link Component (✅ Basic)

```jsx
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
```

**Benefits:**

- No page reload
- Maintains application state
- Smooth navigation
- Proper SPA behavior

#### Approach 3: NavLink Component (✅ Best Practice)

```jsx
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-500"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-500"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-500"
            }
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
```

**Benefits:**

- Active state management
- Dynamic styling based on current route
- Better user experience
- Visual feedback for current page

---

## 5. Dynamic Routes

### Route Parameters:

```jsx
// Router configuration
{
  path: "/about/:name", // Dynamic parameter
  element: <About/>,
}

// Component implementation
import { useParams } from 'react-router-dom'

function About() {
  const { name } = useParams()

  return (
    <div>
      {name ? <h1>Your name is: {name}</h1> : <h1>About</h1>}
    </div>
  )
}
```

### Multiple Parameters:

```jsx
// Router configuration
{
  path: "/user/:id/:action",
  element: <UserProfile/>,
}

// Component implementation
function UserProfile() {
  const { id, action } = useParams()

  return (
    <div>
      <h1>User ID: {id}</h1>
      <h2>Action: {action}</h2>
    </div>
  )
}
```

---

## 6. Query Parameters

### Using useSearchParams:

```jsx
import { useSearchParams } from "react-router-dom";

function About() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get query parameters
  const name = searchParams.get("name");
  const age = searchParams.get("age");
  const city = searchParams.get("city");
  const country = searchParams.get("country");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");

  return (
    <div>
      <h1>Your name is: {name}</h1>
      <h1>Your age is: {age}</h1>
      <h1>Your city is: {city}</h1>
      <h1>Your country is: {country}</h1>
      <h1>Your email is: {email}</h1>
      <h1>Your phone is: {phone}</h1>
    </div>
  );
}
```

### URL Example:

```
http://localhost:5173/about?name=john&age=20&city=newyork&country=usa&email=john@gmail.com&phone=1234567890
```

### Setting Query Parameters:

```jsx
function About() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = () => {
    setSearchParams({
      name: "john",
      age: "25",
      city: "london",
    });
  };

  return (
    <div>
      <button onClick={updateParams}>Update Parameters</button>
      {/* Display current parameters */}
    </div>
  );
}
```

---

## 7. Programmatic Navigation

### Using useNavigate Hook:

```jsx
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Error Page</h1>

      {/* Navigate to specific route */}
      <button onClick={() => navigate("/")}>Go to Home</button>

      {/* Navigate back */}
      <button onClick={() => navigate(-1)}>Go Back</button>

      {/* Navigate forward */}
      <button onClick={() => navigate(1)}>Go Forward</button>

      {/* Navigate with state */}
      <button
        onClick={() => navigate("/profile", { state: { from: "error" } })}
      >
        Go to Profile
      </button>
    </div>
  );
}
```

### Navigation Methods:

```jsx
// Navigate to specific route
navigate("/about");

// Navigate with state
navigate("/profile", { state: { user: "john" } });

// Navigate with replace (no history entry)
navigate("/home", { replace: true });

// Navigate back/forward
navigate(-1); // Go back
navigate(1); // Go forward

// Navigate with query parameters
navigate("/about?name=john&age=25");
```

---

## 8. Error Handling

### Error Routes:

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />, // Route-level error
    children: [
      // ... child routes
    ],
  },
  {
    path: "*", // Catch-all route
    element: <ErrorPage />,
  },
]);
```

### Error Page Implementation:

```jsx
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Error Page</h1>
        <p className="text-gray-600 mb-4">Page not found</p>

        {/* Better UX: Go back instead of home */}
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          Go to Previous Page
        </button>
      </div>
    </div>
  );
}
```

---

## 9. Advanced Routing Patterns

### Nested Routes:

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: <UserLayout />,
        children: [
          {
            path: "/users",
            element: <UserList />,
          },
          {
            path: "/users/:id",
            element: <UserDetail />,
          },
        ],
      },
    ],
  },
]);
```

### Index Routes:

```jsx
{
  path: "/dashboard",
  element: <DashboardLayout/>,
  children: [
    {
      index: true, // Default child route
      element: <DashboardHome/>,
    },
    {
      path: "profile",
      element: <DashboardProfile/>,
    },
  ]
}
```

### Protected Routes:

```jsx
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth(); // Custom hook

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
```

---

## 10. Navigation Patterns

### When to Use Each Navigation Method:

#### Link:

- **Use when**: Simple navigation between routes
- **Best for**: Navigation menus, buttons, links

```jsx
<Link to="/about">About</Link>
```

#### NavLink:

- **Use when**: Navigation with active state styling
- **Best for**: Navigation menus, tabs, breadcrumbs

```jsx
<NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
  About
</NavLink>
```

#### useNavigate:

- **Use when**: Programmatic navigation
- **Best for**: Form submissions, conditional navigation, error handling

```jsx
const navigate = useNavigate();
navigate("/success");
```

---

## 11. URL Patterns and Best Practices

### URL Structure:

```jsx
// ✅ Good URL patterns
"/"; // Home page
"/about"; // About page
"/users"; // User list
"/users/123"; // Specific user
"/users/123/edit"; // Edit user
"/posts/2023/12/25"; // Blog post by date

// ❌ Bad URL patterns
"/page1"; // Not descriptive
"/p"; // Too short
"/user_profile_page"; // Too long
```

### Route Organization:

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // Public routes
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },

      // User routes
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },

      // Admin routes
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { path: "users", element: <UserManagement /> },
          { path: "analytics", element: <Analytics /> },
        ],
      },
    ],
  },
]);
```

---

## 12. Performance Considerations

### Code Splitting with React Router:

```jsx
import { lazy, Suspense } from "react";

// Lazy load components
const About = lazy(() => import("./pages/About"));
const Profile = lazy(() => import("./pages/Profile"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
    ],
  },
]);
```

### Preloading Routes:

```jsx
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    // Preload the About component
    import("./pages/About");
  };

  return (
    <nav>
      <Link to="/about" onMouseEnter={handleMouseEnter}>
        About
      </Link>
    </nav>
  );
}
```

---

## 13. Testing React Router

### Testing Navigation:

```jsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("navigates to about page", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const aboutLink = screen.getByText(/about/i);
  fireEvent.click(aboutLink);

  expect(screen.getByText(/about page/i)).toBeInTheDocument();
});
```

### Testing Route Parameters:

```jsx
test("displays user name from URL parameter", () => {
  render(
    <MemoryRouter initialEntries={["/user/john"]}>
      <UserProfile />
    </MemoryRouter>
  );

  expect(screen.getByText(/john/i)).toBeInTheDocument();
});
```

---

## 14. Common Patterns and Best Practices

### Pattern 1: Layout with Navigation

```jsx
// AppLayout.jsx
function AppLayout() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Header.jsx
function Header() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
}
```

### Pattern 2: Dynamic Routes with Data

```jsx
// Router configuration
{
  path: "/products/:id",
  element: <ProductDetail />,
  loader: async ({ params }) => {
    const product = await fetchProduct(params.id)
    return { product }
  }
}

// Component
function ProductDetail() {
  const { product } = useLoaderData()

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  )
}
```

### Pattern 3: Search and Filter

```jsx
function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");
  const price = searchParams.get("price");

  const updateFilters = (newFilters) => {
    setSearchParams(newFilters);
  };

  return (
    <div>
      <FilterForm onFilter={updateFilters} />
      <ProductGrid category={category} price={price} />
    </div>
  );
}
```

---

## 15. Debugging and Troubleshooting

### Common Issues:

#### Issue 1: Routes not working

```jsx
// ❌ Problem: Missing RouterProvider
function App() {
  return <Home />;
}

// ✅ Solution: Wrap with RouterProvider
function App() {
  return <RouterProvider router={router} />;
}
```

#### Issue 2: Active links not working

```jsx
// ❌ Problem: Wrong path matching
<NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>
  About
</NavLink>

// ✅ Solution: Use exact path matching
<NavLink
  to="/about"
  className={({isActive}) => isActive ? 'active' : ''}
  end
>
  About
</NavLink>
```

#### Issue 3: Navigation not working

```jsx
// ❌ Problem: useNavigate outside Router
function MyComponent() {
  const navigate = useNavigate(); // Error: outside Router
}

// ✅ Solution: Ensure component is inside Router
function App() {
  return (
    <RouterProvider router={router}>
      <MyComponent />
    </RouterProvider>
  );
}
```

---

## 16. Key Takeaways

- **RouterProvider** wraps the entire application with routing capabilities
- **createBrowserRouter** creates the router configuration
- **Outlet** renders child routes in layout components
- **Link** provides basic navigation without page reload
- **NavLink** provides navigation with active state management
- **useNavigate** enables programmatic navigation
- **useParams** accesses dynamic route parameters
- **useSearchParams** manages query parameters
- **Layout pattern** provides consistent UI across routes
- **Error boundaries** handle routing errors gracefully

---

## 17. Interview Questions

1. What is the difference between Link and NavLink?
2. How do you handle dynamic routes in React Router?
3. What is the purpose of the Outlet component?
4. How do you implement protected routes?
5. What are query parameters and how do you use them?
6. How do you handle 404 errors in React Router?
7. What is the difference between useNavigate and Link?
8. How do you test React Router components?

---

## 18. Practical Example (from App.jsx)

```jsx
import React from "react";
import AppLayout from "./layouts/AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/about/:name", // Dynamic route
        element: <About />,
      },
    ],
  },
  {
    path: "*", // Catch-all route for 404
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
```

This comprehensive example demonstrates:

### **1. Layout Pattern:**

- **AppLayout**: Provides consistent header and footer across all pages
- **Outlet**: Renders child routes in the layout
- **Component Organization**: Separates layout concerns from page content

### **2. Route Configuration:**

- **Nested Routes**: Parent route with children for better organization
- **Dynamic Routes**: `/about/:name` for parameterized URLs
- **Error Handling**: Catch-all route for 404 pages

### **3. Navigation Components:**

- **Header**: Uses NavLink for active state styling
- **Footer**: Simple footer component
- **ErrorPage**: Uses useNavigate for programmatic navigation

### **4. Page Components:**

- **Home**: Simple home page
- **Profile**: User profile page
- **About**: Demonstrates query parameters and dynamic routes
- **ErrorPage**: Handles 404 errors with navigation

### **5. Advanced Features:**

- **Query Parameters**: About page handles multiple query parameters
- **Dynamic Routes**: Supports `/about/john` style URLs
- **Programmatic Navigation**: Error page can navigate back
- **Error Boundaries**: Graceful handling of invalid routes

The key benefits are:

- **Scalable Architecture**: Easy to add new routes and pages
- **Consistent UI**: Shared layout across all pages
- **User Experience**: Smooth navigation without page reloads
- **SEO Friendly**: Proper URL structure
- **Error Handling**: Graceful 404 and error pages
- **Flexible Navigation**: Multiple navigation patterns available
