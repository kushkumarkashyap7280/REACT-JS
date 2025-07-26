import React from 'react'

function Child({onClick, onMouseEnter}) {
  return (
    <div>
      <h1>Child component</h1>
      <button onClick={onClick}>click me</button>
      <button onMouseEnter={onMouseEnter}>mouse enter</button>
    </div>
  )
}

export default Child
