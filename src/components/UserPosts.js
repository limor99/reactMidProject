import React, {useState, useContext, useEffect} from 'react';

import UserPost from './UserPost';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';

import AppContext from '../AppContext';

import './UserPosts.css';

const useStyles = makeStyles( theme =>({
    userPostsTitle: {
        position: "sticky",
        top: 0,
        textAlign: "center",
        backgroundColor: "#fffa9b",
        borderBottom: "2px solid black",
        zIndex: "9999"
    },
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
    }
    
    
}))

function UserPosts(props) {
    const appContext = useContext(AppContext);
    const [userPostsDisplay, setUserPostsDisplay] = useState([]);
    const [isDisplayUserPosts, setIsDisplayUserPosts] = useState(appContext.isDisplayUserPosts); //display user's posts and not add post form
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const classes = useStyles();
    
    useEffect(() =>{
        let userPostsArr = appContext.userPosts;
        setUserPostsDisplay(userPostsArr);

        setIsDisplayUserPosts(appContext.isDisplayUserPosts)
        
    }, [props.userId]);

    useEffect(() =>{
        setIsDisplayUserPosts(appContext.isDisplayUserPosts)
    }, [appContext.isDisplayUserPosts])

    useEffect(() =>{
        setUserPostsDisplay(appContext.userPosts)
    }, [appContext.userPosts])


    const dispalyAddUserPostForm = () =>{
        appContext.setIsDisplayUserPostsCallback(false);
       
    }

    const cancelNewPost = () =>{
        appContext.setIsDisplayUserPostsCallback(true);
    }

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

    
    return (
        <React.Fragment>
            <div className={isDisplayUserPosts? "displayPosts" : "unDisplayPosts"}>
                <Typography className={classes.userPostsTitle} variant="h6" color="textSecondary" >
                    <div>
                        {props.name}'s Posts, id: {props.userId}
                        <IconButton  className={classes.addBtn} onClick={() => dispalyAddUserPostForm()} aria-label="add post">
                            <AddCircleOutlinedIcon fontSize="large"  />
                        </IconButton> 
                    </div>
                
                </Typography>
                
                {
                    userPostsDisplay.map(post =>{
                        return (<div key={post.id}>
                            <UserPost userPost={post} />
                            </div>)
                    })
                }
            </div>

            <div className={!isDisplayUserPosts? "displayForm" : "unDisplayForm"}>
                <Grid container className="formContainer" direction="column" justify="flex-start" alignItems="center">
                    <Grid item className="titleLine">
                        <Grid container direction="row" justify="flex-start"  alignItems="center">
                            <Grid item>
                               <IconButton  onClick={() => cancelNewPost()} aria-label="cancel">
                                    <CancelIcon fontSize="small"/>
                                </IconButton>
                            </Grid>
                            <Grid item className={classes.title}>
                                <Typography variant="h6" align="center" color="textSecondary" className={classes.todoTitle}>
                                        Add New Post for User {props.name} <br/>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.post}>
                        <Card className={classes.newPost}>
                            
                            <CardContent>
                                <label className={classes.titleLbl}>Title: </label>
                                
                                <TextField className={classes.postTitle} id="outlined-basic" label="" variant="outlined" value={title} onChange={e => setTitle(e.target.value)}/>
                                <br/><br/>
                                <label className={classes.bodyLbl}>Body: </label>
                                <TextField className={classes.postBody} id="outlined-multiline-static" label="" multiline  rows={2} variant="outlined" value={body} onChange={e => setBody(e.target.value)}/>
                                
                            </CardContent>
                            <CardActions className={classes.add} disableSpacing>
                                <PlaylistAddOutlinedIcon  fontSize="large" onClick={() => addUserPost()} />
                                
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

            </div>



        </React.Fragment>
        
    )
}

export default UserPosts;
