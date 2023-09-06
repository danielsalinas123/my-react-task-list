import { useEffect, useState } from "react";
import Task from "./Task";
import useManipularLista from "../hooks/customHooks";
import { Box, Flex, Heading, Spacer, Input, Button, Textarea, OrderedList, ListItem, HStack, useColorMode, useColorModeValue } from "@chakra-ui/react";

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

    const {toggleColorMode} = useColorMode();
    const formBackground = useColorModeValue("gray.200","gray,900");

   return(
        <Box>

            <Heading as="h1" fontSize="3em" fontStyle="italic" fontWeight="bold">
                Lista de tareas</Heading>

            <Flex as="form" alignItems="center" justifyContent="center">
                <Flex direction="column" bg={formBackground} p="12px" rounded="6px">
                    <Heading mb={3}>Tarea</Heading>
                    <Input placeholder="Ingrese la tarea nueva" variant="filled" mb={0} value={task} onChange={handleTaskChange}
                    />

                    <Spacer color="white">{formValidation.task}</Spacer>
                    
                    <Textarea rows="3" cols="25" value={taskDescription} placeholder="Describa la tarea..."    onChange={(e)=>setTaskDescription(e.target.value)} resize="none" mt={5}
                    />

                    <Button isDisabled={!isFormValid}
                    onClick={handleAddTask} mt={3} color="white" border="1px solid black" bg="gray.600"
                    _disabled={{
                        bg:"gray.200",
                    }}
                    >Añadir</Button>

                    <Button onClick={toggleColorMode} mt={3} color="white" border="1px solid black" bg="gray.600"
                    _disabled={{
                        bg:"gray.200",
                    }}>Toggle Color</Button>
                </Flex>
            </Flex>

            <OrderedList m="10px 0" listStylePos="inside">
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
            <ListItem mb={3} w="50vw" border="1px dashed black" mx="auto"></ListItem>
            </OrderedList>

            <HStack spacing={10} my={10} justify="center">
                <label>Tienes {numeroTareasPendientes} tareas pendientes</label>
                <Button onClick={handleEliminarTodo} border="1px solid black" borderRadius={3} bg="gray.200" p={1} _hover={{bg:"gray.600",color:"white"}}
                >Limpiar Todo</Button>
            </HStack>
        </Box>
    );
}