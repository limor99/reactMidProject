import React, {useState, useEffect, useContext} from 'react';

import './UserTodo.css';

import AppContext from '../AppContext';

function UserTodo(props) {
    const appContext = useContext(AppContext);
    const [isCompleted, setIsCompleted] = useState(props.userTodo.completed);

const updateTodo = () =>{
    let todoObj = {
        userId : props.userTodo.userId,
        id: props.userTodo.id,
        title: props.userTodo.title,
        completed: true
    }
    appContext.updateTodoCallback(todoObj);
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
