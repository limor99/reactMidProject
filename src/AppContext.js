import React from 'react';

const AppContext = React.createContext({
    user: [], 
    usersTodos: [],
    userTodos: [],
    userPosts: [],
    clickedUserArr: [],
    isUserTodosCompletedArr: [],
    updateCallback: () => {}, 
    deleteCallback: () => {}, 
    getUserTodosAndPostsCallback: () =>{},
    updateTodoCallback: () =>{},
    addUserTodoCallback: () => {},
    setIsDisplayUserTodoCallback: () =>{},
    addUserCallback: () => {},
});

export default AppContext;