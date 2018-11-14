import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Fastfood, Restaurant, ShoppingCart } from '@material-ui/icons';

/** Child Views **/
import UserView from "./User/UserView";
import Cart from "./Order/Cart";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantViewOpen: false,
      orderViewOpen: false,
      cart: [],
      restaurants: {},
      menu: {},
      orders: {}
    };
  }

  componentWillMount() {
    this.getRestaurants();
    this.getMenus();
    this.getOrders();
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
    let cart = this.state.cart;

    if(cart[item.id]) {
      cart[item.id].quantity++;
    } else {
      cart[item.id] = item;
      cart[item.id].quantity = 1;
    }

    this.setState({
      cart: cart
    });
  }

  removeItemFromCart(index) {
    let cart = this.state.cart;
    delete cart[index];
    this.setState({
      cart: cart
    });
  }

  getRestaurants() {
    fetch("https://cs441-api.herokuapp.com/restaurants").then(res => {
      return res.json();
    }).then(json => {
      let restaurants = {};
      json.forEach(restaurant => {
        restaurants[restaurant.id] = restaurant;
      });


      this.setState({
        restaurants: restaurants
      });
      console.log("Fetched restaurants from API.");
    }).catch(err => {
      this.setState({
        error: true,
        errorDetails: err
      });
    });
  }

  getMenus() {
    fetch("https://cs441-api.herokuapp.com/menus").then(res => {
      return res.json();
    }).then(json => {
      let menus = {};
      json.forEach(menu => {
        menus[menu.id] = menu;
      });


      this.setState({
        menus: menus
      });

      console.log("Fetched menus from API.");
    }).catch(err => {
      this.setState({
        error: true,
        errorDetails: err
      });
    });
  }

  getOrders() {
    fetch("https://cs441-api.herokuapp.com/orders").then(res => {
      return res.json();
    }).then(json => {
      let orders = {};

      json.forEach(order => {
        orders[order.id] = order;
      });

      this.setState({
        orders: orders
      });

      console.log("Fetched orders from API.");
    }).catch(err => {
      this.setState({
        error: true,
        errorDetails: err
      });
    });
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
                restaurants={this.state.restaurants}
                menus={this.state.menus}
                orders={this.state.orders}
                mutateParentState={this.mutateState.bind(this)}
                restaurantViewOpen={this.state.restaurantViewOpen}
                orderViewOpen={this.state.orderViewOpen}
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
