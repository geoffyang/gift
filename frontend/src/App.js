import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (

    <Switch>
      <Route exact path='/login' >
        <LoginFormPage />
      </Route>
      <Route >
        <h1>You're in app.js but that route is not yet defined</h1>
      </Route>
    </Switch>
  );

}


export default App;
