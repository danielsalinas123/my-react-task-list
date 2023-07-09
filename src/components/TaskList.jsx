import { useEffect, useState } from "react";
import Task from "./Task";

export default function TaskList()
{
    const [listTasks,setListTasks]=useState([]);
    const [task,setTask]=useState("");
    const [taskDescription,setTaskDescription]=useState("");
    const [numeroTareasPendientes,setNumeroTareasPendientes]=useState(0);

    useEffect(()=>{
        const localStorageData = localStorage.getItem("estadoTareas");
        const storedTasks = JSON.parse(localStorageData);

        if(storedTasks!=null)
        {
            setListTasks(storedTasks);
            setNumeroTareasPendientes(storedTasks.filter(item=>item.completada==false).length);
        }
    },[]);

    function handleAddTask()
    {
        let tareaAñadida={"tarea":task,"descripcion":taskDescription,"completada":false};
        setListTasks([...listTasks,tareaAñadida]);
        localStorage.setItem("estadoTareas",JSON.stringify([...listTasks,tareaAñadida]));
        setNumeroTareasPendientes(numeroTareasPendientes+1);
        setTask("");
        setTaskDescription("");
    }

    const handleActualizarEstadoClick = (nombreTarea,estado)=>
    {
        let newListTask=[...listTasks];

        newListTask.filter(item=>{
            if(item.tarea==nombreTarea)
            {
                item.completada=estado;
                if(estado)
                    setNumeroTareasPendientes(numeroTareasPendientes-1);
                else
                    setNumeroTareasPendientes(numeroTareasPendientes+1);
            }
        });
           
        setListTasks(newListTask);
        localStorage.setItem("estadoTareas",JSON.stringify(newListTask));
    }

    const handleEliminarTareaClick = (nombreTarea)=>
    {
        let auxTareaPediente=false;
        listTasks.filter(item=>{
            if(item.tarea==nombreTarea)
                if(item.completada==false)
                    auxTareaPediente=true;
        });

        if(auxTareaPediente)
            setNumeroTareasPendientes(numeroTareasPendientes-1);

        let newListTask=listTasks.filter(item => item.tarea!=nombreTarea);
        setListTasks(newListTask);
        localStorage.setItem("estadoTareas",JSON.stringify(newListTask));

        setTask("");
        setTaskDescription("");
    }

   const handleEliminarTodo =()=>
   {
        setListTasks([]);
        localStorage.setItem("estadoTareas",JSON.stringify([]));
        setNumeroTareasPendientes(0);
        setTask("");
        setTaskDescription("");
   }

   const handleEditarTareaClick=(nombreTarea)=>
   {
        if(task!="" && taskDescription!="")
        {
            let newListTask=[...listTasks];

            newListTask.filter(item=>{
                if(item.tarea==nombreTarea)
                {
                    item.tarea=task;
                    item.descripcion=taskDescription;
                }
            });

            setListTasks(newListTask);
            localStorage.setItem("estadoTareas",JSON.stringify(newListTask));
        }
        else
            alert("Ambos campos de texto son obligatorios para editar la tarea");

        setTask("");
        setTaskDescription("");
   }

    return(
        <div className="listadoTareas">

            <input type="text" value={task}
            onChange={(e)=>setTask(e.target.value)}
            placeholder="Añada su tarea nueva"/>

            <button onClick={handleAddTask}>+</button>
            <br/><br/>
            
            <textarea rows="3" cols="25"
            value={taskDescription}
            placeholder="Describa la tarea..."
            onChange={(e)=>setTaskDescription(e.target.value)}
            style={{resize:"none"}}
            />

            <ol>
            {
                listTasks.map((element)=>{
                    return <Task key={element.tarea}
                            nombre={element.tarea}
                            descripcion={element.descripcion}
                            completada={element.completada}
                            onAcutalizarEstadoClick={handleActualizarEstadoClick}
                            onEliminarTareaClick={handleEliminarTareaClick}
                            onEditarTareaClick={handleEditarTareaClick}
                            />;
                })
            }
            <li></li>
            </ol>

            <div style={{marginTop:"20px"}}>
                <label>Tienes {numeroTareasPendientes} tareas pendientes</label>
                <button onClick={handleEliminarTodo}>Limpiar Todo</button>
            </div>
        </div>
    );
}