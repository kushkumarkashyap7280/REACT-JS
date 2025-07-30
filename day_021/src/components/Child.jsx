import React from 'react'
import Child2 from './Child2'

function Child({Name}) {
  return (
    <div>
      child 1 
      
      <Child2  Name={Name} / >
    </div>
  )
}

export default Child
