import React, { useState } from 'react';
import axios from 'axios';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        axios.post("http://localhost:3006/login", {
          username: username,
          password: password,
      }).then((response) => {
          console.log(response);
          window.location = "/calculs";
      }).catch((err) => {
        console.log(err);
        });
      };

  return (
    <div className="login">
        <h1>Login</h1>
        <form action="/auth" method="post" />
            <label id="username">
            </label>
            <input type="text" onChange={(e) => { setUsername(e.target.value); }} />
            <label id="password">
            </label>
            <input type="text" onChange={(e) => { setPassword(e.target.value); }} />
            <button onClick={login} type="submit">Login</button>
	</div>
  )
}

export default Login;