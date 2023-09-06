import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import bgImage from "../images/Banner-tareas.png";

export default function Home()
{
    return (
        <Flex direction="column" bgImage={`url(${bgImage})`}  bgRepeat="no-repeat" bgSize="cover" h="85vh" border="1px solid blue" color="white" justify="center" align="center" px="10%">
            <Heading as="h1" fontWeight="bold" fontSize="3em" my="20px" textShadow="2px 2px 5px blue">
                Bienvenido a <i>lista de Tareas App</i></Heading>
            <Text fontStyle="italic" fontSize="2em" textShadow="2px 2px 5px red">Aqui podrás diligenciar tu lista de tareas pendientes y mantenerte al día con el estado de las mismas</Text>
        </Flex>
    );
}