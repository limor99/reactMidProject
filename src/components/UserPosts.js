import React, {useState, useContext, useEffect} from 'react';

import UserPost from './UserPost';

import AppContext from '../AppContext';

import './UserPosts.css';

function UserPosts(props) {
    const appContext = useContext(AppContext);
    const [userPostsDisplay, setUserPostsDisplay] = useState([]);
    const [isDisplayUserPosts, setIsDisplayUserPosts] = useState(appContext.isDisplayUserPosts); //display user's posts and not add post form
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    
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
        <div>
            <div className={isDisplayUserPosts? "displayPosts" : "unDisplayPosts"}>
                Posts - User {props.userId}  
                <input type="button" value="Add" onClick={() => dispalyAddUserPostForm()}/>
            
                {
                    userPostsDisplay.map(post =>{
                        return (<div key={post.id}>
                            <UserPost userPost={post} />
                            </div>)
                    })
                }
            </div>

            <div className={!isDisplayUserPosts? "displayForm" : "unDisplayForm"}>
                New Post - User {props.userId} <br/>
                Title: <input type="text" value={title} onChange={e => setTitle(e.target.value)} /><br/>
                Body: <input type="text" value={body} onChange={e => setBody(e.target.value)} /><br/>

                <input type="button" value="Cancel" onClick={() => cancelNewPost()}/>
                <input type="button" value="Add" onClick={() => addUserPost()}/>
            </div>
            
        </div>
    )
}

export default UserPosts;
