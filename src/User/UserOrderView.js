import React from 'react';
import './UserOrderView.css';
import crypto from "crypto";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
//import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
//import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { Cached, CheckCircleOutline } from '@material-ui/icons';

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
        if(this.props.restaurants[order.restaurantId]) {
            return this.props.restaurants[order.restaurantId]
        } else {
            return {};
        }
    }

    getOrderItems(order) {
//        let restaurant = this.getOrderRestaurant(order);
        return [];
    }

    getOrders() {
        let orders = [];

        for(var k in this.props.orders) {
            orders.push(this.props.orders[k]);
        }

        return orders;
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
                    alignItems="center"
                    spacing={40}
                >
                    {
                        this.getOrders().map((order) => {
                            if (order.state === "pending") {
                                return (
                                    <PendingOrderSelection
                                        key={order.id}
                                        order={order}
                                        restaurant={this.getOrderRestaurant(order)}
                                        items={this.getOrderItems(order)}
                                    ></PendingOrderSelection>
                                );
                            } else {
                                return (
                                    <FulfilledOrderSelection
                                        key={order.id}
                                        order={order}
                                        restaurant={this.getOrderRestaurant(order)}
                                        items={this.getOrderItems(order)}
                                    ></FulfilledOrderSelection>
                                );
                            }
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
    }

    openItemSummary(order) {

    }

    /**
     * hashOrderId
     * @param id
     * @returns {string}
     */
    hashOrderId(id) {
        return crypto.createHash('md5').update(id.toString()).digest('hex').substr(0, 8);
    }

    /**
     * orderItemsDisplay
     * @param orderItems
     * @returns {XML}
     */
    orderItemsDisplay(orderItems) {
        console.log("items:");
        console.log(orderItems);
        return (
            <Grid>
                {
                    orderItems.forEach((item) => {
                        if(item.item) {
                            return (
                                <Card styles={{width: "10%"}}>
                                    <CardMedia>
                                        <img src={item.item.image} />
                                    </CardMedia>
                                    <CardContent>
                                        {item.item.name}
                                    </CardContent>
                                </Card>
                            )
                        }
                    })
                }
            </Grid>
        )
    }

    /**
     * calculateTotal
     * @returns {string|*}
     */
    calculateTotal() {
        let total = 0;

        this.props.order.orderItems.forEach((item) => {
            if(item.item) {
                total += item.item.price;
            }
        });

        return total.toLocaleString("en-US", {style: "currency", currency: "USD"});
    }

    /**
     * total
     * @returns {XML}
     */
    total() {
        return (
            <span>{this.calculateTotal()}</span>
        );
    }

    /**
     * date
     * @returns {XML}
     */
    date() {
        return (<span>{new Date(this.props.order.createdAt).toLocaleString()}</span>);
    }

    /**
     * itemCountDisplay
     * @returns {*}
     */
    itemCountDisplay() {
        if(this.props.order.orderItems) {
            let count = this.props.order.orderItems.length;
            if(count > 1) {
                return count+" Items";
            } else {
                return count+" Item";
            }
        } else {
            return '';
        }
    }

    /**
     * status
     * @returns {XML}
     */
    status() {
        return (
            <Button className="StatusButton">
                {this.props.order.status}
            </Button>
        );
    }
}

class FulfilledOrderSelection extends OrderSelection {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.props);
        return (
            <Card
                className="FulfilledOrderCard"
            >
                <CardContent className="OrderCardContent">
                    <CheckCircleOutline fontSize="large" className="LeftIcon" />
                    <br/>
                    <span className="OrderCardHeader">
                        {this.total()}
                        <br/>
                        from {this.props.restaurant.name}
                        <br/>
                        {this.itemCountDisplay()}
                    </span>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        )
    }
}

class PendingOrderSelection extends OrderSelection {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card
                className="PendingOrderCard"
            >
                <CardContent className="OrderCardContent">
                    <Cached fontSize="large" className="LeftIcon" />
                    <br/>
                    <span className="OrderCardHeader">
                        {this.total()}
                        <br/>
                        from {this.props.restaurant.name}
                    </span>
                    <br />
                    {this.orderItemsDisplay(this.props.order.orderItems)}
                    <span className="OrderCardData">
                        at {this.date()}
                    </span>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        )
    }
}

export default UserOrderView;
