import { Link } from 'react-router-dom';

export default function Menu()
{
    return(
    <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/task-list">Tareas</Link>
          </li>
          <li>
            <Link to="/about-us">Sobre Nosotros</Link>
          </li>
        </ul>
    </nav>
    );
}