import React from 'react';
import './UserView.css';
//import GridList from '@material-ui/core/GridList';
import UserRestaurantView from "./UserRestaurantView";
import UserOrderView from "./UserOrderView";

class UserView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        fetch("/user").then(user => {
            this.processUser(user)
        }).catch(err => {
            this.handleError(err);
        });
    }

    handleError(err) {
        this.setState({
            error: true
        });
    }

    processUser(user) {
        if(!user.error) {
            this.setState({
                user: user
            });
        } else {
            this.handleError(user.error);
        }
    }

    getActiveView() {
        if(this.props.restaurantViewOpen) {
            return this.RestaurantView()
        } else if(this.props.orderViewOpen) {
            return this.OrderView()
        } else {
            return null;
        }
    }

    OrderView() {
        return (
            <UserOrderView
                user={this.state.user}
                orders={this.props.orders}
                open={this.props.orderViewOpen}
                close={this.props.closeOrderView}
            />
        );
    }

    RestaurantView() {
        return (
            <UserRestaurantView
                user={this.state.user}
                open={this.props.restaurantViewOpen}
                close={this.props.closeRestaurantView}
                restaurants={this.props.restaurants}
                menus={this.props.menus}
            />
        );
    }

    render() {
        return this.getActiveView();
    }
}

export default UserView;
