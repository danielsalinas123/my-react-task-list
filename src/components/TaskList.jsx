import Task from "./Task";

export default function TaskList()
{
    return(
        <div className="listadoTareas">
            <input type="text" placeholder="Añada su tarea nueva"/>
            <button>+</button>
            <Task leyenda="Tarea 1"/>
            <Task leyenda="Tarea 2"/>
            <Task leyenda="Tarea 3"/>
            <Task leyenda="Tarea 4"/>
            <Task leyenda="Tarea 5"/>
        </div>
    );
}