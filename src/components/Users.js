import React, {useState ,useEffect, useContext} from 'react';

import User from './User';
import userUtils from '../utils/UsersUtil.js';
import AppContext from '../AppContext.js';

import './Users.css';


const Users = () => {
    const appContext = useContext(AppContext);
    const [searchText, setSearchText] = useState('');
    const [filterDisplay, setFilterDisplay] = useState(appContext.users);
    const [name, setName] = useState(appContext.name);
    const [arr, setArr] = useState(appContext.arr);

    useEffect(() =>{
        
        setFilterDisplay(appContext.users);
        
    }, [appContext.users]);

    const search = (searchText) =>{
        setSearchText(searchText);
        let searchResult = appContext.users.filter(user => ((user.name.toLowerCase().includes(searchText.toLowerCase())) ||
                                                     (user.email.toLowerCase().includes(searchText.toLowerCase()))))
        setFilterDisplay(searchResult);
    }
    
        return (
           

               
            <div className="users">
              
              
              Search <input type="text" onChange={(e) => search(e.target.value)} /> <br/>
                {
                    filterDisplay.map(user =>{
                        return (<div key={user.id}>
                                    <User user={user}/>    
                                </div>)
                    })
                    
                }
            
            </div>
         
           
        )
    
}

export default Users
