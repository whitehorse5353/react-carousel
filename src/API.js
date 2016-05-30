import AppActions  from  './Action/CarouselActions';
import data from '../data/data';

export default {

  // Load mock product data from localStorage into ProductStore via Action
  getSlidesData: function() {
  	
    var data = [
  {
    'id': 0,
    'dataId':1,
    'imagePath': './images/img1.jpg',
    'imageAlt': 'Slide 1 Image',
    'title': 'Slide 1'    
  },
  {
    'id': 1,
    'dataId':2,
    'imagePath': './images/img2.jpg',
    'imageAlt': 'Slide 2 Image',
    'title': 'Slide 2'    
  },
  {
    'id': 2,
    'dataId':3,
    'imagePath': './images/img3.jpg',
    'imageAlt': 'Slide 3 Image',
    'title': 'Slide 3'
  }
];
    AppActions.initLoad(data);
  }

};
