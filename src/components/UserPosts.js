import React, {useState, useContext, useEffect} from 'react';

import UserPost from './UserPost';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import AppContext from '../AppContext';
import AddPost from './AddPost';

const useStyles = makeStyles( theme =>({
    userPostsTitle: {
        position: "sticky",
        top: 0,
        textAlign: "center",
        backgroundColor: "#fffa9b",
        borderBottom: "2px solid black",
        zIndex: "9999"
    },
        
}))

function UserPosts(props) {
    const appContext = useContext(AppContext);
    const [userPostsDisplay, setUserPostsDisplay] = useState([]);
    const [isDisplayUserPosts, setIsDisplayUserPosts] = useState(appContext.isDisplayUserPosts); //display user's posts and not add post form
    
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

       
    return (
        <React.Fragment>
            <div className={isDisplayUserPosts? "display" : "notDisplay"}>
                <Typography className={classes.userPostsTitle} variant="h6" color="textSecondary" >
                    <div>
                        {props.name}'s Posts, id: {props.userId}
                        <IconButton onClick={() => dispalyAddUserPostForm()} aria-label="add post">
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

            <div className={!isDisplayUserPosts? "displayForm" : "notDisplay"}>
                <AddPost userId={props.userId}/>

            </div>



        </React.Fragment>
        
    )
}

export default UserPosts;
