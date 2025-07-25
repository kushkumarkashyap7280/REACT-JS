import React from 'react'
import Child from './components/Child'
import GrandChild1 from './components/GrandChild1'
import GrandChild2 from './components/GrandChild2'

//  we alredy seen how to desturture and pass props to child in react previous days so now 
// lets see how does suupose i pass a child jsx content to component child i am using here 

function App() {
  return (
    <div>
      <h1>parent</h1>

      {/* <Child />    this is self closing we can not pass child of this child  */}


  
      <Child   Name="kush" >    {/* here we can pass props to all childs that are inside  */}
        {/* but here we can pass child of this child  */}

        <GrandChild1 />
        <GrandChild2 />

      </Child>

    </div>
  )
}

export default App
