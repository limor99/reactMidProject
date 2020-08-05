import React, {useState, useContext} from 'react';

import AppContext from '../AppContext';

import {makeStyles} from '@material-ui/core/styles';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import CardActions from "@material-ui/core/CardActions";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles( theme =>({
    title:{
        marginLeft: "auto",
        marginRight:"auto",
        paddingRight: "3em"
    },
    post: {
        margin: "auto 0"
    },
    newPost: {
        backgroundColor: "#fffa9b",
    },
    captionLbl:{
        fontWeight: "bold"
    },
    postTitle:{
        marginLeft: "0.9em",
        width: "80%"

    },
    postBody:{
        marginLeft: "0.5em",
        width: "80%"

    },
    add:{
        marginLeft: "7.5em"
    },
}))

const AddPost = (props) =>{
    const appContext = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const classes = useStyles();

    const addUserPost = () =>{
        let obj = {
            userId: props.userId,
            title: title,
            body: body
        }
        
        appContext.addUserPostCallback(obj);
        setTitle('');
        setBody('');
    }

    const cancelNewPost = () =>{
        appContext.setIsDisplayUserPostsCallback(true);
    }

    return (
        <Grid container className="formContainer" direction="column" justify="flex-start" alignItems="center">
                    <Grid item className="titleLine">
                        <Grid container direction="row" justify="flex-start"  alignItems="center">
                            <Grid item>
                               <IconButton  onClick={() => cancelNewPost()} aria-label="cancel">
                                    <CancelIcon fontSize="small"/>
                                </IconButton>
                            </Grid>
                            <Grid item className={classes.title}>
                                <Typography variant="h6" align="center" color="textSecondary">
                                        Add New Post for User {props.name} <br/>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.post}>
                        <Card className={classes.newPost}>
                            
                            <CardContent>
                                <label className={classes.captionLbl}>Title: </label>
                                
                                <TextField className={classes.postTitle} id="outlined-basic" label="" variant="outlined" value={title} onChange={e => setTitle(e.target.value)}/>
                                <br/><br/>
                                <label className={classes.captionLbl}>Body: </label>
                                <TextField className={classes.postBody} id="outlined-multiline-static" label="" multiline  rows={2} variant="outlined" value={body} onChange={e => setBody(e.target.value)}/>
                                
                            </CardContent>
                            <CardActions className={classes.add} disableSpacing>
                                <PlaylistAddOutlinedIcon  fontSize="large" onClick={() => addUserPost()} />
                                
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
    )
}

export default AddPost
