# Day 026 - React Query & Data Fetching

## 🎯 Project Overview

This project demonstrates advanced data fetching patterns using **React Query (TanStack Query)** and compares them with traditional approaches. It includes infinite scroll, pagination, mutations, and optimized data management.

## 🚀 Key Features

### 1. **React Query Implementation**

- **Modern Data Fetching**: Using `@tanstack/react-query` for efficient data management
- **Caching**: Automatic caching and background updates
- **Optimistic Updates**: Immediate UI updates with rollback on errors
- **Error Handling**: Comprehensive error states and retry mechanisms

### 2. **Data Fetching Patterns**

#### **Traditional Approach** (`FetchOld.jsx`)

```javascript
// Old way with useState + useEffect
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData().then((res) => {
    setPosts(res.data);
    setLoading(false);
  });
}, []);
```

#### **React Query Approach** (`FetchRQ.jsx`)

```javascript
// Modern way with React Query
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchData,
  gcTime: 1000 * 60 * 5, // 5 minutes cache
  staleTime: 1000 * 60 * 2, // 2 minutes stale time
});
```

### 3. **Pagination Implementation**

- **Page-based Navigation**: Previous/Next buttons
- **Query Key Dependencies**: Automatic refetching on page changes
- **Placeholder Data**: Smooth transitions between pages

### 4. **Mutations (Create, Update, Delete)**

```javascript
// Delete Mutation
const deleteMutation = useMutation({
  mutationFn: (id) => deletePost(id),
  onSuccess: (data, id) => {
    queryClient.setQueryData(["posts", page, 10], (oldData) => {
      return oldData.filter((ele) => ele.id !== id);
    });
  },
});

// Update Mutation
const updateMutation = useMutation({
  mutationFn: (id) => updatePost(id),
  onSuccess: (data, id) => {
    queryClient.setQueryData(["posts", page, 10], (oldData) => {
      return oldData.map((ele) => (ele.id === id ? data : ele));
    });
  },
});
```

### 5. **Infinite Scroll** (`InfiniteScroll.jsx`)

- **Intersection Observer**: Using `react-intersection-observer` for performance
- **GitHub API Integration**: Fetching users with pagination
- **Automatic Loading**: Triggers when user reaches bottom

```javascript
const {
  data,
  isLoading,
  isError,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ["users"],
  queryFn: ({ pageParam = 1 }) => getUsers(pageParam),
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.length > 0 && allPages.length < 10
      ? allPages.length + 1
      : undefined;
  },
  initialPageParam: 1,
});
```

### 6. **Individual Post View** (`Individual.jsx`)

- **Dynamic Routing**: Using React Router with parameters
- **Query Key Dependencies**: Automatic refetching based on ID
- **Navigation**: Back button with browser history

## 🛠️ Technologies Used

### **Core Dependencies**

- **React 19.1.0**: Latest React with concurrent features
- **React Router DOM 7.7.1**: Client-side routing
- **@tanstack/react-query 5.84.1**: Data fetching and caching
- **Axios 1.11.0**: HTTP client for API calls

### **UI & Styling**

- **Tailwind CSS 4.1.11**: Utility-first CSS framework
- **@tailwindcss/vite**: Vite integration for Tailwind

### **Development Tools**

- **Vite 7.0.4**: Fast build tool and dev server
- **ESLint 9.30.1**: Code linting and formatting
- **React Intersection Observer 9.16.0**: Performance optimization

## 📁 Project Structure

```
day_026/
├── src/
│   ├── apis/
│   │   ├── reactQueryApi.js    # Modern API functions with React Query
│   │   └── oldApi.js           # Traditional API functions
│   ├── layouts/
│   │   ├── MainLayout.jsx      # Main layout wrapper
│   │   ├── Header.jsx          # Navigation header
│   │   └── Footer.jsx          # Footer component
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── FetchOld.jsx        # Traditional data fetching
│   │   ├── FetchRQ.jsx         # React Query implementation
│   │   ├── Individual.jsx      # Individual post view
│   │   └── InfiniteScroll.jsx  # Infinite scroll demo
│   ├── App.jsx                 # Main app with routing
│   └── main.jsx                # Entry point
```

## 🎨 Key Concepts Demonstrated

### **1. React Query Benefits**

