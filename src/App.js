
import './App.css';
import axios from'axios'
import {useForm} from 'react-hook-form'
import {useEffect, useState} from 'react'

function App() {
  const [todos,setTodos]=useState([])
  const { register,formState: { errors }, handleSubmit } = useForm()
  const onSubmit = (data) => 
  {
    const addUse=JSON.parse(JSON.stringify(todos))
    addUse.push({id:todos.length+1,title:data.title,completed:data.status === 'completed'})
    setTodos(addUse)
  }
 

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(res=>{
      const arr = res.data.slice(0,10)
      setTodos(arr)
    })
    .catch(error=>console.log(error))
  },[])

  const handleDelete=(id)=>{
    let del=JSON.parse(JSON.stringify(todos))
    let newDel=del.filter((e)=>{
      return e.id !==id;
    })
    setTodos(newDel)
    
  }
  
  return (
    <div className="App container">
      <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >CREATE</button>
      <table>
        
        <tr>
        <th>ID</th>
        <th>TITLE</th>
        <th>STATUS</th>
        <th>ACTION</th>
        </tr>
      
        {
          todos.map((todo)=>{
            return(
              
            <tr key={todo.id}>  
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? "Completed" : "Not Completed"}</td>
              <td>
              
              <button className='btn btn-success m-2'>UPDATE</button>
              <button onClick={()=>handleDelete(todo.id)} className='btn btn-danger'>DELETE</button>
              </td>
            </tr>
      
            )
          })
        }
      </table>
      {/* <!-- Modal --> */}

<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Enter the DATA to add</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

    <form onSubmit={handleSubmit(onSubmit)}>
    <input className='m-2' placeholder='Title'{...register("title",  { required: true, maxLength: 20 })} />
      {
        errors.title?.type ==='required' &&(
          <p>Title is required</p>
        )
      }

      <input  placeholder='Status'{...register("status", { pattern: /^[A-Za-z]+$/i })} /> <br />
      {
        errors.status?.type ==='pattern' &&(
          <p>Status should follow the pattern</p>
        )
      }
   <input type="submit" data-bs-dismiss="modal"/>

        
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      
      </div>
    </div>
  </div>
</div>
    </div>
   
  );
}


export default App;
