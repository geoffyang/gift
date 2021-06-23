// external
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

// internal
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash"
import UploadProductForm from "./components/UploadProductForm"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <>
              <Splash />
              <Navigation isLoaded={isLoaded} />
            </>
          </Route>
          <Route exact path='/upload'>
            <UploadProductForm/>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
