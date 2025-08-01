// import React from 'react'

// // avoid this 
// // when we  crate routes in vanilla js we  use anchor tag to navigate but since if we using  here so it will reload the page means   all the states of components get refresh and  and  all the data will be lost
// function Header() {
//   return (
//     <div className='border-b border-gray-300'>
//       <nav className='flex justify-center items-center h-16 bg-gray-200'>
//         <ul className='flex gap-4'>
//           <li>
//             <a className='text-blue-500' href="/">Home</a>
//           </li>
//           <li>
//             <a className='text-blue-500' href="/profile">Profile</a>
//           </li>
//             <li>
//             <a className='text-blue-500'   href="/about">About</a>
//           </li>
//         </ul>

//       </nav>
      
//     </div>
//   )
// }

// export default Header


// second approach 
// use link so page not refresh but react inside itself able to render and navigate to that page 
//  " link" is a component provided by react router dom
//  " to" is a prop provided by link component


// import React from 'react'
// import {Link} from 'react-router-dom'

// function Header() {
//   return (
//     <div className='border-b border-gray-300'>
//       <nav className='flex justify-center items-center h-16 bg-gray-200'>
//         <ul className='flex gap-4'>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/profile">Profile</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   )
// }

// export default Header


// third approach 
// which is best in practice and various feature you get  when using  " NavLink " provided by react router dom
//  " NavLink " is a component provided by react router dom
//  " to" is a prop provided by NavLink component
//  " activeClassName" is a prop provided by NavLink component
//  " activeClassName" is a prop provided by NavLink component

// Note  : this is especially for styling the active link

// active state provided by NavLink is a boolean value that is true if the link is active and false if the link is not active
// isActive is a prop provided by NavLink component
// isActive is a prop provided by NavLink component

import React from 'react'
import { NavLink} from 'react-router-dom'

function Header() {
  return (
    <div className='border-b border-gray-300'>
      <nav className='flex justify-center items-center h-16 bg-gray-200'>
        <ul className='flex gap-4'>
          <li>
            <NavLink to="/"  className={({isActive}) => isActive ? 'text-blue-500' : 'text-gray-500'}>Home</NavLink>
          </li>
         
          <li>
            <NavLink to="/about" className={({isActive}) => isActive ? 'text-blue-500' : 'text-gray-500'}>About</NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({isActive}) => isActive ? 'text-blue-500' : 'text-gray-500'}>Profile</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header