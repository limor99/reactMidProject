import React, {useState, useEffect} from 'react';

import AppContext from './AppContext';

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

    const updateCallback = (obj) =>{
      let usersArr = users.filter(user => user.id === obj.id ? {...user, ...obj} : user);
      setUsers(usersArr);
    }

    const deleteCallback = (userId) =>{
      let usersArr = users.filter(user => user.id !== userId)
      setUsers(usersArr);
    }

   
    const getUserTodosAndPostsCallback = (id) =>{
        setIsDisplayUserData(true);
        setSelectedUserId(id);
        let todos = usersTodos;
        let allUserTodos = todos.filter(todo => todo.userId == id);
        setUserTodos(allUserTodos);

        let posts = usersPosts;
        let allUserPosts = posts.filter(post => post.userId == id);
        setUserPosts(allUserPosts);
    }

    const updateTodoCallback = (obj) =>{
      let userTodosArr = usersTodos.map(todo => todo.id === obj.id && todo.userId === obj.userId ? {...todo, ...obj} : todo);
      setUsersTodos(userTodosArr);
    }

    
  return (

    <div className="App">
      <AppContext.Provider value={{users, updateCallback, deleteCallback, getUserTodosAndPostsCallback, usersTodos, userTodos, userPosts, updateTodoCallback}}>
          <Header/>
          <Users/>
          <div className={isDisplayUserData? "displayUserData": "notDisplayUserData"}>
            <div className="userTodos">
              <UserTodos  userId={selectedUserId} />
            </div>
            <div className="userPosts">
              <UserPosts  userPosts={userPosts} userId={selectedUserId}/>
            </div>
          </div>
          
        </AppContext.Provider>
    </div>
  );
}

export default App;
