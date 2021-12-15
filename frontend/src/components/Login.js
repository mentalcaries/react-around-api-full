import React from "react";
import UserForm from "./UserForm";


function Login({onSubmit}) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <UserForm
      formTitle="Log In"
      formText="Not a member yet?"
      formLink="/register"
      linkText="Sign up here!"
      formButton="Log in"
      onSubmit={onSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
  );
}

export default Login;
