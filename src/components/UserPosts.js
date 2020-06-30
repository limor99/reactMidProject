import React from 'react'

import UserPost from './UserPost'

function UserPosts(props) {
    return (
        <div>
            Posts - User {props.userId}
        
        {
             props.userPosts.map(post =>{
                return (<div key={post.id}>
                    <UserPost userPost={post}/>
                    </div>)
            })
        }
        </div>
    )
}

export default UserPosts
