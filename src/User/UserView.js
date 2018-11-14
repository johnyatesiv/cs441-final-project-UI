import React from 'react';
import './UserView.css';
import UserRestaurantView from "./UserRestaurantView";
import UserOrderView from "./UserOrderView";
import Cart from "../Order/Cart";

class UserView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

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
            <div>
                <UserOrderView
                    user={this.state.user}
                    orders={this.props.orders}
                    restaurants={this.props.restaurants}
                    menus={this.props.menus}
                    open={this.props.orderViewOpen}
                    close={this.props.closeOrderView}
                />
                <Cart
                    open={this.state.cartOpen}
                    close={this.closeCart}
                    cartItems={this.props.cartItems}
                    removeItemFromCart={this.removeItemFromCart}
                ></Cart>
            </div>
        );
    }

    RestaurantView() {
        return (
            <div>
                <UserRestaurantView
                    user={this.state.user}
                    open={this.props.restaurantViewOpen}
                    close={this.props.closeRestaurantView}
                    restaurants={this.props.restaurants}
                    menus={this.props.menus}
                    addItemToCart={this.props.addItemToCart}
                    closeCart={this.props.closeCart}
                />
                <Cart
                    open={this.props.cartOpen}
                    close={this.props.closeCart}
                    cartItems={this.props.cartItems}
                    removeItemFromCart={this.removeItemFromCart}
                    checkout={this.props.checkout}
                ></Cart>
            </div>
        );
    }

    render() {
        return this.getActiveView();
    }
}

export default UserView;
