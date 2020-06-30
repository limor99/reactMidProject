import React, {useState, useEffect} from 'react';

import './App.css';
import './components/Users.css';


import Users from './components/Users';
import Header from './components/ui/Header';
import UserTodos from './components/UserTodos';
import UserPosts from './components/UserPosts';

import usersUtil from './utils/UsersUtil';

const App = () => {

  const [users, setUsers] = useState([]);
  const [usersTodos, setUsersTodos] = useState([]);
  const [usersPosts, setUsersPosts] = useState([]);
  const [userTodos, setUserTodos] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isDisplayUserData, setIsDisplayUserData] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();


    useEffect (() =>{
        usersUtil.getUsers().then(resp => setUsers(resp));
        usersUtil.getUsersTodos().then(resp => setUsersTodos(resp));
        usersUtil.getUsersPosts().then(resp => setUsersPosts(resp));
    }, []);

    const deleteUser = (userId) =>{
      let usersArr = users.filter(user => user.id !== userId)
      setUsers(usersArr);
    }

    const updateUser = (obj) =>{
      let usersArr = users.map(user => user.id === obj.id ? {...user, ...obj} : user);
      setUsers(usersArr);
    }

    const getUserTodosAndPosts = (id) =>{
        setIsDisplayUserData(true);
        setSelectedUserId(id);
        let todos = usersTodos;
        let allUserTodos = todos.filter(todo => todo.userId == id);
        setUserTodos(allUserTodos);

        let posts = usersPosts;
        let allUserPosts = posts.filter(post => post.userId == id);
        setUserPosts(allUserPosts);
    }

    const updateTodo = (update) =>{
      
    }
 
    
  return (
    <div className="App">
      
       <Header/>
        <Users users={users} deleteCallback={deleteObj => deleteUser(deleteObj)} updateCallback={updateObj => updateUser(updateObj)} 
                getUserData={(id => getUserTodosAndPosts(id))}/>
        <div className={isDisplayUserData? "displayUserData": "notDisplayUserData"}>
          <div className="userTodos">
            <UserTodos  userTodos={userTodos} userId={selectedUserId} updateTodoCallback={(update) => updateTodo(update)} />
          </div>
          <div className="userPosts">
            <UserPosts  userPosts={userPosts} userId={selectedUserId}/>
          </div>
        </div>
    </div>
  );
}

export default App;
