import { useEffect, useState } from "react";
import Task from "./Task";
import useManipularLista from "../hooks/customHooks";

export default function TaskList()
{
    const [listTasks,setListTasks]=useState([]);
    const [task,setTask]=useState("");
    const [taskDescription,setTaskDescription]=useState("");
    const [numeroTareasPendientes,setNumeroTareasPendientes]=useState(0);

    //Validación del formulario
    const [formValidation,setFormValidation]=useState({task:undefined});
    const isFormValid = Object.keys(formValidation).every(
        key=>formValidation[key]=="");

    //hook esterno
    const {handleAddTask,handleEliminarTodo,handleActualizarEstadoClickDesdePadre,
        handleEditarTareaClickDesdePadre,handleEliminarTareaClickDesdePadre,ComprobarCampoTareas} = 
        useManipularLista(listTasks,setListTasks,task,setTask,taskDescription,setTaskDescription,
            numeroTareasPendientes,setNumeroTareasPendientes,formValidation,setFormValidation);

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

    function handleTaskChange(event)
    {
        const {value}=event.target;
        ComprobarCampoTareas(value);
    }

    const handleActualizarEstadoClick = (nombreTarea,estado)=>
        handleActualizarEstadoClickDesdePadre(nombreTarea,estado);


    const handleEliminarTareaClick = (nombreTarea)=>
        handleEliminarTareaClickDesdePadre(nombreTarea);

   const handleEditarTareaClick=(nombreTarea)=>
        handleEditarTareaClickDesdePadre(nombreTarea);

   return(
        <div className="listadoTareas">

            <h1>Lista de tareas</h1>

            <form className="formTaskList">
                <input type="text" value={task}
                onChange={handleTaskChange}
                placeholder="Añada su tarea nueva"/>
                
                <button disabled={!isFormValid}
                onClick={handleAddTask}
                >+</button>
                
                <br/><span style={{color:"red"}}>{formValidation.task}</span>
                
                <br/>
                <textarea rows="3" cols="25"
                value={taskDescription}
                placeholder="Describa la tarea..."
                onChange={(e)=>setTaskDescription(e.target.value)}
                style={{resize:"none"}}
                />
            </form>

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