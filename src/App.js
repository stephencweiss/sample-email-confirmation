import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import "./App.css";

import Notifications from "react-notify-toast";
import "react-toastify/dist/ReactToastify.css";

import { Confirm, Landing } from "./pages";
import { Loader } from "./components";
import { API_URL } from "./config";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/wake-up`)
      .then(res => res.json())
      .then(() => setIsLoading(false))
      .catch(err => console.log(err));
  }, []);

  const Content = () => {
    if (isLoading) return <Loader />;
    return (
      <Router>
        <Switch>
          <Route exact path="/confirm/:id" component={Confirm} />
          <Route exact path="/" component={Landing} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    );
  };

  return (
    <div className="container fadein">
      <Notifications />
      <main>
        <Content />
      </main>
      <footer>Made with love</footer>
    </div>
  );
}

export default App;