- **Automatic Caching**: Data is cached and shared across components
- **Background Updates**: Data stays fresh without manual refetching
- **Optimistic Updates**: UI updates immediately, rolls back on errors
- **Error Handling**: Built-in error states and retry mechanisms
- **Loading States**: Automatic loading indicators

### **2. Query Configuration**

```javascript
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["posts"], // Unique identifier for caching
  queryFn: fetchData, // Function to fetch data
  gcTime: 1000 * 60 * 5, // Cache garbage collection time
  staleTime: 1000 * 60 * 2, // How long data stays fresh
  refetchInterval: 1000, // Auto-refetch every second
  refetchIntervalInBackground: true, // Refetch even when tab is inactive
});
```

### **3. Mutations with Optimistic Updates**

```javascript
const mutation = useMutation({
  mutationFn: updatePost,
  onMutate: async (newPost) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ["posts"] });

    // Snapshot previous value
    const previousPosts = queryClient.getQueryData(["posts"]);

    // Optimistically update
    queryClient.setQueryData(["posts"], (old) => [...old, newPost]);

    return { previousPosts };
  },
  onError: (err, newPost, context) => {
    // Rollback on error
    queryClient.setQueryData(["posts"], context.previousPosts);
  },
});
```

### **4. Infinite Scroll Implementation**

- **Intersection Observer**: Performance-optimized scroll detection
- **Page Parameter Management**: Automatic page increment
- **Loading States**: Separate loading for initial vs. next page
- **Error Boundaries**: Graceful error handling

## 🚀 Getting Started

### **Installation**

```bash
npm install
```

### **Development**

```bash
npm run dev
```

### **Build**

```bash
npm run build
```

### **Linting**

```bash
npm run lint
```

## 🌐 API Endpoints Used

### **JSONPlaceholder API**

- **Base URL**: `https://jsonplaceholder.typicode.com`
- **Endpoints**: `/posts`, `/posts/:id`
- **Operations**: GET, POST, PUT, DELETE

### **GitHub API**

- **Base URL**: `https://api.github.com`
- **Endpoint**: `/users`
- **Parameters**: `per_page=10`, `page=${pageParam}`

## 📊 Performance Optimizations

### **1. React Query Optimizations**

- **Stale Time**: Prevents unnecessary refetches
- **Garbage Collection**: Automatic cache cleanup
- **Background Updates**: Keeps data fresh without blocking UI

### **2. Infinite Scroll Optimizations**

- **Intersection Observer**: More efficient than scroll events
- **Throttling**: Prevents excessive API calls
- **Virtual Scrolling**: Only renders visible items (future enhancement)

### **3. Bundle Optimizations**

- **Code Splitting**: Route-based code splitting
- **Tree Shaking**: Removes unused code
- **Vite**: Fast development and build times

## 🔧 Advanced Features

### **1. Query Invalidation**

```javascript
// Invalidate specific queries
queryClient.invalidateQueries({ queryKey: ["posts"] });

// Invalidate multiple queries
queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
```

### **2. Prefetching**

```javascript
// Prefetch data for better UX
queryClient.prefetchQuery({
  queryKey: ["posts", nextPage],
  queryFn: () => fetchPerPage(nextPage, 10),
});
```

### **3. Optimistic Updates**

```javascript
// Update cache immediately
queryClient.setQueryData(["posts"], (oldData) => {
  return oldData.map((post) =>
    post.id === updatedPost.id ? updatedPost : post
  );
});
```

## 🎯 Learning Outcomes

### **React Query Mastery**

- Understanding of caching strategies
- Mutation patterns and optimistic updates
- Error handling and retry mechanisms
- Performance optimization techniques

### **Modern Data Fetching**

- Comparison between traditional and modern approaches
- Benefits of declarative data fetching
- Automatic background synchronization
- Optimistic UI updates

### **Advanced React Patterns**

- Custom hooks for data fetching
- Error boundaries and loading states
- Performance optimization with React Query
- Infinite scroll implementation

## 🔮 Future Enhancements

### **Potential Improvements**

- **Virtual Scrolling**: For large datasets
- **Offline Support**: Service worker integration
- **Real-time Updates**: WebSocket integration
- **Advanced Caching**: Custom cache strategies
- **TypeScript**: Type safety for better development experience

---

**Day 026** demonstrates the power of modern data fetching with React Query, showing how to build performant, user-friendly applications with minimal boilerplate code and maximum developer experience.
