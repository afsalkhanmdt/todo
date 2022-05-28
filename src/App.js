import { useEffect, useState } from "react";
import getCall from "./Services/getCall";
import postCall from "./Services/postCall";
import deleteCall from "./Services/deleteCall";
import deleteButton from "./assets/delete.svg";
import putCall from "./Services/putCall";

function App() {
 const[todo,setTodo]=useState([]);
 const[text,setText]=useState("");
  
 useEffect(() => {
    getTodo()
   }, []);

  const getTodo=()=>{
    getCall("/todoes")
    .then(res=>{
      console.log(res)
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

  const deleteTodo=(Id)=>{
    deleteCall("/todoes/"+Id)
    .then(res=>{
      getTodo()
    })
  }

  const doneTodo=(data)=>{
    putCall( "/todoes/"+data.Id,{
      ...data,
      Done:!data.Done
    })
    .then(res=>{
      getTodo()
    })
  }

  return (


    <div className="App">

      <h1>Todo</h1>
      <input type="text" onChange={(e)=>setText(e.target.value)} value={text}/>
      <button onClick={saveTodo}>Add</button>
      <ul>
        {todo.map((data,i)=>
        <li
          onClick={()=>doneTodo(data)}
          key={i}
          style={{ textDecoration: data.Done ? "line-through" : "none",
          color: data.Done ? "gray" : "black" }}
        >
          {data.Text}
          <img src={deleteButton} alt="Delete" onClick={
            (e)=>{
              e.stopPropagation();
              deleteTodo(data.Id)
            }} />
        </li>
        )}
      </ul>
    </div>
  );
}

export default App;
