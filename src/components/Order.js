import React from 'react';
import {formatPrice} from "../helpers";
import {TransitionGroup, CSSTransition} from "react-transition-group"
import PropTypes from 'prop-types';

class Order extends React.Component{
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeOrder: PropTypes.func
    }
    renderOrder = key => { //created when too much code in render() and cannot move to seperate component bc it just needs in this component
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        //make sure the fish is loaded before we continue
        if(!fish) return null;

        if(!isAvailable){
            return (
                <CSSTransition classNames="order" key={key} timeout={{enter: 250, exit: 250}} >
                     <li key={key}>Sorry {fish ? fish.name : "fish"} is no longer available</li>
                </CSSTransition>
            )
        }

        return (
            <CSSTransition classNames="order" key={key} timeout={{enter: 250, exit: 250}} >
            <li key={key}>
            {count} lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeOrder(key)}>&times;</button>
            </li>
            </CSSTransition>
        );    
}
    render(){
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];//count how many fish they are buying 
            const isAvailable = fish && fish.status === 'available';//check if it is available 
            if(isAvailable){
                return prevTotal + (count * fish.price);
            }
            return prevTotal
        }, 0); //0 means the starting val
        return(
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                   {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                   Total:
                    <strong>{formatPrice(total)}</strong>
                </div>

            </div>
        );
    }
}
export default Order;