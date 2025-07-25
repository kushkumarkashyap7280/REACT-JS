import React from 'react'

function App() {
   const age = 18;
  return (
    <div>
      <h1>your age is : {age}</h1>

      <h2>you can vote {age >= 18 ? "yes" : "no"}</h2>
      {/* // this is called conditional rendering we decide what to render based on a condition */}

      <h1>you can drive {age >= 16 ? "yes" : "no"}</h1>
      {/* // this is called conditional rendering we decide what to render based on a condition */}

      <h1>you can drink {age >= 21 ? "yes" : "no"}</h1>
      {/* // this is called conditional rendering we decide what to render based on a condition */}

      <h1>you can rent a car {age >= 25 ? "yes" : "no"}</h1>

      {/* other types  like   using && operator */}
      <h1>you can vote {age >= 18 && "yes"}</h1>
      <h1>you can drive {age >= 16 && "yes"}</h1>
      <h1>you can drink {age >= 21 && "yes"}</h1>
      <h1>you can rent a car {age >= 25 && "yes"}</h1>

      {/* other types  like   using || operator */}
      <h1>you can vote {age >= 18 || "yes"}</h1>
      <h1>you can drive {age >= 16 || "yes"}</h1>
      <h1>you can drink {age >= 21 || "yes"}</h1>
      <h1>you can rent a car {age >= 25 || "yes"}</h1>

    </div>
  )
}

export default App
