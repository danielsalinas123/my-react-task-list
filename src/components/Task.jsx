export default function Task(props)
{
    return (
        <div className="task" style={{textAlign:"left"}}>
            <input type="radio"/>
            <label>{props.leyenda}</label>
            <i class="material-icons" style={{float:"right"}}>delete_forever</i> 
            <input type="checkBox" style={{float:"right"}}/>
        </div>
    );
}