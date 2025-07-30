import { useRef } from "react";
import React from 'react'

function App() {
  // Traditional way of getting data using querySelector or getElementById
  // const name = document.querySelector('#name');
  // const bio = document.querySelector('#bio');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(name.value, bio.value);
  // }

  // Using useRef hook - React way
  const nameRef = useRef(null);
  const bioRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Name:', nameRef.current.value);
    console.log('Bio:', bioRef.current.value);
    e.target.reset();
  }

  return (
    <div>
      <h2>useRef Hook Example</h2>
      <p>This demonstrates how to use useRef to access DOM elements directly</p>

      {/* Traditional way - commented out */}
      {/* <form onSubmit={handleSubmit}>
                <input type="text" id='name' placeholder="Enter name" />
                <input type="text" id="bio" placeholder="Enter bio" />
                <button type='submit'>Submit</button>
            </form> */}

      {/* Using useRef hook - React way */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={nameRef}
          placeholder="Enter name"
        />
        <input
          type="text"
          ref={bioRef}
          placeholder="Enter bio"
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App
