import React, {useState, useContext, useEffect} from 'react';

import UserTodo from './UserTodo';

import AppContext from '../AppContext';

import './UserTodos.css';

function UserTodos(props) {
    const appContext = useContext(AppContext);
    const [userTodosDisplay, setUserTodosDisplay] = useState([]);
    const [isUserTodosCompleted, setIsUserTodosCompleted] = useState(false)
    const [isDisplayUserTodos, setIsDisplayUserTodos] = useState(appContext.isDisplayUserTodos); //display user's todos and not add todo form
    //const [isDisplayAddForm, setIsDisplayAddForm] = useState(false);    //display add todo form and not user's todos
    const [title, setTitle] = useState('');
    
    useEffect(() =>{
        let userTodosArr = appContext.userTodos;
        setUserTodosDisplay(userTodosArr);

        setIsDisplayUserTodos(appContext.isDisplayUserTodos)
        
    }, [props.userId]);


    const addUserFormTodo = () =>{
        setIsDisplayUserTodos(false);
    }

    const cancelNewTodo = () =>{
        setIsDisplayUserTodos(true);
    }

    const addUserTodo = () =>{
        let obj = {
            userId: props.userId,
            title: title
        }
        appContext.addUserTodoCallback(obj);
    }


    return (
        <div>
            <div className={isDisplayUserTodos? "displayTodos" : "unDisplayTodos"}>
                Todos - User {props.userId}  
                <input type="button" value="Add" onClick={() => addUserFormTodo()}/>
            
                {
                    userTodosDisplay.map(todo =>{
                        return (<div key={todo.id}>
                            <UserTodo userTodo={todo} />
                            </div>)
                    })
                }
            </div>

            <div className={!isDisplayUserTodos? "displayForm" : "unDisplayForm"}>
                New Todo - User {props.userId} <br/>
                Title: <input type="text" onChange={e => setTitle(e.target.value)} /><br/>

                <input type="button" value="Cancel" onClick={() => cancelNewTodo()}/>
                <input type="button" value="Add" onClick={() => addUserTodo()}/>
            </div>
            
        </div>
    )
}

export default UserTodos;
