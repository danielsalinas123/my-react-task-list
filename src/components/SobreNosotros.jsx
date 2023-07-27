import imagenGeneral from "../images/imagen-general.png";
import formularioTareas from "../images/formulario-tareas.png";
import editarTarea from "../images/editar-tarea.png";

export default function SobreNosotros()
{
    return(
        <div style={{textAlign:"justify"}}>
            <h1>Guía de Usuario</h1>
            <h2>Indicaciones generales</h2>
            <p>La aplicación te permite añadir tareas nuevas y listarlas para mantenerte al día con su estado, ya sea que estén pendientes o que estén completadas y quieras conservarlas en la lista para tener un registro de lo realizado. La siguiente imagen ilustra como se ve la aplicación con 3 tareas añadidas:</p>
            <img src={imagenGeneral} style={{border:"1px solid black"}}/>
            <p>Cada tarea tendrá un nombre y una descripción, esta última es opcional. El checkbox indica el estado de la tarea, es decir, si esta chuleado significa que la tarea ha sido completada y si no lo esta significa que esta pendiente; para cambiar el estado de completada a pendiente y viceversa basta con darle click al respectivo checkbox.</p>
            <p>Los íconos del lápiz y de la papelera que aparecen en cada tarea sirven para editar y eliminar la tarea respectivamente.</p>
            <p>La última línea luego de la lista de tareas indica dinámicamente cuantas tareas están pendientes, se hace contando cuantos checkbox están sin chulear. En la imagen vemos que se indica que 2 tareas están pendientes dado que hay 2 checkbox sin chulear.</p>
            <p>El botón "limpiar todo" elimina todas las tareas almacenadas en la lista dejandola en blanco.</p>
            <h2>Añadir una Tarea</h2>
            <p>Para añadir una tarea nueva se deben diligenciar los campos de texto correspondientes al nombre de la tarea y su descripción (optativamente) y presionar el botón con el signo ➕.</p>
            <p>Estos elementos se ecuentran dentro de un formulario para verificar que la tarea que se va a añadir es válida; se realizan 2 validaciones, la primera consiste en verificar que el campo "añadir tarea nueva" esté diligenciado, dado que es requerido, y la segunda consiste en verificar que el respectivo campo cuente con al menos 3 caracteres; en el caso de que estas condiciones no se cuemplan aparecera un texto rojo debajo del campo indicando cual es el error. El botón ➕ estará deshabilitado mientras no se cumplan las validaciones para evitar añadir tareas inválidas. La siguiente imagen ilustra lo descrito:</p>
            <img src={formularioTareas}/>
            <p>Una vez diligenciados y verificados los campos podrá añadirse la tarea nueva, la aplicación se rederizará de nuevo inmediatamente mostrando la tarea añadida en la lista. Esto se logra gracias a la biblioteca <b><i>React.js</i></b> que se usó para desarrollar toda la aplicación, dicha biblioteca cuenta con variables de estado que rendizan nuevamente la aplicación cada vez que su valor cambia, para este caso se almacenó la lista de tareas en una variable de estado, por tal motivo, cuando se añada un nuevo elemento a la lista, inmediatamente se renderizará de nuevo la aplicación mostrando el contenido actual.</p>
            <p>Se realiza una tercera validación que consiste en verificar que la tarea que se va a añadir no se encuentre ya en la lista, por 2 motivos, el primero es porque no tiene sentido tener la misma tarea repetida y el segundo es porque el identificador de las tareas es el nombre, entonces si 2 tareas tienen el mismo identificador, la aplicación podría generar resultados inesperados cuando se va a editar o eliminar dicha tarea dado que la función <b><i>filter</i></b> de <i>JavaScript</i> que se usa para buscar la tarea indicada debe encontrar una única coincidencia dado que dichas acciones solo se deben aplicar a la tarea indicada.</p>
            <p>En el caso de que se intente añadir una tarea repetida, la aplicación mostrará un mensaje de error y no la añadirá.</p>
            <h2>Editar una tarea</h2>
            <p>Para editar una tarea se deben diligenciar los campos "añadir tarea nueva" y "describa la tarea" (optativamente) y luego precionar en el ícono del lápiz de la tarea que se desea modificar. Se haran las validaciones antes mencionadas y en caso de que se cumplan, la tarea indicada se modificará tomando en el nombre y la descripción diligenciados en los campos respectivos. La siguiente imagen ilustra lo que ocurre cuando se intenta modificar una tarea con datos inválidos: </p>
            <img src={editarTarea} style={{border:"1px solid black"}}/>
            <p>En la imagen se intentó modificar la "Tarea 1" precionando el ícono del lápiz, sin embargo, el campo "añadir tara nueva" esta vacío, razón por la cual no se modificó y se desplegó el mensaje de error.</p>
            <h2>Eliminar tareas</h2>
            <p>Para eliminar una tarea basta con presionar el ícono de la papelera y la tarea indicada se eliminará inmediatamente.</p>
            <p>Para eliminar todas las tareas se debe presionar el botón "limpiar todo" y la lista de tareas se asignará a una lista vacía, eliminando de facto todas las tareas.</p>
            <h2>Almacenamiento</h2>
            <p>La variable de estado que contiene la lista de tareas se almacena localmente en la memoria del dispositivo, así pues la aplicación puede funcionar sin conexión a internet, además siempre que se carga la aplicación, el componente que contiene la lista de tareas actualiza el valor de la variable de estado "lista de tareas" con los datos almacenados en el <i>localstorage</i>, por lo tanto, aunque se cierre o se recargue el navegador, la aplicación obtendrá los datos de la lista de tareas tal como el usuario los dejo y podrá trabajar con ella desde ese mismo punto.</p>
            <p>Todas las acciones referentes a las tareas (añadir, modificar y eliminar) se almacenan en la variable de estado "lista de tareas", asi pues, cualquier cambio genera una nueva renderización y por lo tanto se ve reflejado inmediatamente en la interfaz de usuario, además, cada una de estas acciones tambien se almacenan en el <i>localstorage</i>, es decir, toda modificación que sufrá la lista de tareas se almacena inmediatamente en el <i>localstorage</i> para asegurarse que la información actual siempre este almacenada.</p>
        </div>
    );
}