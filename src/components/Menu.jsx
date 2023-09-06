import { Box, HStack } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

export default function Menu()
{
    return(
    <Box as='nav' bg="gray.200">
        <HStack>
          <Box p="5px"
            _hover={{
              bg:"gray.400",
              color:"white"
            }}
          >
            <Link to="/">Home</Link>
          </Box>
          <Box p="5px"
             _hover={{
              bg:"gray.400",
              color:"white"
            }}
          >
            <Link to="/task-list">Tareas</Link>
          </Box>
          <Box p="5px"
             _hover={{
              bg:"gray.400",
              color:"white"
            }}
          >
            <Link to="/about-us">Sobre Nosotros</Link>
          </Box>
        </HStack>
    </Box>
    );
}