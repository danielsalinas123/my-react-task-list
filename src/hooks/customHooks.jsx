export function handleAddTask(task,setTask,listTasks,setListTasks,taskDescription,setTaskDescription,numeroTareasPendientes,setNumeroTareasPendientes)
{
    let tareaAñadida={"tarea":task,"descripcion":taskDescription,"completada":false};
    setListTasks([...listTasks,tareaAñadida]);
    localStorage.setItem("estadoTareas",JSON.stringify([...listTasks,tareaAñadida]));
    setNumeroTareasPendientes(numeroTareasPendientes+1);
    setTask("");
    setTaskDescription("");
}

export const handleEliminarTodo=(setListTasks,setNumeroTareasPendientes,setTask,setTaskDescription)=>
{
     setListTasks([]);
     localStorage.setItem("estadoTareas",JSON.stringify([]));
     setNumeroTareasPendientes(0);
     setTask("");
     setTaskDescription("");
}

export const handleActualizarEstadoClickdesdePadre = 
(nombreTarea,estado,listTasks,setNumeroTareasPendientes,numeroTareasPendientes,setListTasks)=>
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

    export const handleEliminarTareaClickDesdePadre = 
    (nombreTarea,setTask,setTaskDescription,numeroTareasPendientes,setNumeroTareasPendientes,listTasks,setListTasks)=>
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

    export const handleEditarTareaClickDesdePadre=
    (nombreTarea,task,setTask,taskDescription,setTaskDescription,listTasks,setListTasks)=>
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