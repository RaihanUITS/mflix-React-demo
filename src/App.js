import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCurrentUser } from "./services/authService";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/not-found";
import NavBar from "./components/navbar";
import React, { Component } from "react";
import MovieForm from "./components/movieform";
import RentalForm from "./components/rentalform";
import Login from "./components/loginform";
import Logout from "./components/logout";
import Register from "./components/registerform";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/movies/:id"
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                if (user && !user.isAdmin) return <Redirect to="/" />;
                return <MovieForm {...props} />;
              }}
            />
            <Route
              path="/rental/:id"
              render={(props) => {
                return <RentalForm customer={user} {...props} />;
              }}
            />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
