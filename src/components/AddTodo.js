import React, {useContext, useState} from 'react';

import AppContext from '../AppContext';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from '@material-ui/core/TextField';

import pin from '../images/pin.png';

const useStyles = makeStyles( theme =>({
    
    title:{
        marginLeft: "auto",
        marginRight:"auto",
        paddingRight: "3em"
    },
    todoTitle: {
        padding: "0.5em 0"
    },
    note: {
        width: "14em",
        height: "14em",
        margin: "auto 0"
    },
    newTodo: {
        backgroundColor: "#fffa9b",
     },
     newTodoTitle:{
        padding: "0 0.5em 0 0.75em"
    },
    titleLbl: {
        paddingRight: "1em",
        fontWeight: "bold"
    },
    add:{
        marginLeft: "5.5em"
    },
}));

const AddTodo = (props) =>{
    const appContext = useContext(AppContext);
    const classes = useStyles();
    const [title, setTitle] = useState('');

    const addUserTodo = () =>{
        let obj = {
            userId: props.userId,
            title: title
        }
        
        appContext.addUserTodoCallback(obj);
        setTitle('');
    }

    const cancelNewTodo = () =>{
        appContext.setIsDisplayUserTodoCallback(true);
    }

    return (
        
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
        
    )
}

export default AddTodo
