import React from 'react';
import Controls from './Controls';
import AppActions from '../Action/CarouselActions';
import AppStore from '../Store/CarouselStore';
import API from '../API';  

class CarouselContainer extends React.Component{
  
  constructor(props) {
    super(props);
    this.state={
      currentSlide : AppStore.getCurrentSlide(),
      data : AppStore.getSlides(),
      width : 600,
      autoPlay : false,
      autoPlayInterval : 1000,
      infiniteScroll : true,
      direction : 'right'
    };
    this.slidePrev = this.slidePrev.bind(this);
    this.slideNext = this.slideNext.bind(this);
    this.toggleSlide = this.toggleSlide.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  createSlide(item,i){
    return (
      <li className='slide'>
        <img src={item.imagePath} alt={item.imageAlt} className='crsl-img'/>
        
      </li>
    );
  }

  componentDidMount(){
    API.getSlidesData();
        
    
    if(this.state.autoPlay){
      this._autoScroll();
    }
  }
  _autoScroll(){
    this._infiniteScroll = setInterval(function(){
      var currentSlide = this.state.currentSlide,
        length = this.state.data.length;

      this.setState({
        currentSlide : (currentSlide + 1) % length
      });
      if (!this.state.infiniteScroll && currentSlide + 1 === length - 1) {
        console.log("last")
        clearInterval(this._infiniteScroll);
      }

    }.bind(this),this.state.autoPlayInterval)

  }
  componentWillMount(){
    AppStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    AppStore.removeChangeListener(this._onChange);
  }
  
  getState(){
    console.log('getState', AppStore.getSlides());
    return {
      data : AppStore.getSlides(),
      currentSlide:AppStore.getCurrentSlide()
    }
  }

  render() {
    var items = this.state.data.length,
        currentSlide = this.state.currentSlide,
        width = this.state.width,
        trackWidth = items * width,
        slideLeftPosition = -(width * currentSlide),
        slideRightPosition = (currentSlide === 0) ? trackWidth - width : trackWidth - (width * (currentSlide + 1)),
        styleObj = (this.state.direction === 'left') ? { width: trackWidth, marginLeft: slideLeftPosition} : { width: trackWidth, right: slideRightPosition, 'flexDirection' :'row-reverse'};
        
    if(this.state.data.length>0){
      return (
        <div ref="carouselComponent" className='carousel-wrapper'>
          <div className='carousel'>
              <ul  style={styleObj}>
                {this.state.data.map((element,index)=>{return this.createSlide(element,index)})}
              </ul>
            
          </div>
            <Controls currentSlide={this.state.currentSlide} slideCount={this.state.data.length} data={this.state.data} slidePrev={this.slidePrev} slideNext={this.slideNext} toggleSlide={this.toggleSlide}/>
        </div>
      );
    }else{
      return <div ref="carouselComponent">Loading............</div>
    }
  }

  slidePrev() {
    var slideCount = this.state.data.length;
    AppActions.clickPrev({currentSlide:this.state.currentSlide,slideCount:slideCount});
    if (this.state.autoPlay) {
      console.log("Prev clicked")
      clearInterval(this._infiniteScroll);
    }    
  }

  slideNext() {
    var slideCount = this.state.data.length;
    AppActions.clickNext({currentSlide:this.state.currentSlide,slideCount:slideCount});
    if (this.state.autoPlay) {
      console.log("Next clicked")
      clearInterval(this._infiniteScroll);
    }    
  }

  toggleSlide(i){
    AppActions.toggleSlide({currentSlide:i});
    if (this.state.autoPlay) {
      console.log("dots clicked")
      clearInterval(this._infiniteScroll);
    }
  }

  _onChange() {
    console.log('chnage');
    if(document.getElementById('wrapper').innerHTML!=""){
      this.setState(this.getState());
    }  
  }  
}

CarouselContainer.propTypes = {
    data: React.PropTypes.array,
    currentSlide: React.PropTypes.number
}

export default CarouselContainer;
