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
    constructor(props) {
        super(props);

        this.state = {
            displayMenu: false,
            activeMenu: []
        };
    }

    componentDidMount() {

    }

    openMenu() {
        this.setState({
            displayMenu: true,
            activeMenu: this.props.restaurants[arguments[0]].items
        });
    }

    closeMenu() {
        this.setState({
            displayMenu: false
        });
    }

    getRestaurants() {
        let restaurants = [];

        for(var k in this.props.restaurants) {
            restaurants.push(this.props.restaurants[k]);
        }

        return restaurants;
    }

    render() {
        return (
                <div
                    className="UserRestaurantViewContainer"
                >
                    <h1>Restaurants Near You</h1>
                    <Grid
                        className="UserRestaurantViewGrid"
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={40}
                    >
                        {
                            this.getRestaurants().map((restaurant) => {
                                return (
                                    <RestaurantSelection
                                        key={restaurant.id}
                                        restaurant={restaurant}
                                        openParentMenu={this.openMenu.bind(this, restaurant.id)}
                                    ></RestaurantSelection>
                                );
                            })
                        }
                        <Menu
                            open={this.state.displayMenu}
                            items={this.state.activeMenu}
                            closeMenu={this.closeMenu.bind(this)}
                            addItemToCart={this.props.addItemToCart}
                        ></Menu>
                    </Grid>
                </div>
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
