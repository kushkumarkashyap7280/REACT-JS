// import React from 'react'
// import { useParams } from 'react-router-dom' // this is a hook that allows you to access the dynamic parameters from the URL


// function About() {
//   const {name} = useParams()
//   return (
//     <div>
//      {name ? <h1>Your name is : {name }</h1> : <h1>About</h1>}
//     </div>
//   )
// }

// export default About


// but  we have another thing also
// you dont have to create  another /about/:id ,,, and having diferent purpose 

import React from 'react'

import { useSearchParams } from 'react-router-dom'
// this is use to serach or query params

function About() {

  const [searchParams, setSearchParams] = useSearchParams()
  const name = searchParams.get('name')
  const age = searchParams.get('age')
  const city = searchParams.get('city')
  const country = searchParams.get('country')
  const email = searchParams.get('email')
  const phone = searchParams.get('phone')
 // hit url like this  http://localhost:5173/about?name=john&age=20&city=newyork&country=usa&email=john@gmail.com&phone=1234567890
  return (
    <div>
      <h1>Your name is : {name}</h1>
      <h1>Your age is : {age}</h1>
      <h1>Your city is : {city}</h1>
      <h1>Your country is : {country}</h1>
      <h1>Your email is : {email}</h1>
      <h1>Your phone is : {phone}</h1>
    </div>
  )
}

export default About

