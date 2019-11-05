import React from 'react';
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import PropTypes from 'prop-types';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from "../base";


class Inventory extends React.Component{
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        LoadSampleFishes: PropTypes.func
    }
    authHandler = async authData => {
        //1.Look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, {context: this});
        console.log(store)
        //2.Claim it if there is no owner

        //3.Set the state of the inventory component to reflect the current user
        console.log(authData)
    }
    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    }
    render(){
        return <Login authenticate={this.authenticate}/>
        return(
            <div className="inventory">
                <h2>Inventory!!!</h2>
                {Object.keys(this.props.fishes).map(key =>( 
                    <EditFishForm 
                        fish={this.props.fishes[key]} 
                        key={key}
                        index={key}
                        updateFish={this.props.updatedFish}  
                        deleteFish={this.props.deleteFish}  
                    />))}
                <AddFishForm  addFish={this.props.addFish} />
                <button onClick={this.props.LoadSampleFishes} >Load Sample Fishes</button>
            {/*LoadSampleFishes func need to create in App bc App contains all the needing state */}
            </div>

        );
    }
}
export default Inventory;