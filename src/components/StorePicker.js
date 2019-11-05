import React from 'react';
import {getFunName} from '../helpers';
import PropTypes from 'prop-types';

class StorePicker extends React.Component{
    static propTypes = {
        history: PropTypes.object
    }
    /* 
    constructor(){
        super(); //to call parent component first - React.Component
        this.goToStore = this.goToStore.bind(this);
    }
    */

    myInput = React.createRef(); //create an empty ref
    goToStore = (event) => {    
        event.preventDefault(); //1. Stop the form from submitting
        const storeName = this.myInput.current.value;   //2. Get the text from that input
        //3. Change the page to /store/whatever-they-entered
        this.props.history.push(`/store/${storeName}`) //change the url without refresh the page:
    };

    //Cannot call "this" in goToStore, in case if dont use State => must do 1 in 2 way below
    // 1. have to bind "this" by using constructor
    // 2. create an arrow function (a property not a method) => can call "this" in property
    render(){
        return (
            <form className="store-selector" onSubmit={this.goToStore} >
                <h2>Please Enter A Store</h2>
                <input 
                    type="text" 
                    ref={this.myInput} //reference the input without using doc.querySec
                    required 
                    placeholder="Store Name" 
                    defaultValue={getFunName()} />
                <button type="submit">Visit Store</button>
            </form>
        );
    }
    
}           

export default StorePicker;