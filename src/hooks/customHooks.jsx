export default function useManipularLista(listTasks,setListTasks,task,setTask,taskDescription,setTaskDescription,
    numeroTareasPendientes,setNumeroTareasPendientes,formValidation,setFormValidation)
{
    function handleAddTask(event)
    {
        event.preventDefault();

        let compobarTareaEnLista=false;
        listTasks.find((item)=>{
            if(item.tarea==task)
                compobarTareaEnLista=true;
        });

        if(!compobarTareaEnLista)
        {
            let tareaAñadida={"tarea":task,"descripcion":taskDescription,"completada":false};
            setListTasks([...listTasks,tareaAñadida]);
            localStorage.setItem("estadoTareas",JSON.stringify([...listTasks,tareaAñadida]));
            setNumeroTareasPendientes(numeroTareasPendientes+1);
        }
        else
            alert(`La tarea "${task}" ya se encuentra en la lista de tareas.`);

        setTask("");
        setTaskDescription("");
        setFormValidation(
            {
                ...formValidation,
                task:undefined
            }
        );
    }

    const handleEliminarTodo=()=>
    {
        setListTasks([]);
        localStorage.setItem("estadoTareas",JSON.stringify([]));
        setNumeroTareasPendientes(0);
        setTask("");
        setTaskDescription("");
        setFormValidation(
            {
                ...formValidation,
                task:undefined
            }
        );
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
        setFormValidation(
            {
                ...formValidation,
                task:undefined
            }
        );
    }

    const handleEditarTareaClickDesdePadre = (nombreTarea)=>
   {
        if(task.length==0)
            setFormValidation({
                ...formValidation,
                task:"El campo tareas es obligatorio para modificar la tarea."
            });
        else if(task.length<3)
            setFormValidation({
                ...formValidation,
                task:"El campo tareas debe tener mínimo 3 caracteres"
            });
        else
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

            setTask("");
            setTaskDescription("");
            setFormValidation(
                {
                    ...formValidation,
                    task:undefined
                }
            )
        }
   }

   function ComprobarCampoTareas(value)
   {
    if(value.length==0)
    setFormValidation(
        {
            ...formValidation,
            task:"El campo tareas es obligatorio"
        }
    );
    else if(value.length<3)
        setFormValidation(
            {
            ...formValidation,
                task:"El campo tareas debe tener mínimo 3 caracteres"
            }
        )
    else
        setFormValidation(
            {
                ...formValidation,
                task:""
            }
        );
    setTask(value);
   }

   return {handleAddTask,handleEliminarTodo,handleActualizarEstadoClickDesdePadre,
    handleEditarTareaClickDesdePadre,handleEliminarTareaClickDesdePadre,ComprobarCampoTareas};
}