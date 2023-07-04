export default function Task(props)
{
    return (
        <div className="task">
            <input type="radio"/>
            <label>{props.leyenda}</label>
            <input type="checkBox"/>
            <i class="material-icons">delete_forever</i> 
        </div>
    );
}