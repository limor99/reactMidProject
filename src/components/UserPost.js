import React from 'react';

import './UserPost.css';

function UserPost(props) {
    return (
        <div>
             <div className="post">
                Title: {props.userPost.title}<br/>
                Body: {props.userPost.body}
            </div>
        </div>
    )
}

export default UserPost
