import React, {useState, useContext, useEffect} from 'react';

import UserTodo from './UserTodo';

import AppContext from '../AppContext';

function UserTodos(props) {
    const appContext = useContext(AppContext);
    const [userTodosDisplay, setUserTodosDisplay] = useState([]);
    
    useEffect(() =>{
        let userTodosArr = appContext.userTodos;
        setUserTodosDisplay(userTodosArr);
        
    }, [props.userId])
/*
    useEffect(() =>{
        let userTodosArr = appContext.usersTodos.filter(item => item.userId === props.userId);
        setUserTodosDisplay(userTodosArr);
        
    }, [appContext.usersTodos])
   */ 
    return (
        <div>
            Todos - User {props.userId}
        
            {
                 userTodosDisplay.map(todo =>{
                    return (<div key={todo.id}>
                        <UserTodo userTodo={todo} />
                        </div>)
                })
            }
            
        </div>
    )
}

export default UserTodos;
