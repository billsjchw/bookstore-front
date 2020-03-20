import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import BooksPage from "./pages/BooksPage/BooksPage";
import SignInPage from "./pages/SignInPage/SignInPage";

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path="/books" component={BooksPage}/>
              <Route path="/sign-in" component={SignInPage}/>
              <Redirect from="/*" to="/sign-in"/>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
