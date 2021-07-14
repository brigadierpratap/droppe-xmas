import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar";
import WishLists from "../WishLists/WishLists";
import IndividualList from "../IndividualList/IndividualList";
import Checkout from "../Checkout/Checkout";
import NotFound from "../NotFound/NotFound";
import Footer from "../Footer/Footer";

function MainComponent() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/wishlists">
          <WishLists />
        </Route>
        <Route exact path="/wishlists/:id">
          <IndividualList />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/not-found">
          <NotFound />
        </Route>
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
}

export default MainComponent;
