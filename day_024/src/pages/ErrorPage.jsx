import React from 'react'
import { useNavigate } from 'react-router-dom'

// useNavigate is a hook that allows you to navigate to a different route

// when to use Link  : when you want to navigate to a different route
// when to use Navlink : when you want to navigate to a different route and you want to style the active link
// when to use useNavigate : when you want to navigate to a different route and you want to navigate programmatically


function ErrorPage() {
  const navigate = useNavigate()
  return (
    <div className='flex justify-center items-center h-screen'>
      <h1 className='text-4xl font-bold'>Error Page</h1>
      {/* <button className='bg-blue-500 text-white p-2 rounded-md' onClick={() => navigate('/')}>Go to Home</button> */}
      {/* generally we  dont prefer that  user how is doing some stuff and hid wrong link navigate to home may be was on  some other page so it not goood in practice  */}

      {/* use  -1 to go back to the previous page */}
      <button className='bg-blue-500 text-white p-2 rounded-md' onClick={() => navigate(-1)}>Go to Previous Page</button>

    </div>
  )
}

export default ErrorPage
