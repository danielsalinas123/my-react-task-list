import { HStack, ListItem } from "@chakra-ui/layout";

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
        <ListItem mb={3} w="50vw" border="1px dashed black" mx="auto">
            <HStack justify="center" spacing={5} mb={2}>
                <label>{nombre}</label>
                <input type="checkBox"
                value={nombre}
                onChange={handleChange}
                checked={completada}
                />

                <i className="material-icons" title="Editar Tarea"
                onClick={handleEditarTarea}>border_color</i>

                <i className="material-icons" title="Eliminar Tarea"
                onClick={handleEliminarTarea}>delete_forever</i>
            </HStack>
                <p><b><i>Descripción: </i></b>{descripcion}</p>
        </ListItem>
    );
}