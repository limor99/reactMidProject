import React from 'react';

import UserTodo from './UserTodo';


function UserTodos(props) {

    const updateTodo = (update) => {
        props.updateTodoCallback(update)

    }

    return (
        <div>
            Todos - User {props.userId}
        
            {
                 props.userTodos.map(todo =>{
                    return (<div key={todo.id}>
                        <UserTodo userTodo={todo} updateTodoCallback={(update) => updateTodo(update)}/>
                        </div>)
                })
            }
            
        </div>
    )
}

export default UserTodos;
