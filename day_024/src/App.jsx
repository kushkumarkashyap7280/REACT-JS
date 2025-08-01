// import React from 'react'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Home from './pages/Home'
// import Profile from './pages/Profile'
// import About from './pages/About'

// // welcome today we will learn about react-router-dom
// // react router dom is a library for routing in react
// // it is a library for routing in react
// // this is same as creating a   reducer or context api
// // react router dom  has a router provider and a router
// //router provider take props just like context api provider and wrap up the router
// // router is a object that contains the routes and the elements to be rendered
// // path is the path of the route
// // element is the element to be rendered
// // we can use the router provider to wrap the router and the router to wrap the routes
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/profile",
//     element: <Profile />,
//   },
//   {
//     path: "/about",
//     element: <About />,
//   },
// ])

// function App() {

//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   )
// }

// export default App


// above was  just an example 
// best practice is create a  layout for app and use children property provided by reactd-router-dom

import React from 'react'
import AppLayout from './layouts/AppLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    // errorElement: <ErrorPage/>,    either you can use this  for error page or you can use the error element in the route
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/profile",
        element: <Profile/>,
      },
      {
        path: "/about",
        element: <About/>,
      },
      {
        path : "/about/:name", // this is a dynamic route
        element : <About/>,
      },
     
    ]
  },
  {
    path : "*",
    element : <ErrorPage/>
  }
]);

function App() {

 
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
