import axios from 'axios';

const Auth = {
    current: () =>
    axios.get('/user'),
    login: (email:string, password:string) =>
    axios.post('/users/login', { user: { email, password } }),
    register: (username:string, email:string, password:string) =>
    axios.post('/users', { user: { username, email, password } }),
    save: (user:string) =>
    axios.put('/user', { user })
  };

  //import Auth and use as 'Auth.login(data).then().catch();

 export default {
    Auth
  };
  