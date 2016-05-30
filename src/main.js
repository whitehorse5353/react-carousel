import React from 'react';
import ReactDOM from 'react-dom';
import CarouselContainer from './Component/CarouselContainer';
import data from '../data/data';
import API from './API';

window.onload = () => {
	
    ReactDOM.render( < CarouselContainer 
        />,
        document.querySelector('#wrapper')
    );
};
