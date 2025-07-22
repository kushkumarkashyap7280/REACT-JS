import React from 'react'
import { useState } from 'react'

function Main() {

  const [indegredient , setIndegredient] = useState([]);
  const handleIndegridientsSubmit = (e)=>{
    e.preventDefault();
    setIndegredient([...indegredient , e.target.indegredient.value]);
  }
  return (
    <main className="flex items-center justify-center mt-10">
      <form  onSubmit={handleIndegridientsSubmit} className="bg-gradient-to-r from-orange-400 to-amber-500 p-8 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-4 w-full max-w-2xl hover:scale-[1.01] transition-transform duration-300">
        <input
        name='indegredient'
          type="text"
          placeholder="eg: eggs, milk, flour"
          className="flex-1 px-4 py-3 rounded-lg border-2 outline-none border-orange-500 text-lg shadow-2xl focus:ring-2 focus:ring-amber-300 transition-all duration-200"
        />
        <button
          type="submit" 
          className="bg-white text-orange-500 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-amber-100 hover:text-orange-600 transition-all duration-200"
        >
          add Indegredients +
        </button>
      </form>

      <div className="mt-10">
        <ul>
          {indegredient.map((indegredient , key)=>{
            return  <li key={key}>{indegredient}</li>
          })}
        </ul>
      </div>
    </main>
  )
}

export default Main
