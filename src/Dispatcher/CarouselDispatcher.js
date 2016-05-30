import {Dispatcher} from 'flux';

var AppDispatcher = new Dispatcher();


Dispatcher.handleViewAction = action => {
    this.dispatch({ source: 'VIEW_ACTION', action });
};

export default AppDispatcher;
