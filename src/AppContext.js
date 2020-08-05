import React from 'react';

const AppContext = React.createContext({
    user: [], 
    usersTodos: [],
    userTodos: [],
    userPosts: [],
    clickedUserArr: [],
    isUserTodosCompletedArr: [],
    isDisplayUserTodos: [],
    isDisplayUserPosts: [],
    isDisplayUserData: [],
    userData: [],
    selectedUserId: [],
    addUser: [],
    matches: [],
    updateCallback: () => {}, 
    deleteCallback: () => {}, 
    getUserTodosAndPostsCallback: () =>{},
    updateTodoCallback: () =>{},
    addUserTodoCallback: () => {},
    setIsDisplayUserTodoCallback: () =>{},
    addUserPostCallback: () => {},
    setIsDisplayUserPostsCallback: () => {},
    setIsDisplayNewUserFormCallback: () => {},
    addUserCallback: () => {},
});


export default AppContext;