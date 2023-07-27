import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Menu from './components/Menu';
import TaskList from "./components/TaskList"
import SobreNosotros from './components/SobreNosotros';

function App()
{
  return (
    <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/task-list' element={<TaskList/>}/>
        <Route path='/about-us' element={<SobreNosotros/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
