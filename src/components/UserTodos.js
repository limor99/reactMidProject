import React, {useState, useContext, useEffect} from 'react';

import UserTodo from './UserTodo';
import AddTodo from './AddTodo';


import AppContext from '../AppContext';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from '@material-ui/core/styles';

import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

const useStyles = makeStyles( theme =>({
    userTodosTitle: {
        position: "sticky",
        top: 0,
        textAlign: "center",
        backgroundColor: "#fffa9b",
        borderBottom: "2px solid black",
        zIndex: "9999"
    },
}))

function UserTodos(props) {
    const appContext = useContext(AppContext);
    const [userTodosDisplay, setUserTodosDisplay] = useState([]);
    const [isDisplayUserTodos, setIsDisplayUserTodos] = useState(appContext.isDisplayUserTodos); //display user's todos and not add todo form
    

    const classes = useStyles();
    
    useEffect(() =>{
        let userTodosArr = appContext.userTodos;
        setUserTodosDisplay(userTodosArr);

        setIsDisplayUserTodos(appContext.isDisplayUserTodos)
        
    }, [props.userId]);

    useEffect(() =>{
        setIsDisplayUserTodos(appContext.isDisplayUserTodos)
    }, [appContext.isDisplayUserTodos])

    useEffect(() =>{
        setUserTodosDisplay(appContext.userTodos)
    }, [appContext.userTodos])


    const dispalyAddUserTodoForm = () =>{
        appContext.setIsDisplayUserTodoCallback(false);
       
    }

    return (
        <React.Fragment>
            <div className={isDisplayUserTodos? "display" : "notDisplay"}>
                <Typography className={classes.userTodosTitle} variant="h6" color="textSecondary" >
                    <div>
                        {props.name}'s Todos, id: {props.userId}
                        <IconButton  className={classes.addBtn} onClick={() => dispalyAddUserTodoForm()} aria-label="add todo">
                            <AddCircleOutlinedIcon fontSize="large"  />
                        </IconButton> 
                        
                    </div>
                </Typography>
               
                {
                    userTodosDisplay.map(todo =>{
                        return (<div key={todo.id}>
                            <UserTodo userTodo={todo} />
                            </div>)
                    })
                }
            </div>

            <div className={!isDisplayUserTodos? "displayForm" : "notDisplay"}>
                <AddTodo userId={props.userId}/>
            </div>
            
        </React.Fragment>
    )
}

export default UserTodos;
