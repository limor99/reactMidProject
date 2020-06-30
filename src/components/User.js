import React, {useState} from 'react';

import userUtils from '../utils/UsersUtil.js';

import './User.css';

function User(props) {
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [street, setStreet] = useState(props.user.address.street);
    const [city, setCity] = useState(props.user.address.city);
    const [zipcode, setZipcode] = useState(props.user.address.zipcode);
    const [isDisplayOtherData, setIsDisplayOtherData] = useState(false);
    const [isClickedUser, setIsClickedUser] = useState(false);
    const [prevClickedUserId, setPrevClickedUserId] = useState(0);

    const updateUser = () =>{
        let userId = props.user.id;
        let updateObj = {
            id: userId,
            name: name,
            email: email,
            street: street,
            city: city,
            zipcode: zipcode
        }
        props.updateCallback(updateObj);
        
    }

    const deleteUser = () =>{
        let userId = props.user.id;
        props.deleteCallback(userId);
    }

    const getUserTodosAndPosts = () =>{
   /*     if(prevClickedUserId !== 0){
            props.updateUserClass(prevClickedUserId);
        }
        */
        setIsClickedUser(true);
        let userId = props.user.id;
        setPrevClickedUserId(userId);
        props.getUserData(userId);
    }

    return (
        <div className={isClickedUser? "clickedUser" : "user"}>
            <div onClick={() => getUserTodosAndPosts()}> ID: {props.user.id}<br/></div>
            Name: <input type="text" value={name} onChange={e => setName(e.target.value)}/><br/>
            Email: <input type="text" value={email} onChange={e => setEmail(e.target.value)}/><br/>
            <input type="button" value="Other Data" onMouseOver={() => setIsDisplayOtherData(true)} onClick={() => setIsDisplayOtherData(false)} />
            <div className={`otherData ${isDisplayOtherData ? "display" : "notDisplay"}`}>
                Strret: <input type="text" value={street} onChange={e => setStreet(e.target.value)} /><br/>
                City: <input type="text" value={city} onChange={e => setCity(e.target.value)} /><br/>
                Zip Code: <input type="text" value={zipcode} onChange={e => setZipcode(e.target.value)} /><br/>
            </div>       
            
            <input type="button" value="Update" onClick={() => updateUser()}/>
            <input type="button" value="Delete" onClick={() => deleteUser()}/>
        </div>
    )
}

export default User
