import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../App'
import { DarkModeContext } from './DarkModeContextProvider'

function Child3(props) {
 
  const {name} = useContext(UserContext);
  const {isDarkMode, setIsDarkMode} = useContext(DarkModeContext);
  return (
    <div>
      <button onClick={()=>{
        setIsDarkMode(!isDarkMode);
      }}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
       child 3
      get from prop drilling : {props.Name}
      <div>name is {name} from context
      </div>
     
      
    </div>
  )
}

export default Child3
