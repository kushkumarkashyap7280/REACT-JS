# Day 008 - Props and Component Reusability in React

## Understanding Props in React

Props (short for Properties) are React's way of passing data from parent components to child components in form of object . They are the fundamental mechanism for component communication in React.

### What are Props?

- Props are read-only data passed to components
- They work similarly to HTML attributes but can pass any JavaScript value
- Props follow a one-way data flow (parent to child)
- Props can't be modified by the child component (immutable)

### Different Ways to Pass Props

1. **Individual Props**

   ```jsx
   // Parent Component
   <ChildComponent name="John" age={25} isActive={true} />;

   // Child Component
   function ChildComponent(props) {
     return (
       <div>
         {props.name} is {props.age} years old
       </div>
     );
   }
   ```

2. **Props Destructuring**

   ```jsx
   // Method 1: In parameter
   function ChildComponent({ name, age, isActive }) {
     return (
       <div>
         {name} is {age} years old
       </div>
     );
   }

   // Method 2: In function body
   function ChildComponent(props) {
     const { name, age, isActive } = props;
     return (
       <div>
         {name} is {age} years old
       </div>
     );
   }
   ```

3. **Spread Operator**

   ```jsx
   // Parent Component
   const data = { name: "John", age: 25, isActive: true };
   <ChildComponent {...data} />;
   ```

4. **Children Prop**

   ```jsx
   // Parent Component
   <ParentComponent>
     <h1>This content is a child prop</h1>
   </ParentComponent>;

   // Child Component
   function ParentComponent({ children }) {
     return <div>{children}</div>;
   }
   ```

5. **Default Props**

   ```jsx
   function ChildComponent({ name = "Guest", age = 0 }) {
     return (
       <div>
         {name} is {age} years old
       </div>
     );
   }
   ```

6. **Props with Methods**

   ```jsx
   // Parent Component
   <ChildComponent onClick={() => alert("Clicked!")} />;

   // Child Component
   function ChildComponent({ onClick }) {
     return <button onClick={onClick}>Click me</button>;
   }
   ```

### Prop Types (Type Checking)

```jsx
import PropTypes from "prop-types";

function User({ name, age }) {
  return (
    <div>
      {name} is {age}
    </div>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
};
```

### Best Practices

1. Keep props simple and focused
2. Use descriptive prop names
3. Provide default values when appropriate
4. Validate props using PropTypes
5. Don't modify props inside child components
6. Use composition over complex prop chains

## What We Learned Today

### 1. Understanding Props and Reusability

- How to transform a static component into a reusable component
- The concept of props for passing data from parent to child components
- Props destructuring for cleaner code
- Why props are essential for component reusability

### 2. Three Approaches to Component Usage (Evolution)

1. **Basic Approach (Static Content)**

   ```jsx
   <SkillCard /> // Problem: Content is hardcoded, not reusable
   ```

2. **Props Approach (Direct Props)**

   ```jsx
   <SkillCard
     color="yellow"
     svg="path/to/image.svg"
     lang_name="JavaScript"
     desc="Description here"
     fields={["Frontend", "Web"]}
   />
   ```

3. **Production Approach (Data-Driven)**

   ```jsx
   const languageInfo = [
     /* array of language data */
   ];

   // Map through data to create multiple cards
   {
     languageInfo.map((lang, index) => <SkillCard key={index} {...lang} />);
   }
   ```

### 3. Props Best Practices

- Destructuring props in function parameters
- Using dynamic class names with template literals
- Handling arrays in props (fields array for tags)
- Using the spread operator (...) for passing multiple props

### 4. Dynamic Styling with Props

- Using template literals for dynamic Tailwind classes
- Conditional styling based on prop values
- Managing color schemes through props

### 5. Data Organization

- Separating data from components
- Creating structured data objects
- Using maps for rendering multiple components

### 6. Key React Concepts Covered

- Component reusability
- Props as a one-way data flow
- JSX dynamic expressions
- Array mapping in JSX
- Key prop importance in lists

## Practical Implementation

We created a skill card system that demonstrates:

1. Component reusability (same component, different data)
2. Props usage for customization
3. Data-driven UI development
4. Dynamic styling with Tailwind CSS
5. Modern React patterns and best practices

## Component Structure

```jsx
// SkillCard.jsx
function SkillCard({ color, svg, lang_name, desc, fields }) {
  return (
    // Component JSX with dynamic props usage
  )
}

// App.jsx
function App() {
  const languageInfo = [/* data array */];
  return (
    // Mapping through data to create multiple cards
  )
}
```

## Key Takeaways

1. **DRY Principle**: Don't Repeat Yourself - Create reusable components
2. **Props Power**: Props make components flexible and reusable
3. **Data-Component Separation**: Keep data separate from component logic
4. **Dynamic Styling**: Use props to control component appearance
5. **Scalability**: Well-structured components are easier to maintain and scale

## Exercise Suggestions

1. Add more programming languages to the `languageInfo` array
2. Add new props to customize more aspects of the cards
3. Implement a search or filter function for the cards
4. Add click handlers to make the cards interactive
5. Create a different type of card using the same pattern

## Interview Questions

1. What are props in React and why are they important?
2. How do you pass data from parent to child components?
3. What is the spread operator and how is it used with props?
4. Why do we need the 'key' prop when mapping through arrays?
5. How can we make components reusable in React?
