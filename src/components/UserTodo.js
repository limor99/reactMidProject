import React, {useState, useEffect} from 'react';

import './UserTodo.css';

function UserTodo(props) {
const [isCompleted, setIsCompleted] = useState(props.userTodo.completed);


const updateTodo = () =>{
//    props.updateTodoCallback(true);
    setIsCompleted(!isCompleted);
   
}


    return (
        <div className="todo">
            Title: {props.userTodo.title}<br/>
            Completed: {isCompleted.toString()}
            <div className={isCompleted? "notDisplay" : "display"}>
                <input type="button" value="Mark Completed" onClick={() => updateTodo()}/>
            </div>
        </div>
    )
}

export default UserTodo
