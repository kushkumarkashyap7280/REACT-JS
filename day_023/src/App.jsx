import React, { useState, useCallback, useMemo } from 'react'
import Button from './components/Button'
import Memo from './components/Memo'

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState(0);
  const [theme, setTheme] = useState('light');

  // Expensive calculation function
  function Expensive(num) {
    console.log("inside expensive task");
    for(let i = 0; i < 1000000000; i++){}
    console.log("outside expensive task");
    return num * 2;
  }

  // ❌ Without useMemo - recalculates on every render
  // let double = Expensive(input);

  // ✅ With useMemo - only recalculates when input changes
  let double = useMemo(() => {
    return Expensive(input);
  }, [input]);

  // ❌ Without useCallback - functions recreated on every render
  // const Increment = () => {
  //   setCount(count + 1)
  // }

  // ✅ With useCallback - functions only recreated when dependencies change
  const Increment = useCallback(() => {
    setCount(count + 1)
  }, [count])

  const Decrement = useCallback(() => {
    setCount(count - 1)
  }, [count])

  // ✅ Even better: Use functional updates to avoid count dependency
  const IncrementOptimized = useCallback(() => {
    setCount(prev => prev + 1)
  }, []) // Empty dependency array - function never changes

  const DecrementOptimized = useCallback(() => {
    setCount(prev => prev - 1)
  }, []) // Empty dependency array - function never changes

  // Memoized object for React.memo demonstration
  const userData = useMemo(() => {
    return { name: "john", age: 20 }
  }, [])

  // Memoized theme object
  const themeData = useMemo(() => {
    return { 
      theme, 
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333'
    }
  }, [theme])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Performance Optimization Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Count: {count}</h2>
        <p>This demonstrates useCallback optimization</p>
        
        <div style={{ marginBottom: '10px' }}>
          <Button onClick={Increment}>Increment (with count dependency)</Button>
          <Button onClick={Decrement}>Decrement (with count dependency)</Button>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <Button onClick={IncrementOptimized}>Increment Optimized (no dependency)</Button>
          <Button onClick={DecrementOptimized}>Decrement Optimized (no dependency)</Button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>useMemo Demo - Expensive Calculation</h2>
        <p>This demonstrates useMemo optimization for expensive calculations</p>
        
        <input 
          type="number" 
          value={input} 
          onChange={(e) => setInput(Number(e.target.value))}
          placeholder="Enter a number"
          style={{ padding: '5px', marginRight: '10px' }}
        />
        
        <button onClick={() => setCount(count + 1)} style={{ padding: '5px' }}>
          Trigger Re-render (should not recalculate expensive task)
        </button>
        
        <h3>Result: {double}</h3>
        <p>Check console to see if expensive calculation runs</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>React.memo Demo</h2>
        <p>This demonstrates React.memo optimization</p>
        
        <button 
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          style={{ padding: '5px', marginBottom: '10px' }}
        >
          Toggle Theme (should not re-render Memo component)
        </button>
        
        <Memo user={userData} />
        <Memo user={themeData} />
      </div>

      <div style={{ 
        backgroundColor: themeData.backgroundColor, 
        color: themeData.color,
        padding: '10px',
        borderRadius: '5px'
      }}>
        <h3>Theme: {theme}</h3>
        <p>This section changes with theme, but Memo components should not re-render</p>
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <h3>Performance Tips:</h3>
        <ul>
          <li>Check console to see which components re-render</li>
          <li>Notice that Button components with optimized callbacks don't re-render</li>
          <li>Expensive calculation only runs when input changes</li>
          <li>Memo components only re-render when their props actually change</li>
        </ul>
      </div>
    </div>
  )
}

export default App


