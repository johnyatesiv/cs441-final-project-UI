import React from 'react';
import "./MenuView.css";
import Popover from '@material-ui/core/Popover';
import { Fastfood, Close } from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Popover
                className="ActiveMenuPopover"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                transformOrigin={{
                   vertical: 'top',
                   horizontal: 'left'
                }}
                open={this.props.open}
            >
                <Close className="CloseButton" onClick={this.props.closeMenu}></Close>
                <div className="MenuHeader">
                    <h1>Menu</h1>
                </div>
                <div className="ActiveMenu">
                    <Grid
                        direction="row"
                        justify="flex"
                        alignItems="flex"
                        spacing={16}
                    >
                        {(this.props.items.map((item) => {
                            return (
                                <MenuItem
                                    key={item.id}
                                    item={item}
                                    addItemToCart={this.props.addItemToCart}
                                    closeMenu={this.props.closeMenu}
                                ></MenuItem>
                            )
                        }))}
                    </Grid>
                </div>
            </Popover>
        )
    }
}

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    passItemToAppCart() {
        this.props.addItemToCart(this.props.item);
        //this.props.closeMenu();
    }

    render() {
        return (
            <Card
                className="MenuItemCard"
            >
                <CardContent className="MenuItemCardContent">
                    <CardMedia
                        className="MenuCardMedia"
                        component="img"
                        image={this.props.item.image}
                    >
                    </CardMedia>
                    <br/>
                    {this.props.item.name} ${this.props.item.price}
                    <CardActions>
                        <Button
                            className="MenuBuyButton"
                            onClick={this.passItemToAppCart.bind(this)}
                        >Order</Button>
                    </CardActions>
                </CardContent>
            </Card>
        );
    }
}

export default Menu;