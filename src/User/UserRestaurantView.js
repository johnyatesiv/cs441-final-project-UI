import React from 'react';
import './UserRestaurantView.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

/** Other Views **/
import Menu from "../Menu/MenuView";

/** Globals **/

class UserRestaurantView extends React.Component {
    constructor() {
        super();

        this.state = {
            restaurants: [],
            displayMenu: false,
            activeMenu: [],
            menus: {}
        };
    }

    componentDidMount() {
        this.getRestaurants();
        this.getMenus();
    }

    getRestaurants() {
        fetch("https://cs441-api.herokuapp.com/restaurants").then(restaurants => {
            console.log("Fetched restaurants from API.");
            this.setState({
                restaurants: restaurants
            });
        }).catch(err => {
            this.setState({
                error: true,
                errorDetails: err
            });
        });
    }

    getMenus() {
        fetch("https://cs441-api.herokuapp.com/menus").then(menus => {
            console.log("Fetched menus from API.");
            this.setState({
                menus: menus
            });
        }).catch(err => {
            this.setState({
                error: true,
                errorDetails: err
            });
        });
    }

    openMenu() {
        this.setState({
            displayMenu: true,
            activeMenu: this.state.menus[arguments[0]]
        });
    }

    closeMenu() {
        this.setState({
            displayMenu: false
        });
    }

    render() {
        return (
                <Grid
                    className="UserRestaurantViewGrid"
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={40}
                >
                    {
                        this.state.restaurants.length ?
                            this.state.restaurants.map(restaurant => {
                                return (
                                <RestaurantSelection
                                key={restaurant.id}
                                restaurant={restaurant}
                                openParentMenu={this.openMenu.bind(this, restaurant.id)}
                                ></RestaurantSelection>
                                );
                            })
                        : ""
                    }
                    <Menu
                        open={this.state.displayMenu}
                        menu={this.state.activeMenu}
                        close={this.closeMenu.bind(this)}
                    ></Menu>
                </Grid>
        );
    }
}

class RestaurantSelection extends React.Component {
    constructor(props) {
        super();

        this.props = props;
        this.state = {};
    }

    onClick() {
        this.props.openParentMenu();
    }

    render() {
        return (
            <Card
                className="RestaurantCard"
                onClick={this.onClick.bind(this)}
            >
                <CardContent className="RestaurantCardContent">
                    {this.props.restaurant.name}
                    <br/>
                    <CardMedia
                        className="RestaurantCardMedia"
                        component="img"
                        image={this.props.restaurant.image}
                    />
                    <br/>
                    {this.props.restaurant.description}
                </CardContent>
                <CardActions></CardActions>
            </Card>
        )
    }
}

export default UserRestaurantView;
