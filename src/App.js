import React, {useState, useEffect} from 'react';
import todos from './images/todos.jpg';
import AppContext from './AppContext';

import './App.css';

import Users from './components/Users';
import Header from './components/ui/Header';
import UserTodos from './components/UserTodos';
import UserPosts from './components/UserPosts';
import AddUser from './components/AddUser';

import usersUtil from './utils/UsersUtil';

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';

const useStyles = makeStyles( theme =>({
  usersContainer: {
    padding: "0 1em",
    width: "100%"
  },
  swapContainer:{
    paddingRight: "1em"
  }, 
  displayNewUserForm: {
    display: "block",
    margin: "2em 0 3em 0",
    alignSelf: "center"
  },
  openImg: {
    width: "100%",
    marginBottom: "1em"
  },
  welcomeTitle: {
    textAlign: "center",
    backgroundColor: "darkcyan",
    color: "white",
    marginBottom: "1em",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
  userTodos:{
    height: "50vh",
    overflow: "auto",
    border: "2px solid black",
    marginBottom: "1em"
  },
  userPosts:{
    height: "50vh",
    overflow: "auto",
    border: "2px solid black",
    marginBottom: "1em"
  }
  
}))

const App = () => {

  const [users, setUsers] = useState([]);
  const [usersTodos, setUsersTodos] = useState([]);
  const [usersPosts, setUsersPosts] = useState([]);
  const [userTodos, setUserTodos] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isDisplayUserData, setIsDisplayUserData] = useState(false);
  const [isDisplayWelcome, setIsDisplayWelcome] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState();
  const [selectedUserName, setSelectedUserName] = useState();
  const [clickedUserArr, setClickedUserArr] = useState([]);
  const [isUserTodosCompletedArr, setIsUserTodosCompletedArr] = useState([]);
  const [isDisplayUserTodos, setIsDisplayUserTodos] = useState(false);
  const [isDisplayUserPosts, setIsDisplayUserPosts] = useState(false);
  const [isDisplayNewUserForm, setIsDisplayNewUserForm] = useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect (() =>{
        usersUtil.getUsers().then(resp => setUsers(resp));
        usersUtil.getUsersTodos().then(resp => setUsersTodos(resp));
        usersUtil.getUsersPosts().then(resp => setUsersPosts(resp));
    }, []);

    useEffect(() =>{
        let isUserCompletedTodosArr = [];
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
      let userCheckedArr = [];
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

   
    const getUserTodosAndPostsCallback = (id, name) =>{
        setIsDisplayUserData(true);
        setSelectedUserId(id);
        setSelectedUserName(name);

        getUserTodos(id);
        getUserPost(id);

        setIsDisplayUserTodos(true);
        setIsDisplayUserPosts(true);
        setIsDisplayNewUserForm(false);
        setIsDisplayWelcome(false);
    }

    const getUserTodos = (id) =>{
        let todos = usersTodos;
        let allUserTodos = todos.filter(todo => todo.userId === id);
        setUserTodos(allUserTodos);
    }

    const getUserPost = (id) =>{
        let posts = usersPosts;
        let allUserPosts = posts.filter(post => post.userId === id);
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
    
    if(selectedUserId === undefined){
      setIsDisplayUserData(false);
      setIsDisplayWelcome(!isDisplay);
    }
    else{
      setIsDisplayWelcome(false);
      setIsDisplayUserData(!isDisplay);
    }
  }

  const addUserCallback = (newUserObj) =>{
    let usersArr = users;
    setUsers([...usersArr, newUserObj]);
  }

  const welcome = (
    <Grid container direction="column" justify="center" alignItems="center">
          <Grid item className={classes.welcomeTitle}>
            <Typography variant="h3">
                Welcome to your User's Todos & Posts Managment app.
            </Typography>
            <Typography variant="h6">
                Forget from the sticky note you used to
            </Typography>

          </Grid>
          <Grid item className="fWidth">
            <img className={classes.openImg} src={todos} alt="welcome" />
          </Grid>
      </Grid>
  )

  const userData = (
    <React.Fragment>
        <div className={classes.userTodos}>
          <UserTodos  name={selectedUserName} userId={selectedUserId} />
        </div>
      
        <div className={classes.userPosts}>
          <UserPosts name={selectedUserName} userId={selectedUserId} />
        </div>
    </React.Fragment>
  )

  const addUser = (
    <Grid item className={isDisplayNewUserForm? classes.displayNewUserForm : "notDisplay"}>
      <AddUser />
    </Grid>
    
  )

    
  return (

    <div className="App">
      <AppContext.Provider value={{users, updateCallback, deleteCallback, getUserTodosAndPostsCallback, usersTodos, userTodos, userPosts, 
                      clickedUserArr, isUserTodosCompletedArr, isDisplayUserTodos, isDisplayUserPosts, matches, isDisplayUserData, userData, selectedUserId, addUser, updateTodoCallback, addUserTodoCallback, setIsDisplayUserTodoCallback,
                      addUserPostCallback, setIsDisplayUserPostsCallback, setIsDisplayNewUserFormCallback, addUserCallback}}>
          <Header/>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
              <Grid item>
                  {matches ? welcome : null}
              </Grid>
              <Grid item className={classes.usersContainer}  sm={12} md={6}>
                <Users />
              </Grid>
              <Grid item className={classes.swapContainer} sm={12} md={6}>
                  <Grid container direction="column" justify="center" alignItems="center" >
                      <Grid item className={isDisplayWelcome? "display" : "notDisplay"}>
                          {matches ? null : welcome}
                      </Grid>
                      <Grid item className={isDisplayUserData? "display": "notDisplay"}>
                          {matches ? null : userData}
                      </Grid>

                      {matches ? null : addUser}
                      

                      
                  </Grid>
              </Grid>
          </Grid>
        </AppContext.Provider>
    </div>
  );
}

export default App;
