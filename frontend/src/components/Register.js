import React from "react";
import UserForm from "./UserForm";

function Register({ password, setPassword, email, setEmail, handleSubmit }) {
  return (
    <UserForm
      formTitle="Sign Up"
      formText="Already a member?"
      formLink="/login"
      linkText="Log in here!"
      formButton="Sign Up"
      onSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
  );
}

export default Register;
