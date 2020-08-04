import React, {useState ,useEffect, useContext} from 'react';

import User from './User';
import userUtils from '../utils/UsersUtil.js';
import AppContext from '../AppContext.js';

import './Users.css';

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles( theme =>({
    users: {
        width: "100%",
    },
    
    searchWrap:{
        width: "100%",
        padding: "2rem",
        backgroundColor: "lightcyan",
        marginBottom: "1em"
    },
        
    
    userWrap: {
        width: "100%",
        
    },/*
    searchContainer: { 
        marginLeft: "2em",
        width: "80%"
    },*/
    search:{
        width: "95%"
    },/*
    addBtn: { 
        marginLeft: "auto",
    }
*/
}))


const Users = () => {
    const appContext = useContext(AppContext);
    const [searchText, setSearchText] = useState('');
    const [filterDisplay, setFilterDisplay] = useState(appContext.users);
    const [name, setName] = useState(appContext.name);
    const [arr, setArr] = useState(appContext.arr);

    const classes = useStyles();
    useEffect(() =>{
        setFilterDisplay(appContext.users);
        
    }, [appContext.users]);

    const search = (searchText) =>{
        setSearchText(searchText);
        let searchResult = appContext.users.filter(user => ((user.name.toLowerCase().includes(searchText.toLowerCase())) ||
                                                     (user.email.toLowerCase().includes(searchText.toLowerCase()))))
        setFilterDisplay(searchResult);
    }

    const addNewUser = () =>{
        appContext.setIsDisplayNewUserFormCallback(true);
    }
    
        return (
                
                    <Grid  container direction="column" justify="flex-start" alignItems="flex-start" sm={12}>
                        <Grid className={classes.searchWrap} item sm={12}>
                            <Grid container justify="space-between" alignItems="center" sm={12}>
                                <Grid item className={classes.searchContainer} xs={10}>
                                    <input className={classes.search} placeholder="Search by name / email" type="text" onChange={(e) => search(e.target.value)} />
                                </Grid>
                                <Grid item className={classes.addBtn} sm={2}>
                                    <IconButton  aria-label="add user" onClick={() => addNewUser()}>
                                        <PersonAddIcon fontSize="large"/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        {appContext.matches ? appContext.addUser : null}
                        <Grid item className={classes.users}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                {
                                    filterDisplay.map(user =>{
                                        
                                        return (    <React.Fragment>
                                                        <Grid item className={classes.userWrap}> 
                                                            <User key={user.id} user={user}/>    
                                                        </Grid>
                                                        
                                                     </React.Fragment>
                                                )
                                    
                                    })
                                    
                                }
                            </Grid>
                        </Grid>
                    </Grid>

            
           
        )
    
}

export default Users
