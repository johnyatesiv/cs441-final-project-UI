import React from 'react';
import "./Cart.css";
import Popover from '@material-ui/core/Popover';
import { Fastfood, Close } from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
//import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
//import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    calculateTotal() {
        let total = 0;

        for(var item in this.props.items) {
            total += item.price*item.quantity;
        }

        return total;
    }

    removeItem(id) {
        this.props.removeItemFromCart(id);
    }

    render() {
        return (
            <Popover
                className="Cart"
                open={this.props.open}
            >
                <IconButton
                    onClick={this.props.close}
                >
                    <Close />
                </IconButton>
                <div className="CartContent">
                    <Grid
                        className="CartGrid"
                        container
                        direction="column"
                        justify="left"
                        alignItems="left"
                        spacing={16}
                    >
                        {
                            this.props.items.map((item) => {
                                return (<CartItem key={item.id} item={item}></CartItem>);
                            })
                        }
                        <br />
                        <b>Total:</b> ${this.calculateTotal()}
                    </Grid>
                </div>
            </Popover>
        );
    }
}

class CartItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card
                className="CartItem"
            >
                {this.props.item.name}  x {this.props.item.quantity}<br />
                ${this.props.item.price * this.props.item.quantity}

            </Card>
        );
    }
}

export default Cart;