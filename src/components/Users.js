import React, {useState ,useEffect} from 'react';

import User from './User';
import userUtils from '../utils/UsersUtil.js';

import './Users.css';


const Users = (props) => {
    const [searchText, setSearchText] = useState('');
    const [filterDisplay, setFilterDisplay] = useState(props.users);

    useEffect(() =>{
        setFilterDisplay(props.users);
    }, [props.users])

    const search = (searchText) =>{
        setSearchText(searchText);
        let searchResult = props.users.filter(user => ((user.name.toLowerCase().includes(searchText.toLowerCase())) ||
                                                     (user.email.toLowerCase().includes(searchText.toLowerCase()))))
        setFilterDisplay(searchResult);
    }

    const deleteUser = (userId) =>{
        props.deleteCallback(userId)

    }

    const updateUser = (obj) =>{
        props.updateCallback(obj)

    }

    const getUserTodosAndPosts = (id) =>{
        props.getUserData(id);
    }

    return (
        <div className="users">
            Search <input type="text" onChange={(e) => search(e.target.value)} /> <br/>
            {
                filterDisplay.map(user =>{
                    return (<div key={user.id}>
                                <User user={user} deleteCallback={deleteObj => deleteUser(deleteObj)} updateCallback={updateObj => updateUser(updateObj)} 
                                        getUserData={(id => getUserTodosAndPosts(id))}/>    
                            </div>)
                })
            }
        </div>
    )
}

export default Users
