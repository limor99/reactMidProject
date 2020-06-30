import axios from 'axios';

const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const usersTodosUrl = 'https://jsonplaceholder.typicode.com/todos';
const usersPostsUrl = 'https://jsonplaceholder.typicode.com/posts';

const getUsers = async () =>{
    let resp = await axios.get(usersUrl);
    let users = resp.data;

    return users;

}

const getUsersTodos = async () =>{
    let resp = await axios.get(usersTodosUrl);
    let usersTodos = resp.data;

    return usersTodos;
}

const getUsersPosts = async () =>{
    let resp = await axios.get(usersPostsUrl);
    let usersPosts = resp.data;

    return usersPosts;
}



export default {getUsers, getUsersTodos, getUsersPosts}
