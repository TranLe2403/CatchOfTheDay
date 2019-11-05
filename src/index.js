import React from 'react'; 
import {render} from 'react-dom'; //use curly braket when just wanna import a method
import './css/style.css';
import Router from "./components/Router"


// the render method takes 2 things: 1. take jsx(some html) 2. mounting point
render(<Router/>, document.querySelector("#main"));

