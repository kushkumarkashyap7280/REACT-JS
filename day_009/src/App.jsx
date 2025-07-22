import React from 'react'
import { useState } from 'react'

function App() {


  // demonstration of  usestate hook 
  let [count, setCount] = useState(0);
  function increasef() {
    setCount(++count);
  }
  function decreasef() {
    setCount(--count);
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-50 rounded-xl shadow-md font-sans">
      <section className="mb-6 bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">About <code className="bg-blue-200 px-1 rounded">useState</code> Hook</h2>
        <p className="mb-2">
          <span className="font-semibold">Hooks</span> are special functions in React that let you use state and other React features in functional components. <code className="bg-blue-200 px-1 rounded">useState</code> is a hook that allows you to add state to your components. It returns a state variable and a function to update it.
        </p>
        <pre className="bg-blue-200 rounded p-2 text-sm overflow-x-auto mb-2">
          {`const [state, setState] = useState(initialValue);`}
        </pre>
        <p>
          In this example, <code className="bg-blue-200 px-1 rounded">count</code> is the state variable, and <code className="bg-blue-200 px-1 rounded">setCount</code> is the function to update it.
        </p>
      </section>
      <div className="flex items-center justify-center gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors" onClick={decreasef}>Decrease</button>
        <input className="w-16 text-center text-lg border border-gray-300 rounded bg-white" type="text" disabled value={count} />
         <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors" onClick={increasef}>Increase</button>
       
      </div>
    </div>
  )
}

export default App
