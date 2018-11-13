import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { Fastfood, Restaurant, ExitToApp, MoreVert, Close, ShoppingCart } from '@material-ui/icons';

/** Child Views **/
import UserView from "./User/UserView";
import Cart from "./Order/Cart";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      restaurantViewOpen: false,
      orderViewOpen: false,
      cart: []
    };
  }

  mutateState(key, value) {
    let update = {};
    update[key] = value;
    this.setState(update);
  }

  openCart() {
    this.setState({
      cartOpen: true
    })
  };

  closeCart() {
    this.setState({
      cartOpen: false
    })
  }

  openRestaurantView() {
    this.closeOrderView();

    this.setState({
      restaurantViewOpen: true
    });
  }

  closeRestaurantView() {
    this.setState({
      restaurantViewOpen: false
    });
  }

  openOrderView() {
    this.closeRestaurantView();

    this.setState({
      orderViewOpen: true
    });
  }

  closeOrderView() {
    this.setState({
      orderViewOpen: false
    });
  }

  noViewsOpen() {
    return !this.state.restaurantViewOpen && !this.state.orderViewOpen;
  }

  addItemToCart(item) {
    if(this.state.cart[item.id]) {
      this.state.cart[item.id].quantity++;
    } else {
      this.state.cart[item.id] = item;
      this.state.cart[item.id].quantity = 1;
    }
  }

  removeItemFromCart(index) {
    delete this.state.cart[index];
  }

  render() {
    return (
      <div className="App">
          <MainMenu
              openRestaurantView={this.openRestaurantView.bind(this)}
              openOrderView={this.openOrderView.bind(this)}
              openCart={this.openCart.bind(this)}
          />
          <Grid container className="AppGrid">
            <br />
            {
              this.noViewsOpen() ?
                (
                  <div style={{width: "100vw", height: "100vh", textAlign: "center"}}>
                    <img style={{width: "50vw", height: "50vh", marginLeft: "10vw"}} src="/foodapp_logo.png" alt="Foodapp Logo" />
                  </div>
                )
                : ""
            }
            <UserView
                mutateParentState={this.mutateState.bind(this)}
                restaurantViewOpen={this.state.restaurantViewOpen}
                orderViewOpen={this.state.restaurantViewOpen}
                addItemToCart={this.addItemToCart.bind(this)}
                removeItemFromCart={this.removeItemFromCart.bind(this)}
            />
          </Grid>
          <Cart
              open={this.state.cartOpen}
              close={this.closeCart.bind(this)}
              items={this.state.cart}
              removeItemFromCart={this.removeItemFromCart.bind(this)}
          ></Cart>
      </div>
    );
  }
}

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
        <nav className="AppNav">
          <IconButton
              onClick={this.props.openRestaurantView.bind(this)}
          >
            <Restaurant />
          </IconButton>
          <IconButton
              onClick={this.props.openOrderView.bind(this)}
          >
            <Fastfood />
          </IconButton>
          <IconButton
              onClick={this.props.openCart.bind(this)}
          >
            <ShoppingCart />
          </IconButton>
        </nav>
    );
  }
}

export default App;
