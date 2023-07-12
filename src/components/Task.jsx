export default function Task(props)
{
    const {nombre,descripcion,completada,onAcutalizarEstadoClick,
        onEliminarTareaClick,onEditarTareaClick}=props;

    const handleChange=(event)=>{
        const {value,checked} = event.target;
        onAcutalizarEstadoClick(value,checked);
    }

    const handleEliminarTarea=()=>
        onEliminarTareaClick(nombre);

    const handleEditarTarea=()=>
        onEditarTareaClick(nombre);

    return (
        <li>
            <label>{nombre}</label>

            <span>
                <input type="checkBox"
                value={nombre}
                onChange={handleChange}
                checked={completada}
                />

                <i className="material-icons" title="Editar Tarea"
                onClick={handleEditarTarea}>border_color</i>

                <i className="material-icons" title="Eliminar Tarea"
                onClick={handleEliminarTarea}>delete_forever</i>

                <p><b><i>Descripción: </i></b>{descripcion}</p>
            </span>
        </li>
    );
}