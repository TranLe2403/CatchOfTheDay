import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base'
import PropTypes from 'prop-types';

class App extends React.Component{

    state = { //State is an object
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    }
componentDidMount(){
    console.log("Mounted!!!")
    const {params} = this.props.match
    //first reinstate out localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    console.log(localStorageRef);
    if(localStorageRef){
        this.setState({ order: JSON.parse(localStorageRef)})
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, { //ref is sort of the reference to a piece of data in database
        context: this,
        state: 'fishes'
    });
}

componentDidUpdate(){
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    console.log("updated");
}

componentWillUnmount(){
    base.removeBinding(this.ref);
    console.log("Unmounting....")
}


    addFish = (fish) => {
        const fishes = {...this.state.fishes}; //1. take a copy of the existing state in App Component
        //2. Add our new fish to that fishes var
        fishes[`fish${Date.now()}`] = fish; //[...] in this line give the unique key
        //3. Set the new fishes obj to state
        this.setState({fishes}); // if the initial state name is the same with new state, Can write like this. Old line: fishes: fishes
        console.log(fishes); 
        //this.state.fishes.push(fish);
    };

    updateFish = (key, updatedFish) => {
        //1. take a copy of the current state
        const fishes = {...this.state.fishes};
        //2. upd that state 
        fishes[key] = updatedFish;
        //3. set that to state
        this.setState({fishes});
    }

    deleteFish = (key) => {
        const fishes = {...this.state.fishes}; //1. take a copy of state
        fishes[key] = null; //2. upddate the state
        this.setState({fishes}); //3. update state
    }

    
    LoadSampleFishes = () => {
        this.setState({fishes: sampleFishes}); //update fishes with object sampleFishes
        console.log(this.state)
    };

    addToOrder = (key) => {
        //1. Add a copy of state
        const order = {...this.state.order};
        //2. Either add to the order ot update the num in our order
        order[key] = order[key] + 1 || 1;
        //3. Call setState to uod our state obj
        this.setState({order});
        console.log(order);
    }
    removeOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({order});
    }

    render(){
        return (
            <div className = "catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map( //wrap all the keys of fishes (state) with object to map
                            key => <Fish 
                                key={key} 
                                index={key} //to access the key
                                details={this.state.fishes[key]} 
                                addToOrder={this.addToOrder} 
                            />)}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order} 
                    removeOrder={this.removeOrder}
                />
                <Inventory 
                    addFish={this.addFish} 
                    updatedFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    LoadSampleFishes={this.LoadSampleFishes} 
                    fishes = {this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        );
    }
}
export default App;