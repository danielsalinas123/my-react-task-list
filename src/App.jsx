import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import TaskList from "./components/TaskList"
import SobreNosotros from './components/SobreNosotros';
import { Box } from '@chakra-ui/layout';


function App()
{
  return (
    <Box width="90vw" textAlign="center" border="1px solid black" margin="5vh auto" fontFamily="times new roman">
      <BrowserRouter>
        <Menu/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/task-list' element={<TaskList/>}/>
          <Route path='/about-us' element={<SobreNosotros/>}/>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
