import React, {useState, useEffect} from 'react';

import AppContext from './AppContext';

import './App.css';
import './components/Users.css';


import Users from './components/Users';
import Header from './components/ui/Header';
import UserTodos from './components/UserTodos';
import UserPosts from './components/UserPosts';
import AddUser from './components/AddUser';

import usersUtil from './utils/UsersUtil';

const App = () => {

  const [users, setUsers] = useState([]);
  const [usersTodos, setUsersTodos] = useState([]);
  const [usersPosts, setUsersPosts] = useState([]);
  const [userTodos, setUserTodos] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isDisplayUserData, setIsDisplayUserData] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [clickedUserArr, setClickedUserArr] = useState([]);
  const [isUserTodosCompletedArr, setIsUserTodosCompletedArr] = useState([]);
  const [isDisplayUserTodos, setIsDisplayUserTodos] = useState(false);
  const [isDisplayUserPosts, setIsDisplayUserPosts] = useState(false);
  const [isDisplayNewUserForm, setIsDisplayNewUserForm] = useState(false);

    useEffect (() =>{
        usersUtil.getUsers().then(resp => setUsers(resp));
        usersUtil.getUsersTodos().then(resp => setUsersTodos(resp));
        usersUtil.getUsersPosts().then(resp => setUsersPosts(resp));
    }, []);

    useEffect(() =>{
        let isUserCompletedTodosArr = new Array();
        users.forEach((user, index) =>{
          let isCompleted = true;
            usersTodos.forEach(todo =>{
                if (user.id === todo.userId && !todo.completed){
                  isCompleted = false;
                  return false;   //when we found the first uncompleted user's todo, we exit "each" loop
                }
            })
            if(isCompleted){
              isUserCompletedTodosArr.push({userId: user.id, isComplededTodos: true})
            }
            else{
              isUserCompletedTodosArr.push({userId: user.id, isComplededTodos: false})
            }
            
        })

        setIsUserTodosCompletedArr(isUserCompletedTodosArr);
    }, [users, usersTodos])

    useEffect(() =>{
      let userCheckedArr = new Array();
      let isClicked;
      users.forEach(user =>{
        isClicked = false;
        if(user.id === selectedUserId){
          isClicked = true;
        }
        userCheckedArr.push({
            userId: user.id,
            isClicked : isClicked
        })
      })
    
      setClickedUserArr(userCheckedArr)
    }, [selectedUserId])
  
    
   
    const updateCallback = (obj) =>{
      let usersArr = users.map(user => user.id === obj.id ? {...user, ...obj} : user);
      setUsers(usersArr);
    }

    const deleteCallback = (userId) =>{
      let usersArr = users.filter(user => user.id !== userId)
      setUsers(usersArr);
      setIsDisplayUserData(false);
    }

   
    const getUserTodosAndPostsCallback = (id) =>{
        setIsDisplayUserData(true);
        setSelectedUserId(id);

        getUserTodos(id);
        getUserPost(id);

        setIsDisplayUserTodos(true);
        setIsDisplayUserPosts(true);
        setIsDisplayNewUserForm(false);
    }

    const getUserTodos = (id) =>{
        let todos = usersTodos;
        let allUserTodos = todos.filter(todo => todo.userId == id);
        setUserTodos(allUserTodos);
    }

    const getUserPost = (id) =>{
        let posts = usersPosts;
        let allUserPosts = posts.filter(post => post.userId == id);
        setUserPosts(allUserPosts);
    }

    const updateTodoCallback = (obj) =>{
      let userTodosArr = usersTodos.map(todo => todo.id === obj.id && todo.userId === obj.userId ? {...todo, ...obj} : todo);
      setUsersTodos(userTodosArr);
    }

    const addUserTodoCallback = (objToAdd) =>{
        let todosArr = usersTodos;
        let userTodosArr = userTodos;
        let lastTodo = todosArr.slice(-1)[0];
        let newTodoId = lastTodo.id + 1;
        let newTodoObj = {
          userId: objToAdd.userId,
          id: newTodoId,
          title: objToAdd.title,
          completed: false
        
        }
        setUsersTodos([...todosArr, newTodoObj]);
        setUserTodos([...userTodosArr, newTodoObj]);
       
        setIsDisplayUserTodos(true);
        
    }

    const setIsDisplayUserTodoCallback = (isDisplay) =>{
        setIsDisplayUserTodos(isDisplay);
    }
    
    const addUserPostCallback = (objToAdd) =>{
      let postsArr = usersPosts;
      let userPostsArr = userPosts;
      let lastPost = postsArr.slice(-1)[0];
      let newPostId = lastPost.id + 1;
      let newPostObj = {
        userId: objToAdd.userId,
        id: newPostId,
        title: objToAdd.title,
        body: objToAdd.body,
      }
      setUsersPosts([...postsArr, newPostObj]);
      setUserPosts([...userPostsArr, newPostObj]);
     
      setIsDisplayUserPosts(true);
      
  }
  
  const setIsDisplayUserPostsCallback = (isDisplay) =>{
    setIsDisplayUserPosts(isDisplay);
}

const setIsDisplayNewUserFormCallback = (isDisplay) =>{
  setIsDisplayNewUserForm(isDisplay);
}

const addUserCallback = (newUserObj) =>{
  let usersArr = users;
  setUsers([...usersArr, newUserObj]);
}

    
  return (

    <div className="App">
      <AppContext.Provider value={{users, updateCallback, deleteCallback, getUserTodosAndPostsCallback, usersTodos, userTodos, userPosts, 
                      clickedUserArr, isUserTodosCompletedArr, isDisplayUserTodos, isDisplayUserPosts, updateTodoCallback, addUserTodoCallback, setIsDisplayUserTodoCallback,
                      addUserPostCallback, setIsDisplayUserPostsCallback, setIsDisplayNewUserFormCallback, addUserCallback}}>
          <Header/>
          <Users/>
          <div className={isDisplayUserData? "displayUserData": "notDisplayUserData"}>
            <div className="userTodos">
              <UserTodos  userId={selectedUserId} />
            </div>
            <div className="userPosts">
              <UserPosts  userId={selectedUserId} />
            </div>
          </div>

          <div className={isDisplayNewUserForm? "displayNewUserForm" : "notDisplayNewUserForm"}>
              <AddUser />
          </div>
          
        </AppContext.Provider>
    </div>
  );
}

export default App;
