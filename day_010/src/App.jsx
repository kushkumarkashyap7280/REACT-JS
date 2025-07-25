import React from 'react'

import { useState } from 'react'    // this is the way when you want to use particular thing of modulus you can destruture them and use here ;


// deafuault export
// now see child component which we made in component folder
import Child from './components/Child'    // this is  only possible when it is deafault export from child 

// you can give any name to default exported fucntion or class while importing but in normal export you have to import with same name as in export 

// import { Child1 } from './components/Child'   // this is not deafult export so we have to desturutre it 


import { Child1, Child2 } from './components/Child'  // this works when you have mutliple child in a componenet and want to import here  so you can destruture like this




function App() {
  return (
    <div>
      {/* {there are many ways to import and export lets learn those ways} */}
      <Child />
      <Child1 />
      <Child2 />
    </div>
  )
}

export default App
