import { useEffect, useState } from "react";
import Task from "./Task";
import { handleAddTask,handleEliminarTodo,
        handleActualizarEstadoClickdesdePadre,
        handleEliminarTareaClickDesdePadre,
        handleEditarTareaClickDesdePadre } from "../hooks/customHooks";

export default function TaskList()
{
    const [listTasks,setListTasks]=useState([]);
    const [task,setTask]=useState("");
    const [taskDescription,setTaskDescription]=useState("");
    const [numeroTareasPendientes,setNumeroTareasPendientes]=useState(0);

    useEffect(()=>
    {
        const localStorageData = localStorage.getItem("estadoTareas");
        const storedTasks = JSON.parse(localStorageData);

        if(storedTasks!=null)
        {
            setListTasks(storedTasks);
            setNumeroTareasPendientes(storedTasks.filter(item=>item.completada==false).length);
        }
    },[]);

    const handleActualizarEstadoClick = (nombreTarea,estado)=>
        handleActualizarEstadoClickdesdePadre(nombreTarea,estado,listTasks,
            setNumeroTareasPendientes,numeroTareasPendientes,setListTasks);


    const handleEliminarTareaClick = (nombreTarea)=>
        handleEliminarTareaClickDesdePadre(nombreTarea,setTask,setTaskDescription,
            numeroTareasPendientes,setNumeroTareasPendientes,listTasks,setListTasks);

   const handleEditarTareaClick=(nombreTarea)=>
        handleEditarTareaClickDesdePadre(nombreTarea,task,setTask,taskDescription,
            setTaskDescription,listTasks,setListTasks);

   return(
        <div className="listadoTareas">

            <input type="text" value={task}
            onChange={(e)=>setTask(e.target.value)}
            placeholder="Añada su tarea nueva"/>

            <button onClick={()=>
                handleAddTask(task,setTask,listTasks,setListTasks,taskDescription,
                    setTaskDescription,numeroTareasPendientes,setNumeroTareasPendientes)
                }>+</button>
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
                <button onClick={()=>
                    handleEliminarTodo(setListTasks,setNumeroTareasPendientes,setTask,setTaskDescription)
                    }>Limpiar Todo</button>
            </div>
        </div>
    );
}