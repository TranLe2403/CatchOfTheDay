import React from 'react'; //must import React when using jsx
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import StorePicker from "./StorePicker";
import App from "./App";
import NotFound from "./NotFound";
const Router = () => (
    <BrowserRouter>
        <Switch>
            {/*go exact path to StorePicker component when nothing is after slash */}
            <Route exact path="/" component={StorePicker}/> 
            {/*go to App component if there is the store/:storeID path  */}
            <Route path="/store/:storeId" component={App}/>
            {/*if not in above cases, go to NotFound component  */}
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>

);

export default Router;