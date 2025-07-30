import React from 'react'
import Child from './components/Child'
import { createContext } from 'react'
import DarkModeContextProvider from './components/DarkModeContextProvider';

const UserContext = createContext();
export {UserContext};



function App() {
  // what is prop drilling ?
  // prop drilling is a technique in which we pass data from a parent component to a child component through multiple levels of nested components.
  // it is a technique in which we pass data from a parent component to a child component through multiple levels of nested components.
  
  return (
    <div>
      parent 
      {/* prop driling example 
      <Child  Name="kush kumar" /> */}
     
    <DarkModeContextProvider>
    <UserContext.Provider value={{name:"kush kumar"}}>
      <Child Name="kush kumar" />
     </UserContext.Provider>
    </DarkModeContextProvider>

    </div>
  )
}


export default App
