import React, { useEffect, useState } from 'react'

function App() {
  //  lets learn about useEffect hook?
  // what is sideeffects ?
  /*
  useEffect hook is a hook provide by react to work with sideeffect of a event 
  for example - you are login in an gmail field of  a form now you want that to throw a message or error message if not having format like email so there you can use useefffect just to  avoid , but main purpose or event was to get detail and form submisssion but now you can 
  give him realtime clearity

  there are 4 ways we can use useEffect lets see one by one
  */


  //  what is denpendecy ?
  // type 1 : with  no depnedency 

  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log("i will change on every render ")
    // see on browser console
    // whenver you modify or make any changes and rendering process occur this will run 
  })

  // second type : with empty dependency runs just first time on component load.
  useEffect(() => {
    console.log("i will run first time only")
  }, [])

  // third type : with dependency means  only when that state change it will render or process function occured
  useEffect(() => {
    {
      console.log(" i will change with dependency only ")
    }
  }, [email])

  // fourth : with return function for cleanup

  const [time, setTime] = useState(new Date());

  useEffect(() => {

    const changetime = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(changetime);
  }, [])


  return (
    <div>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <h2>your email is : {email}</h2>
      {time.toLocaleTimeString()}
    </div>
  )
}

export default App
