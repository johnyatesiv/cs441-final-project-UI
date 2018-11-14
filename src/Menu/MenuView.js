import React from 'react';
import "./MenuView.css";
import Popover from '@material-ui/core/Popover';
import { Fastfood, Close } from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.props.menu);
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
                <Close className="CloseButton" onClick={this.props.close}></Close>
                <br />
                <div className="ActiveMenu">
                    <Grid
                        container
                        direction="row"
                        justify="left"
                        alignItems="left"
                        spacing={16}
                    >
                        <h1>Menu</h1><br />
                        {(this.props.menu.map((item) => {
                            return <MenuItem key={item.id} item={item}></MenuItem>
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

    onClick() {

    }

    render() {
        return (
            <Card
                className="MenuItemCard"
                onClick={this.onClick.bind(this)}
            >
                <CardContent className="MenuItemCardContent">
                    <Fastfood />
                    <br/>
                    {this.props.item.name}
                    <br/>
                    ${this.props.item.price}
                    <CardActions>
                        <Button>Order</Button>
                    </CardActions>
                </CardContent>
            </Card>
        );
    }
}

export default Menu;