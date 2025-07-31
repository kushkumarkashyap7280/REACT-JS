// // import React, { useState } from 'react'

// // function App() {
//       // we already learned in previous days about useState hook right
// //   //  generally we use useState to store current state and manage inside components 
// //   // but here problem is we have manually solve each time like form and other and having more complex logic
// //   const [count, setCount] = useState(0)
// //   return (
// //     <div>
// //       <h1>Count: {count}</h1>
// //       <button onClick={() => setCount(count + 1)}>Increment</button>
// //       <button onClick={() => setCount(count - 1)}>Decrement</button>
// //       <button onClick={() => setCount(0)}>Reset</button>
// //     </div>
// //   )
// // }

// // export default App

// // import React from 'react'
// // import { useReducer } from 'react'

// // function App() {

// //     const reducer = (state, action) => {
// //       switch(action){
// //         case 'increment':
// //           return state + 1
// //         case 'decrement':
// //           return state - 1
// //         case 'reset':
// //           return 0
// //         default:
// //           return state
// //       }
// //     }

// //   // lets see  useReducer hook 
// //    const [ count , dispatch] = useReducer(reducer, 0)

// //    // what is state 
// //    // what is reducer 
// //    // what is dispatch 
// //    // what is action 
// //    // what is payload 

// //    // it same have state as   useState have 
// //    // it also have dispatch function which look like  setCount type but  setCount is a function with arg of prev state but here me alredy make function so  we just pass the function name we we made and dispatch  distach that function and change  prev value based on type of function we send 

// //    // reducer is  a function itself but  it    some we use  to dispatch using disptach 
   
// //    // why we using this not usestate 
// //    // advangtages is   we alerdy made certain function that alredy difined suppose use wnat to increase you se to button that incraese then uou set another button setcount decreasee this way you making many changes but if application is too  large then it will  a headache thats why useREducer is best in practice  already defined reducer which are  name convetin of function in useREducer     means fuction which we can dispatch right...
// //    // dispatch is like delivery boy who carry that function and  based on switch condtion predict the next outcome 
// //    // other wise if u use  usestate you may be wrongly made wrongs function on button thats why
// //   return (
// //     <div>
// //       <h1>Count: {count}</h1>
// //       <button onClick={() => dispatch('increment')}>Increment</button>
// //       <button onClick={() => dispatch('decrement')}>Decrement</button>
// //       <button onClick={() => dispatch('reset')}>Reset</button>
// //     </div>
// //   )
// // }

// import React from 'react'
// import { useReducer } from 'react'

// function App() {

//   // payload example
//   const reducer = (state, action) => {   // state is prev state and action is the action that we dispatch
//     console.log(action.type)     // action have type and payload  action  = { type :  'setName' , payload : 'John' }
//     switch(action.type){                                                    
//       case 'setName':
//         return { ...state, name: action.payload }
//       case 'setAge':
//         return { ...state, age: action.payload }
//       default:
//         return state
//     }
//    }

//   // with payload 
//     // useReducer take two argument first is reducer function and second is initial state
//   //  const [ user , dispatch] = useReducer(reducer, {name: '', age: ''})  // user is the state and dispatch is the function that we use to dispatch the action

//    // dispatch is like delivery boy who carry that function and  based on switch condtion predict the next outcome 
//    // other wise if u use  usestate you may be wrongly made wrongs function on button thats why

//    // we can also use useReducer with object and array
//     const intitialState = {
//       name : '',
//       age : ''
//     }

//     const [ state  , dispatch] = useReducer(reducer, intitialState)

  
//   return (
//     // <div>
//     //   <input type="text" placeholder='Name' value={user.name} onChange={(e) => dispatch({type: 'setName', payload: e.target.value})} />
//     //   <input type="text" placeholder='Age' value={user.age} onChange={(e) => dispatch({type: 'setAge', payload: e.target.value})} />
//     //   <h1>Name: {user.name}</h1>
//     //   <h1>Age: {user.age}</h1>
//     // </div>

//     //another example 
//     // best practice 
//       <div>
//       <input type="text" placeholder='Name' value={state.name} onChange={(e) => dispatch({type: 'setName', payload: e.target.value})} />
//       <input type="text" placeholder='Age' value={state.age} onChange={(e) => dispatch({type: 'setAge', payload: e.target.value})} />
//       <h1>Name: {state.name}</h1>
//       <h1>Age: {state.age}</h1>
//     </div>
//   )
// }

// export default App

// example using array
import React, { useReducer ,useRef } from 'react'

  

  
function App() {
   const user = useRef(null);
   const intitialState = [];
   const reducer = (state , action) => {
    switch(action.type){
      case 'add':  
       { 
         user.current.value = ''
        return [...state , action.payload]
       }
        break;
      case 'remove':
        return state.filter((item,index) => index !== action.payload)
      default:
        return state
    }
   }
  const [ state , dispatch] = useReducer(reducer ,intitialState);
  return (
    <div>
      <input type="text" placeholder='Name' ref={user} />
      <button onClick={() => {dispatch({type: 'add', payload: {name: user.current.value}});}}>Add</button>
    <ul>
      {state.map((item,index) => (
        <li key={index}>{item.name}
          <button onClick={() => dispatch({type: 'remove', payload: index})}>Remove</button>
        </li>

      ))}
      
    </ul>
    </div>
  )
}

export default App




