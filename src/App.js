import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Fastfood, Restaurant, ShoppingCart } from '@material-ui/icons';

/** Child Views **/
import UserView from "./User/UserView";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantViewOpen: false,
      orderViewOpen: false,
      cartItems: {},
      restaurants: {},
      selectedRestaurant: false,
      menu: {},
      orders: {}
    };
  }

  componentWillMount() {
    this.getRestaurants();
    this.getMenus();
    this.getOrders();
    this.getGeolocation();
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
    if(!this.state.selectedRestaurant) {
      this.setState({
        selectedRestaurant: item.restaurantId
      });
    } else {
      if(item.restaurantId !== this.state.selectedRestaurant) {
        return false;
      }
    }

    let cart = this.state.cartItems;

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
    let cart = this.state.cartItems;
    delete cart[index];
    this.setState({
      cart: cart
    });
  }

  clearCart() {
    this.setState({
      cartItems: {}
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

  getGeolocation() {
    if(navigator.geolocation) {
      try {
        navigator.geolocation.getCurrentPosition(function(position) {
          alert("got geolocation");
          document.cookie = "lat="+position.coords.lat+";lng="+position.coords.lng;
        }, function(error) {
          console.log(error);
        });
      } catch(e) {
        console.log(e);
      }
    } else {
      alert("Geolocation is not supported by this browser!")
    }
  }

  checkout() {
    this.setState({
      selectedRestaurant: false
    });

    this.closeCart();

    fetch('https://cs441-api.herokuapp.com/orders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: this.createOrderPOSTBody()
    }).then((res) => {
      console.log(this.state.cartItems);
      this.getOrders();
      this.openOrderView();
      this.clearCart();
    });
  }

  createOrderPOSTBody() {
    return JSON.stringify({
      restaurantId: this.state.selectedRestaurant,
      items: this.state.cartItems
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
                  <div className="LogoContainer">
                    <img className="LandingLogo" src="/foodapp_logo_v3.png" alt="Foodapp Logo" />
                    <h4>All images courtesy of Wikimedia</h4>
                  </div>
                )
                : ""
            }
            <UserView
                restaurants={this.state.restaurants}
                selectedRestaurant={this.state.selectedRestaurant}
                menus={this.state.menus}
                orders={this.state.orders}
                cartItems={this.state.cartItems}
                mutateParentState={this.mutateState.bind(this)}
                restaurantViewOpen={this.state.restaurantViewOpen}
                orderViewOpen={this.state.orderViewOpen}
                addItemToCart={this.addItemToCart.bind(this)}
                closeCart={this.closeCart.bind(this)}
                removeItemFromCart={this.removeItemFromCart.bind(this)}
                cartOpen={this.state.cartOpen}
                checkout={this.checkout.bind(this)}
            />
          </Grid>
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
