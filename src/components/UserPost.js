import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles( theme =>({
    post:{
        padding: "1em",        
        margin: "1em 2em 1.5em 2em",
        backgroundColor: "#fffa9b",
        fontSize: "15pt"
    }
}))

function UserPost(props) {
    const classes = useStyles();

    return (
        <div>
             <div className={classes.post}>
                <b>Title:</b> {props.userPost.title}<br/>
                <b>Body:</b> {props.userPost.body}
            </div>
        </div>
    )
}

export default UserPost
