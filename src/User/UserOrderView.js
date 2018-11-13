import React from 'react';
import './UserOrderView.css';
import crypto from "crypto";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
//import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
//import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

/** Other Views **/

class UserOrderView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("orders:");
        console.log(props.orders);
    }

    componentDidMount() {

    }

    getOrderRestaurant(order) {
        return this.props.restaurants[order.restaurantId]
    }

    getOrderItems(order) {
        let restaurant = this.getOrderRestaurant(order);
        return [];
    }

    render() {
        return (
            <div
                className="UserOrderViewContainer"
            >
                <h1>Your Orders</h1>
                <Grid
                    className="UserOrderViewGrid"
                    container
                    direction="row"
                    justify="center"
                    alignItems="left"
                    spacing={40}
                >
                    {
                        this.props.orders.map(order => {
                            return (
                                <OrderSelection
                                    key={order.id}
                                    order={order}
                                    restaurant={this.getOrderRestaurant(order)}
                                    items={this.getOrderItems(order)}
                                ></OrderSelection>
                            );
                        })
                    }
                </Grid>
            </div>
        );
    }
}

class OrderSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    openItemSummary(order) {

    }

    hashOrderId(id) {
        return crypto.createHash('md5').update(id.toString()).digest('hex').substr(0, 8);
    }

    render() {
        return (
            <Card
                className="OrderCard"
                onClick={this.openItemSummary(this.props.order)}
            >
                <CardContent className="OrderCardContent">
                    Order {this.hashOrderId(this.props.order.id)}
                    <br/>
                    <CardMedia
                        className="OrderCardMedia"
                        component="img"
                    />
                    <br/>
                    From {this.props.restaurant.name}
                    {this.props.order.total}<br />
                    {this.props.order.state}
                </CardContent>
                <CardActions></CardActions>
            </Card>
        )
    }
}

export default UserOrderView;
