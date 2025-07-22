import React from 'react'

// WE CREATE A CARD WHICH IS WE USED TO SHOW PROGRAMMING LANGUAGE BUT HERE PROBLEM IS THAT EVEN WE USE IT MULTIPLE TIMES  BUT CONTENT IS SAME 

// SO WE NOT ONLY WANT RESUSEBILITY OF COMPONENT HERE BUT OF DATA HERE TOO ...
// THAT  WHY CONCEPT OF PROPS IN REACT COME TO LIGHT

// function SkillCard() {
//   return (
//     <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
//       <div className="relative h-48 bg-yellow-400 flex items-center justify-center p-4">
//         <img
//           className="h-32 w-32"
//           src="https://cdn.worldvectorlogo.com/logos/javascript-1.svg"
//           alt="JavaScript Logo"
//         />
//       </div>

//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2 text-gray-800">JavaScript</div>
//         <p className="text-gray-600 text-sm">
//           A high-level, interpreted programming language that is one of the core technologies of the web.
//           Perfect for building interactive websites and web applications.
//         </p>
//       </div>

//       <div className="px-6 pt-4 pb-6">
//         <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-yellow-700 mr-2 mb-2">
//           #Frontend
//         </span>
//         <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-yellow-700 mr-2 mb-2">
//           #ES6+
//         </span>
//         <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-yellow-700 mr-2 mb-2">
//           #Web
//         </span>
//       </div>
//     </div>
//   )
// }


// here is how suppose we want to change it data according to ours we use this way 
// assuming that above function or can say its parent function will always provide us what to show right ..


function SkillCard({ color, svg, lang_name, desc, fields }) {

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className={`relative h-48 bg-${color}-400 flex items-center justify-center p-4`}>
        <img
          className="h-32 w-32 transition-transform hover:scale-110 duration-300"
          src={svg}
          alt={`${lang_name} Logo`}
        />
      </div>

      <div className="px-6 py-4">
        <div className={`font-bold text-xl mb-2 text-${color}-600`}>{lang_name}</div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="px-6 pt-4 pb-6">
        {fields.map((field, index) => (
          <span
            key={index}
            className={`inline-block bg-${color}-400 text-${color}-600 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:shadow-md transition-shadow duration-200`}
          >
            #{field}
          </span>
        ))}
      </div>
    </div>
  )
}

export default SkillCard



