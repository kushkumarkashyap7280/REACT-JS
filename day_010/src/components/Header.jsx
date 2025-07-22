import React from 'react'
import viteLogo from '../assets/vite.svg'

function Header() {
  return (
    <div className='bg-gradient-to-r from-orange-400 to-amber-500  p-6 rounded-xl shadow-2xl flex items-center justify-center gap-6 hover:scale-[1.01] transition-transform duration-300'>
      <img
        src={viteLogo}
        className="h-24 hover:rotate-360 transition-transform duration-500 drop-shadow-2xl"
        alt="Vite logo"
      />
      <h1 className='text-4xl font-extrabold text-white tracking-wider drop-shadow-lg hover:tracking-widest transition-all duration-300'>
        RECIPE MASTER
      </h1>
    </div>
  )
}

export default Header
