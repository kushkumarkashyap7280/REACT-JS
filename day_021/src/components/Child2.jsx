import React from 'react'
import Child3 from './Child3'

function Child2({Name}) {
  return (
    <div>
      child 2
      <Child3 Name={Name} />
    </div>
  )
}

export default Child2
