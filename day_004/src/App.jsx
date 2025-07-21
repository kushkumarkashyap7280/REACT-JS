import React from 'react'

//importing custom component to use mutliple time 
import CustomUL from './components/CustomUL'

function App() {     // always make sure jsx file have name with Captical first letter
  return (
    <div>     {/*  here you made div as parent but sometimes you dont want  parent have some tag type so you use <> </>  it work same but this time you dont needt to always parent html tag type */ }
      <h1>welcome to react rules</h1>
      <ul>
        <li>in react every componenet  should have only one parent since we all know only one unit thing can be return from a function </li>
        <li> when you use anotheer component here as child so you must write syntax like
         {/*  <component />   or <component> </ component> */}
           </li>   
        <li>if you want to add any class = " " of html tag so you need to use className = " "  </li>
        
        {/* comments like this way since we are working in jsx type struture  */}


        {/* // lets tell you now you it it componet type  thing  make it more  easy and  methodlogy of do not repead your self  */}

        {/* first approach  */}

         <ul>
          <li>hi everyone</li>
          <li>whats up</li>
          <li>are you tired</li>
          <li>or want to give up </li>
         </ul>
        


         {/* here  you diretly used the html tags and build just we did in vanilla js  html css and js */}


         {/* now go to src/components/CustomUL.jsx  folder serach CustomUL.jsx and see  */}

         <CustomUL />
         <CustomUL />
         <CustomUL />

        {/* run npm run dev you will see  we just code one but used three more time just bringing here  */}




      </ul>   
      
    </div>
  )                  // as we know function return a single unit  so it must that topmost component which is parent here is div is parent so should have only one parent   adding another parent will show error 

  // another thing is  
}

export default App
