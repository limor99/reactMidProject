import React, {useState, useEffect, useContext} from 'react';

import userUtils from '../utils/UsersUtil.js';

import AppContext from '../AppContext.js';


import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';




const useStyles = makeStyles( theme =>({
    title:{
        
        textAlign: "center",
        paddingBottom: "0.5em",
        textDecoration: "underline",
    },
    completedTodos: {
        borderLeft: "3px solid green",
        marginBottom: "1em",
        backgroundColor: "lightcyan"
        
    },
    uncompletedTodos: {
        borderLeft: "3px solid red",
        marginBottom: "1em",
        backgroundColor: "lightcyan"
       
    },
    btnSpacing: {
        marginLeft: "auto",
    },
    userContent:{
        paddingBottom: "0"
    },
    userAction:{
        paddingTop: "0"
    },
    user:{
        backgroundColor: "lightcyan"
    },
    clickedUser:{
        marginBottom: "1px",
        borderLeft: "5px solid #F7EF64"
      }
    
}))

function User(props) {
    const appContext = useContext(AppContext);
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [street, setStreet] = useState(props.user.address !== undefined ? props.user.address.street : '');
    const [city, setCity] = useState(props.user.address !== undefined ? props.user.address.city : '');
    const [zipcode, setZipcode] = useState(props.user.address !== undefined ? props.user.address.zipcode : '');
    const [isDisplayOtherData, setIsDisplayOtherData] = useState(false);
    const [isClickedUser, setIsClickedUser] = useState(false);
    const [isAllCompletedTodos, setIsAllCompletedTodos] = useState(false);

    const classes = useStyles();
    
    useEffect(() => {
        if(appContext.clickedUserArr.length > 0){
            let userId = props.user.id;
            let isClickedArr = appContext.clickedUserArr;
            let userIndex = isClickedArr.findIndex(item => item.userId === userId);
            setIsClickedUser(isClickedArr[userIndex].isClicked)
        }
        
    }, [appContext.clickedUserArr])

    useEffect(() =>{
        if(appContext.isUserTodosCompletedArr.length > 0){
            let userId = props.user.id;
            let isCompletedArr = appContext.isUserTodosCompletedArr;
            let userIndex = isCompletedArr.findIndex(item => item.userId === userId);
            setIsAllCompletedTodos(isCompletedArr[userIndex].isComplededTodos);
        }
    }, [appContext.isUserTodosCompletedArr])

    const getUserTodosAndPosts = () =>{
        let userId = props.user.id;
        let userName = props.user.name;
       
        appContext.getUserTodosAndPostsCallback(userId, userName);
    }

         const updateUser = () =>{
            let userId = props.user.id;
            let updateObj = {
                id: userId,
                name: name,
                email: email,
                street: street,
                city: city,
                zipcode: zipcode
            }
            appContext.updateCallback(updateObj);
            
        }
    
        const deleteUser = () =>{
            let userId = props.user.id;
            appContext.deleteCallback(userId);
        }

    return (
        <React.Fragment>
        <Card variant="outlined" className={isAllCompletedTodos ? classes.completedTodos : classes.uncompletedTodos}>
            <CardContent className={classes.userContent}>
            
                <div className={isClickedUser? classes.clickedUser : classes.user}>
                    <div class="container">
                        <form class="form-horizontal paddingForm">
                            <Typography className={classes.title} variant="h5" color="textSecondary" gutterBottom onClick={() => getUserTodosAndPosts()}>
                                ID: {props.user.id}, {props.user.name} 
                            </Typography>
                        
                            <div class="form-group">
                                <label class="col-3 control-label" >Name: </label>
                                <input class="col-9" type="text" value={name} onChange={e => setName(e.target.value)}/>
                                
                            </div>
                            <div class="form-group">
                                <label class="col-3 control-label">Email: </label>
                                <input class="col-9" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                            </div>
                            
                            
                                
                                
                            <div className={isDisplayOtherData ? "display" : "notDisplay"}>
                                <div class="form-group">
                                    <label class="col-3 control-label" >Strret:</label>
                                    <input class="col-9" type="text" value={street} onChange={e => setStreet(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label class="col-3 control-label">City:</label>
                                    <input class="col-9" type="text" value={city} onChange={e => setCity(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label class="col-3 control-label">Zip Code:</label>
                                    <input class="col-9" type="text" value={zipcode} onChange={e => setZipcode(e.target.value)} />
                                </div>
                            </div>       
                              
                            
                            
                        </form>
                    </div>
                
                </div>  
            
            </CardContent>
            <CardActions className={classes.userAction} disableSpacing>
                <Button variant="outlined" size="small" onMouseOver={() => setIsDisplayOtherData(true)} onClick={() => setIsDisplayOtherData(false)}>Other Data</Button>
                
                           

                <IconButton className={classes.btnSpacing} onClick={() => updateUser()} aria-label="update">
                    <UpdateIcon />
                </IconButton>
                <IconButton onClick={() => deleteUser()} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>

        <Grid item >
            {appContext.matches && appContext.selectedUserId === props.user.id ? appContext.userData : null }
        </Grid>
        </React.Fragment>
       
    )
}

export default User;