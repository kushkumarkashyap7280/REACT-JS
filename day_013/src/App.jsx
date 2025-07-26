import React from 'react'
import Child from './Child';

function App() {

  const handleButtionClick = (e) => {
    console.log(e);

    alert("button clicked");
  }
  // output 
  /*SyntheticBaseEvent {_reactName: 'onClick', _targetInst: null, type: 'click', nativeEvent: PointerEvent, target: button, …}
altKey
: 
false
bubbles
: 
true
button
: 
0
buttons
: 
0
cancelable
: 
true
clientX
: 
57
clientY
: 
303
ctrlKey
: 
false
currentTarget
: 
null
defaultPrevented
: 
false
detail
: 
1
eventPhase
: 
3
getModifierState
: 
ƒ modifierStateGetter(keyArg)
isDefaultPrevented
: 
ƒ functionThatReturnsFalse()
isPropagationStopped
: 
ƒ functionThatReturnsFalse()
isTrusted
: 
true
metaKey
: 
false
movementX
: 
0
movementY
: 
0
nativeEvent
: 
PointerEvent {isTrusted: true, pointerId: 2, width: 1, height: 1, pressure: 0, …}
pageX
: 
57
pageY
: 
303
relatedTarget
: 
null
screenX
: 
390
screenY
: 
496
shiftKey
: 
false
target
: 
button
timeStamp
: 
1946.5
type
: 
"click"
view
: 
Window {window: Window, self: Window, document: document, name: '', location: Location, …}
_reactName
: 
"onClick"
_targetInst
: 
null
[[Prototype]]
: 
Object
*/

  const onHover = () => {
    alert("you hovered on child componet having event handler as props the button");
  }

  const welcomeuser = (name) => {
    alert(`welcome ${name}  this is  with arrow function`);
  }

  return (
    <div>
      {/* event handling in react  */}

      {/* synthetic base event we have in react  */}

      {/* synthetic event is a wrapper around the native event  */}
           
      <button onClick={handleButtionClick}>click me</button>

      <button onDoubleClick={()=> alert("you clicked  second button")}> button 2</button>

      {/* paassgin args to synthetic envent handler */}

      <button onClick={()=> welcome("hello")}>welcome user </button>
      {/*  use arrow fucntion and then call with args and event it help you do things explicitely you cant pass while in reference that will create infifinte redering  */}

      {/* passing event handling to child as props  */}
       
       {/* this just convetion you can write here onsomething = {onhover}  */}
      <Child onMouseEnter= {onHover}  
        
       onClick= {()=>welcomeuser("vinay")}/>

       {/* event propogation  */}
       {/* {capturing  and bubbling } */}

       {/* <div onClick={()=> alert("you clicked on parent")}>
        <button onClick={()=> alert("you clicked on child")}>event propogation</button>
       </div> */}

       {/* event propogation is the process of event bubbling up the dom tree  */}
       {/* event capturing is the process of event bubbling down the dom tree  */}


       {/* to stop event bubbling */}
       {/* <div onClick={()=> alert("you clicked on parent")}>
        <button onClick={(e)=> {e.stopPropagation(); alert("you clicked on child")}}>event propogation</button>
       </div> */}


        {/* capturing */}
          {/* onclickCapture will capture the event and then bubble up the dom tree  */}
       {/* <div onClickCapture={()=> alert("you clicked on parent")}>
      
        <button onClick={(e)=> {e.stopPropagation(); alert("you clicked on child")}}>event propogation</button>
       </div> */}
       
       {/* to stop event capturing */}
       <div onClicCapturek={(e)=> {e.stopPropagation();alert("you clicked on parent")}}>
        <button onClick={(e)=> { alert("you clicked on child")}}>event propogation</button>
       </div>

       
    </div>


  )
}

export default App
