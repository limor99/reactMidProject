import React, {useState, useContext, useEffect} from 'react';

import UserTodo from './UserTodo';

import AppContext from '../AppContext';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import pin from '../images/pin.png';

const useStyles = makeStyles( theme =>({
    
    todoTitle: {
        padding: "0.5em 0"
    },
    newTodo: {
       backgroundColor: "#fffa9b",
    },
    titleLbl: {
        paddingRight: "1em"
    },
    
    title:{
        marginLeft: "auto",
        marginRight:"auto",
        paddingRight: "3em"
    },
    note: {
        width: "14em",
        height: "14em",
        margin: "auto 0"
    },
    userTodosTitle: {
        position: "sticky",
        top: 0,
        textAlign: "center",
        backgroundColor: "#fffa9b",
        borderBottom: "2px solid black",
        zIndex: "9999"
    },
    newTodoTitle:{
        padding: "0 0.5em 0 0.75em"
    },
    add:{
        marginLeft: "5.5em"
    },
  
    
}))



function UserTodos(props) {
    const appContext = useContext(AppContext);
    const [userTodosDisplay, setUserTodosDisplay] = useState([]);
    //const [isUserTodosCompleted, setIsUserTodosCompleted] = useState(false)
    const [isDisplayUserTodos, setIsDisplayUserTodos] = useState(appContext.isDisplayUserTodos); //display user's todos and not add todo form
    const [title, setTitle] = useState('');

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

    const cancelNewTodo = () =>{
        appContext.setIsDisplayUserTodoCallback(true);
    }

    const addUserTodo = () =>{
        let obj = {
            userId: props.userId,
            title: title
        }
        
        appContext.addUserTodoCallback(obj);
        setTitle('');
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
                <Grid container className="formContainer" direction="column" justify="flex-start" alignItems="center">
                    <Grid item className="titleLine">
                        <Grid container direction="row" justify="flex-start"  alignItems="center">
                            <Grid item>
                               <IconButton  onClick={() => cancelNewTodo()} aria-label="cancel">
                                    <CancelIcon fontSize="small"/>
                                </IconButton>
                            </Grid>
                            <Grid item className={classes.title}>
                                <Typography variant="h6" align="center" color="textSecondary" className={classes.todoTitle}>
                                        Add New Todo for {props.name} <br/>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.note}>
                        <Card className={classes.newTodo}>
                            
                            <img className="pin" src={pin} alt="pin" />
            
                            <CardContent className={classes.newTodoTitle}>
                                <label className={classes.titleLbl}>Title: </label>
                                <TextField id="outlined-multiline-static" label="" multiline rows={3} variant="outlined" value={title} onChange={e => setTitle(e.target.value)}/>
                                <br/>
                                
                            </CardContent>
                            <CardActions className={classes.add} disableSpacing>
                                <PlaylistAddOutlinedIcon  fontSize="large" onClick={() => addUserTodo()} />
                                
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            
        </React.Fragment>
    )
}

export default UserTodos;
