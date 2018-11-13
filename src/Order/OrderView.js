import React from 'react';
import './OrderView.css';

class OrderView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        fetch("/orders").then(user => {
            if(!user.error) {
                this.setState({
                    user: user
                });
            } else {
                this.setState({
                    error: true
                });
            }
        }).catch(err => {
            this.setState({
                error: true
            });
        });
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default OrderView;
