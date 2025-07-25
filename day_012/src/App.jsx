import React from 'react'
import './App.css'  
import styles from './app.module.css'

function App() {

    const isDangerous = true;

   const myStyle = {
    color: 'red' , 
    backgroundColor: 'black' , 
    padding: '10px' , 
    borderRadius: '10px' , 
    textAlign: 'center' , 
    fontSize: '20px' , 
    fontWeight: 'bold' , 
   };
  return (

    <div>
      {/* there are many ways to use css in react 
      lets explore some   */}
      {/* 1. inline css */}
      <h1 style={{color: 'red' , backgroundColor: 'black' , padding: '10px' , borderRadius: '10px' , textAlign: 'center' , fontSize: '20px' , fontWeight: 'bold' , margin: '10px' , border: '1px solid black' , boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)'}}> using inline  </h1>

      {/* note : 
      int inline css since we inside jsx we have to pass style as obj why this ?
      because in jsx we can not use css directly we have to pass style as obj 
      */}
      {/* this way using css   is not recommended because it is not a good practice to use inline css in react 
      because it on render everytime it will crate a new obj */}


      {/* use contant variable instead  */}

      <h1 style={myStyle}>better using inline this way </h1>


      {/* 2. css file  get from separte file app.css */}
      <h1 className='heading'>  making separte css file and import it in app.jsx </h1>

      {/* 3. css module  get from separte file app.module.css  this is the best way to use css in react . here access className as prop 
      and it is scoped to the component so it will not affect other components
       if you see in html file on browser you will see each  styling property has ha unique value */}
      <h1 className={styles.heading}>  using css module </h1>

      { /* 4. ass you know about tailwind css you can use it in react check day_002 */}


    {/* LETS LEARN CONDITIONAL  STYLING IN REACT  */}

    <h1 style={{color: isDangerous ? 'red' : 'blue'}}> hello ji </h1>

    </div>
  )
}

export default App
