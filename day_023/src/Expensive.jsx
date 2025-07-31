import React from 'react'
import { useState } from 'react'

function Expensive() {

   const [count , setCount] = useState(0);

   function increment(){
    for(let i = 0; i < 100000000; i++){
      setCount(prev=>prev+1)
    }
   }

  return (
    <div>
      { increment}
       <h2> perfomring expesive task  in child component </h2>
       <h3>sum is :  {count} </h3>
      
    </div>
  )
}

export default Expensive
