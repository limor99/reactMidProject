import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles( theme =>({
    header: {
        marginBottom: "1em",
        
    },
    appBar:{
        backgroundColor: "darkcyan"
    }
    

}))

const Header = () =>{
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <h3>Users's Todos & Post Management</h3>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;