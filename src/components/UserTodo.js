import React, {useState, useEffect, useContext} from 'react';

import pin from '../images/pin.png';

import {makeStyles} from '@material-ui/core/styles';

import AppContext from '../AppContext';
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles( theme =>({
    display: {
        display: "block",
        textAlign: "center"
    },
    todo:{
        padding: "0 1em 1em 1em",
        margin: "1em 5em 1.5em 5em",
        backgroundColor: "#fffa9b",
        fontSize: "15pt"
    }
    
}))

function UserTodo(props) {
    const appContext = useContext(AppContext);
    const [isCompleted, setIsCompleted] = useState(props.userTodo.completed);
    const classes = useStyles();

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
        <div className={classes.todo}>
            <img className="pin" src={pin} />
            Title: {props.userTodo.title}<br/>
            Completed: {isCompleted.toString()}
            <div className={isCompleted? "notDisplay" : classes.display}>
               
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<CheckCircleIcon />}
                    onClick={() => updateTodo()} aria-label="Mark Completed"
                >
                    Completed
                </Button>
                
            </div>
        </div>
    )
}

export default UserTodo
