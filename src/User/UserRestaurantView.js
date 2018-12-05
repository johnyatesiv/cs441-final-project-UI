import React from 'react';
import './UserRestaurantView.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

/** Other Views **/
import Menu from "../Menu/MenuView";

/** Globals **/

class UserRestaurantView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRestaurant: false,
            displayMenu: false,
            activeMenu: [],
            userLat: 0,
            userLng: 0
        };
    }

    componentWillReceiveProps() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                this.setState({
                    userLat: position.coords.latitude,
                    userLng: position.coords.longitude
                });
            });
            alert("got geolocation: "+this.state.userLat+" / "+this.state.userLng);
        } else {
            /* geolocation IS NOT available */
        }
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
                    <RestaurantMap
                        restaurants={this.getRestaurants()}
                        openParentMenu={this.openMenu}
                        userLat={this.state.userLat}
                        userLng={this.state.userLng}
                    />
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
                                if(this.props.selectedRestaurant && restaurant.id !== this.props.selectedRestaurant) {
                                     return null;
                                } else {
                                    return (
                                        <RestaurantSelection
                                            key={restaurant.id}
                                            restaurant={restaurant}
                                            openParentMenu={this.openMenu.bind(this, restaurant.id)}
                                        ></RestaurantSelection>
                                    );
                                }
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

class RestaurantMap extends React.Component {
    constructor(props) {
        super(props);
    }

    createMarker(restaurant) {
        return (
            <Marker
                key={restaurant.id}
                position={{ lat: restaurant.lat, lng: restaurant.lng }}
                onClick={this.props.openParentMenu.bind(this, restaurant.id)}
            />
        );
    }

    addMarkers() {
        let markers = [];

        this.props.restaurants.forEach((restaurant) => {
            markers.push(this.createMarker(restaurant));
        });

        console.log(markers);

        return markers;
    }

    render() {
       const MapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: this.props.userLat, lng: this.props.userLng }}
            >
                {this.addMarkers()}
             </GoogleMap>
        ));

        return (
            <MapComponent
                className="RestaurantMap"
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD44S3kM5pY8Tae-uz5c6YCd-F7gABvSi0"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
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
                    <br/>
                    <CardMedia
                        className="RestaurantCardMedia"
                        component="img"
                        image={this.props.restaurant.image}
                    />
                    <br/>
                    {this.props.restaurant.description}
                </CardContent>
            </Card>
        )
    }
}

export default UserRestaurantView;
