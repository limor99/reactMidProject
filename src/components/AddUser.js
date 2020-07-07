import React, {useState, useContext} from 'react';

import AppContext from '../AppContext';
function AddUser() {
    const appContext = useContext(AppContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    //const [isValidForm, setIsValidForm] = useState(false);

    const addUserSubmit = (e) =>{
        e.preventDefault();
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
        <div>
            <form onSubmit={e => addUserSubmit(e)}>            
                Name: <input type="text" value={name} name="name" onChange={e => setName(e.target.value)}/><br/>
                Email: <input type="text" value={email} name="email" onChange={e => setEmail(e.target.value)}/><br/>
                <input type="button" value="Cancel" onClick={() => cancel()} />
                <input type="submit" value="Add" />
            </form>

        </div>
    )
}

export default AddUser
