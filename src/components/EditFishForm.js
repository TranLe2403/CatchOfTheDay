import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component{
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        index: PropTypes.string,
        updateFish: PropTypes.func,
    }

    handleChange = (event) => {
        console.log(event.currentTarget.value);
        //upd that fish
        //1. take a copy of current fish
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updateFish(this.props.index, updatedFish)
    }

    render(){
        const{name, price, status, desc, image} = this.props.fish
        return (
            <div className="fish-edit">
                <input 
                    type="text" 
                    name="name" 
                    onChange={this.handleChange}
                    value={name}
                />
                <input 
                    type="text" 
                    name="price" 
                    onChange={this.handleChange}
                    value={price} 
                />
                <select 
                    type="text" 
                    name="status" 
                    onChange={this.handleChange}
                    value={status}
                >
                    <option value="available">Fresh!!!</option>
                    <option value="unavailable">Sold Out!!!</option>
                </select>
                <textarea 
                    name="desc" 
                    onChange={this.handleChange}
                    value={desc} 
                />
                <input 
                    type="text" 
                    name="image" 
                    onChange={this.handleChange}
                    value={image} 
                />
                <button onClick={() => this.props.deleteFish(this.props.index)}>Remove fish</button>
            </div>
        )
            

        
    }
}
export default EditFishForm;