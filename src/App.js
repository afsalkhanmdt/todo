import { useEffect, useState } from "react";
import getCall from "./Services/getCall";
import postCall from "./Services/postCall";


function App() {
 const[todo,setTodo]=useState([]);
 const[text,setText]=useState("");
  
 useEffect(() => {
    getTodo()
   }, []);

  const getTodo=()=>{
    getCall("/todoes")
    .then(res=>{
      setTodo(res)
    })
  }

  const saveTodo=()=>{
    postCall("/todoes",{
      Text :text,
      Done:false
    })
    .then(res=>{
      getTodo()
      setText("")
    })
  }

  return (


    <div className="App">

      <h1>Todo</h1>
      <input type="text" onChange={(e)=>setText(e.target.value)} value={text}/>
      <button onClick={saveTodo}>Add</button>
      <ul>
        {todo.map((data,i)=>
        <li key={i}>{data.Text}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
