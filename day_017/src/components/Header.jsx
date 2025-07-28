import React from 'react'
import { useState, useEffect } from 'react'

function Header() {

  const [time , setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
 
  return (
    <nav>
      <h1>TODO APP</h1>
      {time.toLocaleString()}
    </nav>
  )
}

export default Header
