import React, {useState, useContext} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from '@material-ui/icons/Person';

import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import AppContext from '../AppContext';

const useStyles = makeStyles( theme =>({
    newUserWrapper: {
        backgroundColor: "lightcyan"
    },
    addBtn: {
        marginLeft: "5em"
    }

}))
function AddUser() {
    const appContext = useContext(AppContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    const classes = useStyles();

    const addUserSubmit = () =>{
        //e.preventDefault();
        if(name != '' && email != ''){
            let userArr = appContext.users;
            let lastUser = userArr.slice(-1)[0];
            let nextUserId = lastUser.id + 1;
            let newUser = {
                id: nextUserId,
                name: name,
                email: email,
                street: '',
                city: '',
                zipcode: ''
            }
            
            appContext.addUserCallback(newUser);
            setName('');
            setEmail('');
        }
    }

    const cancel = () =>{
        appContext.setIsDisplayNewUserFormCallback(false);
    }

    return (
        <Card variant="outlined" className={classes.newUserWrapper}>
            <IconButton  onClick={() => cancel()} aria-label="cancel">
                <CancelIcon fontSize="small"/>
            </IconButton>
            <CardContent >
                <div class="container">
                
                    <form class="form-horizontal" onSubmit={e => addUserSubmit(e)}>   
                    
                        <div class="form-group">
                            
                            <Typography variant="h5" color="textSecondary"  >
                                 <span class="col-12">
                                    <PersonIcon fontSize="large"/>
                                </span>
                                <span class="col-9">
                                    New User Details 
                                </span>
                                
                            </Typography>
                        </div>    

                        <div class="form-group">
                            <label class="col-3 control-label" >Name: </label>
                            <input class="col-9" type="text" value={name} name="name" onChange={e => setName(e.target.value)}/>
                            
                        </div>
                        <div class="form-group">
                            <label class="col-3 control-label">Email: </label>
                            <input class="col-9" type="text" value={email} name="email" onChange={e => setEmail(e.target.value)}/>
                        </div>  

                        
                        <IconButton  className={classes.addBtn} onClick={() => addUserSubmit()} aria-label="add user">
                            <AddCircleOutlinedIcon fontSize="large"/>
                        </IconButton>      
                    </form>
                </div>

            </CardContent>
           
        </Card>

          
         
    )
}

export default AddUser
