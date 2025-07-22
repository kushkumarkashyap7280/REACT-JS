import React from 'react'
import SkillCard from './components/SkillCard'

function App() {
  const languageInfo = [
    {
      color: "yellow",
      svg: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg",
      lang_name: "JavaScript",
      desc: "A high-level, interpreted programming language that is one of the core technologies of the web. Perfect for building interactive websites and web applications.",
      fields: ["Frontend", "ES6+", "Web"]
    },
    {
      color: "yellow",
      svg: "https://cdn.worldvectorlogo.com/logos/python-5.svg",
      lang_name: "Python",
      desc: "A versatile, high-level programming language known for its simplicity and readability. Excellent for AI, data science, and backend development.",
      fields: ["AI", "Data Science", "Backend"]
    },
    {
      color: "yellow",
      svg: "https://www.vectorlogo.zone/logos/java/java-icon.svg",
      lang_name: "Java",
      desc: "A class-based, object-oriented programming language designed for reliability and security. Widely used in enterprise software and Android development.",
      fields: ["Enterprise", "Android", "Backend"]
    },
    {
      color: "yellow",
      svg: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
      lang_name: "React",
      desc: "A JavaScript library for building user interfaces with reusable components. Popular for creating dynamic and responsive web applications.",
      fields: ["UI", "Frontend", "SPA"]
    },
    {
      color: "yellow",
      svg: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
      lang_name: "Node.js",
      desc: "A runtime environment that executes JavaScript code outside a web browser. Essential for building scalable network applications.",
      fields: ["Backend", "Server", "JavaScript"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


          {/* {FIRST APPROACH} */}
          {/* first way to add skill multiple cards  is add here multiple  times   */}
          {/* <SkillCard />
          <SkillCard />
          <SkillCard />    but problem is  in skill card we have predefined js card only we even resue it not able to achieve reusiblity so that why props comes in light ...*/}





          {/* SECOND APPROACH :  but for single card at a time */}
          {/* lets try this  just pass the  prop and able to resuse again even content inside it */}
          {/*   return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Programming Skills</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {languageInfo.map((lang, index) => (
            <div key={index} className="transform hover:-translate-y-1 transition-all duration-300">
              <SkillCard {...lang} />
            </div>
          ))}
        </div>
      </div>
    </div> */}



          {/* THIRD AND PRODUCTION STANDARD APPROACH  */}

          {languageInfo.map((lang, index) => (
            <SkillCard
              key={index}
              {...lang}  // This will spread all properties from lang object as props
            />
          ))}

        </div>
      </div>
    </div>
  )
}

export default App
