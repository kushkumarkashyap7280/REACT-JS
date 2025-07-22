# Day 006 - Understanding React Components & The Journey So Far

## 🔄 Connecting the Dots: From Day 1 to Day 6

Our journey has been carefully structured to understand React from the ground up:

1. **Day 1-3**: Learned core concepts and basic React setup
2. **Day 4**: Explored React rules and best practices
3. **Day 5**: Created components as separate functions in one file
4. **Day 6 (Today)**: Understanding that those functions are actually components that can live in their own files!

## 🎯 Today's Focus: Component Separation & Real-world Practice

We're building the bridge between our previous learning and real-world React applications:

1. **From Functions to Components**

   - In Day 5, we wrote functions that returned JSX
   - Today, we see these are actually React components
   - Each component can live in its own file
   - Components are reusable building blocks

2. **Understanding File Separation**

   ```jsx
   // Before (Day 5) - All in one file:
   const Navbar = () => {
     /* ... */
   };
   const Main = () => {
     /* ... */
   };
   const App = () => {
     /* ... */
   };

   // Now (Day 6) - Separated into files:
   // components/Navbar.jsx
   const Navbar = () => {
     /* ... */
   };

   // App.jsx
   const App = () => {
     return <Navbar />; // Using the component
   };
   ```

## 🤔 Interview Questions for Day 6

1. **Q**: What's the difference between having all components in one file vs. separating them?
   **A**: Separating components provides:

   - Better organization
   - Easier maintenance
   - Reusability
   - Better version control
   - Team collaboration possibilities

2. **Q**: Why did we learn React with CDN before build tools?
   **A**: To understand:

   - Core React concepts without build complexity
   - That React is "just JavaScript"
   - How components work at a fundamental level
   - The purpose of build tools before using them

3. **Q**: How does component separation in CDN setup differ from build tools?
   **A**:
   - CDN: Load order matters, global scope
   - Build tools: Import/Export system, module scope
   - Both achieve component separation, but build tools are more maintainable

## 🔮 Preview: What's Next?

In the next lesson, we'll use Vite to create a real-world React application. You'll see:

- How build tools make imports/exports easier
- Why node_modules is necessary
- How the development environment improves
- Real-world project structure

## 🎓 Key Takeaways

1. Components are just JavaScript functions that return JSX
2. These functions can be separated into different files
3. The journey from vanilla JS to React is gradual:
   - First understanding JavaScript
   - Then learning React basics
   - Finally using modern build tools

## 💡 Why This Approach Matters

We've purposely avoided build tools until now to:

1. Understand React's core concepts
2. See that React is "just JavaScript"
3. Appreciate why build tools are helpful
4. Learn things step by step

Remember: While modern React development uses build tools like Vite, understanding these fundamentals makes you a better React developer!
