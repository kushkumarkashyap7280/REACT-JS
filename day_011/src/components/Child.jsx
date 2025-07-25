import React from 'react'
import GrandChild1 from './GrandChild1'
import GrandChild2 from './GrandChild2'

function Child(props) {
  console.log(props)  // this is the way to print props in child component 

  // output :
  /*
  {Name: 'kush', children: Array(3)}
Name
: 
"kush"
children
: 
Array(3)
0
: 
"    "
1
: 
{$$typeof: Symbol(react.transitional.element), key: null, props: {…}, _owner: FiberNode, type: ƒ, …}
2
: 
$$typeof
: 
Symbol(react.transitional.element)
key
: 
null
props
: 
{}
type
: 
ƒ GrandChild2()
_owner
: 
FiberNode {tag: 0, key: null, stateNode: null, elementType: ƒ, type: ƒ, …}
_store
: 
{validated: 1}
ref
: 
null
_debugInfo
: 
null
_debugStack
: 
Error: react-stack-top-frame at exports.jsxDEV (http://localhost:5173/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e8901267:247:30) at App (http://localhost:5173/src/App.jsx?t=1753455111956:35:23) at react-stack-bottom-frame (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=94e01a8e:17422:20) at renderWithHooksAgain (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=94e01a8e:4279:22) at renderWithHooks (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=94e01a8e:4215:24) at updateFunctionComponent (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=94e01a8e:6617:21) at beginWork (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=94e01a8e:7652:20) at runWithFiberInDEV (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=94e01a8e:1483:72) at performUnitOfWork (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=94e01a8e:10866:98) at workLoopSync (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=94e01a8e:10726:43)
_debugTask
: 
{run: ƒ}
[[Prototype]]
: 
Object
length
: 
3
[[Prototype]]
: 
Array(0)
[[Prototype]]
: 
Object
*/

  // so clearly you can see that props is an object and it has two properties Name and children 
  // children is an array of three elements 
  // so now we can access the props in child component like this 
  // use case of passing children this way inside a chiild advantage when
  // we want to pass a child jsx content to component child i am using here 
  // so we can pass child of this child 
  // so we can pass child of this child 
  return (
    <div>
      <h1>i am  child name :{props.Name}</h1>
      {props.children}

    </div>
  )
}

export default Child
