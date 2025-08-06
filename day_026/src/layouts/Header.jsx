import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <nav className='bg-gray-800 text-white p-4' >
      <ul className='flex justify-center gap-4'>
        <li className='hover:text-red-500'  >
          <NavLink className={({isActive}) => isActive ? "text-red-500" : ""} to={"/"}>Home</NavLink>
        </li>
        <li className='hover:text-red-500'>
          <NavLink className={({isActive}) => isActive ? "text-red-500" : ""} to={"/infinite-scroll"}>InfiniteScroll</NavLink>
        </li>
        <li className='hover:text-red-500'>
          <NavLink className={({isActive}) => isActive ? "text-red-500" : ""}   to={"/fetch-old"}>FetchOld</NavLink>
        </li>
        <li className='hover:text-red-500'>
          <NavLink className={({isActive}) => isActive ? "text-red-500" : ""}   to={"/fetch-rq"}>FetchRQ</NavLink>
        </li>
      </ul>
      
    </nav>
  )
}

export default Header
