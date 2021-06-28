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
import ProductsDisplay from "./components/ProductsDisplay"
import BigArticle from "./components/BigArticle"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  // const [products, setProducts] = useState(null);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(sessionData => setUser(sessionData))
      .then(() => setIsLoaded(true))
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Splash />
            <Navigation isLoaded={isLoaded} />
          </Route>
          <Route exact path='/upload'>
            <UploadProductForm />
            <Navigation isLoaded={isLoaded} />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/products">
            <ProductsDisplay user={user} />
            <Navigation isLoaded={isLoaded} />
          </Route>
          <Route exact path="/products/:id">
            <BigArticle />
            <Navigation isLoaded={isLoaded} />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
