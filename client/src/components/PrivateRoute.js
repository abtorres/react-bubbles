import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

import BubblePage from './BubblePage';

const PrivateRoute = (props) => (
    <Route exact path='/bubblePage'
        {...props}
        render={props => 
            localStorage.getItem('token') ? (
                <BubblePage {...props} />
            ) : (
                <Redirect to='login'/>
            )
        }
    />
);

export default PrivateRoute;