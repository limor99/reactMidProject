import React from 'react';

const AppContext = React.createContext({
    user: [], 
    usersTodos: [],
    userTodos: [],
    userPosts: [],
    updateCallback: () => {}, 
    deleteCallback: () => {}, 
    getUserTodosAndPostsCallback: () =>{},
    updateTodoCallback: () =>{},

});

export default AppContext;