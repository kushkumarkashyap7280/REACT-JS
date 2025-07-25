import React from 'react'

// function Child() {
//   return (
//     <div>
//       <h1>i am default child</h1>
//     </div>
//   )
// }

// this another way of default export you can done
export default function Child(){
  return(
    <div>
      <h1>i am default child</h1>
    </div>
  )
}


function Child1() {
  return (
    <div>
      <h1>i am child 1</h1>
    </div>
  )
}


// export default Child    // this is the first way when  you have just one component in one file you can default export like that and every file have only one default ;


// now suppose have two components in single so you can export like

// export {Child1}     /// this is the way of doing export without default ;



function Child2() {
  return (
    <div>
      <h1> i am child 2</h1>
    </div>
  )
}

export {Child1 , Child2}


// suppose you have  many childs to export 
