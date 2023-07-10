export default function useManipularLista(listTasks,setListTasks,task,setTask,taskDescription,setTaskDescription,
    numeroTareasPendientes,setNumeroTareasPendientes)
{
    function handleAddTask()
    {
        let tareaAñadida={"tarea":task,"descripcion":taskDescription,"completada":false};
        setListTasks([...listTasks,tareaAñadida]);
        localStorage.setItem("estadoTareas",JSON.stringify([...listTasks,tareaAñadida]));
        setNumeroTareasPendientes(numeroTareasPendientes+1);
        setTask("");
        setTaskDescription("");
    }

    const handleEliminarTodo=()=>
    {
        setListTasks([]);
        localStorage.setItem("estadoTareas",JSON.stringify([]));
        setNumeroTareasPendientes(0);
        setTask("");
        setTaskDescription("");
    }

    const handleActualizarEstadoClickDesdePadre = (nombreTarea,estado)=>
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

    const handleEliminarTareaClickDesdePadre = (nombreTarea)=>
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

    const handleEditarTareaClickDesdePadre = (nombreTarea)=>
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

   return {handleAddTask,handleEliminarTodo,handleActualizarEstadoClickDesdePadre,
    handleEditarTareaClickDesdePadre,handleEliminarTareaClickDesdePadre};
}