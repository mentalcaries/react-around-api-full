import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function ProtectedRoute({children, loggedIn}) {
  return (
    <Route>{loggedIn ? children : <Redirect to="/login" />}</Route>
  );
}
export default ProtectedRoute