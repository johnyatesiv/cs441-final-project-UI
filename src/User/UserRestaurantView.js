import React from 'react';
import './UserRestaurantView.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { connect } from "react-redux";

/** Other Views **/
import Menu from "../Menu/MenuView";

/** Globals **/

class UserRestaurantView extends React.Component {
    constructor(props) {
        super(props);

        let lat = this.getCookie("lat");
        let lng = this.getCookie("lng");
        let userLat = (lat ? lat : 32.9781759);
        let userLng = (lng ? lng : -117.080604);

        this.state = {
            displayMap: true,
            selectedRestaurant: false,
            displayMenu: false,
            activeMenu: [],
            userLat: userLat,
            userLng: userLng
        };
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");

        if(parts.length == 2) {
            return parts.pop().split(";").shift();
        }
    };

    componentWillReceiveProps() {

    }

    componentDidMount() {

    }

    openMenu() {
        this.setState({
            activeMenu: this.props.restaurants[arguments[0] - 1].items
        });
    }

    closeMenu() {
        this.setState({
            displayMenu: false,
            displayMap: true
        });
    }

    getRestaurants() {
        let restaurants = [];

        for(var k in this.props.restaurants) {
            restaurants.push(this.props.restaurants[k]);
        }

        return restaurants;
    }

    selectRestaurant(id) {
        let srcObj = (id ? this.props.restaurants[id] : this.props.restaurants[arguments[0] -1])
        this.setState({
            displayMenu: true,
            displayMap: false,
            activeMenu: srcObj.items,
            activeRestaurantName: srcObj.name
        });
    }

    render() {
        return (
                <div
                    className="UserRestaurantViewContainer"
                >
                    <h1>Restaurants Near You</h1>
                    {
                        this.state.displayMap ?
                            <RestaurantMap
                                restaurants={this.getRestaurants()}
                                userLat={this.state.userLat}
                                userLng={this.state.userLng}
                                selectRestaurant={this.selectRestaurant.bind(this)}
                            />
                            :
                            ""
                    }
                    <Grid
                        className="UserRestaurantViewGrid"
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={40}
                    >
                        {
                            //this.getRestaurants().map((restaurant) => {
                            //    if(this.props.selectedRestaurant && restaurant.id !== this.props.selectedRestaurant) {
                            //         return null;
                            //    } else {
                            //        return (
                            //            <RestaurantSelection
                            //                key={restaurant.id}
                            //                restaurant={restaurant}
                            //                openParentMenu={this.openMenu.bind(this, restaurant.id+1)}
                            //            ></RestaurantSelection>
                            //        );
                            //    }
                            //})
                        }
                        <Menu
                            open={this.state.displayMenu}
                            items={this.state.activeMenu}
                            restaurantName={this.state.activeRestaurantName}
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

    selectRestaurant() {
        console.log("subselecting restaurant "+arguments[0]);
        this.props.selectRestaurant(arguments[0]);
    }

    createMarkerLabel(restaurant) {
        //return (<Tooltip placement="top" open={true}>{restaurant.name}</Tooltip>);
        return (restaurant.name);
    }

    createMarker(restaurant) {
        return (
            <Marker
                key={restaurant.id}
                label={this.createMarkerLabel(restaurant)}
                position={{ lat: restaurant.lat, lng: restaurant.lng }}
                onClick={this.selectRestaurant.bind(this, restaurant.id)}
            />
        );
    }

    addMarkers() {
        let markers = [];

        this.props.restaurants.forEach((restaurant) => {
            markers.push(this.createMarker(restaurant));
        });

        return markers;
    }

    loadingGraphic() {
        return (
            <div className="RestaurantMapLoader">
                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif" />
            </div>
        )
    }

    render() {
       const MapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={13}
                defaultCenter={{ lat: this.props.userLat, lng: this.props.userLng }}
            >
                {this.addMarkers()}
             </GoogleMap>
        ));

        return (
            <MapComponent
                className="RestaurantMap"
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD44S3kM5pY8Tae-uz5c6YCd-F7gABvSi0"
                loadingElement={this.loadingGraphic()}
                containerElement={<div className="RestaurantMapContainerElement" />}
                mapElement={<div className="RestaurantMapElement"/>}
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
