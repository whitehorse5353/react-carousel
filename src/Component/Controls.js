import React from 'react';

class Controls extends React.Component{
  constructor(props) {
    super(props);
    this.slideNext = this.slideNext.bind(this);
    this.slidePrev = this.slidePrev.bind(this);
    this.toggleSlide=this.toggleSlide.bind(this);    
  }
  renderPrev(){
  	var prevButton = undefined;
  	if(this.props.currentSlide != 0 && this.props.slideCount > 1) {
		    prevButton = (<a className='carousel-control-prev' onClick={this.slidePrev}>{'<'}</a>);
    }
    return prevButton;
  }
  renderNext(){
  	var nextButton = undefined;
  	if(this.props.currentSlide < this.props.slideCount - 1 && this.props.slideCount > 1) {
		  nextButton = (<a className='carousel-control-next' onClick={this.slideNext}>{'>'}</a>);
    }
    return nextButton;
  }
  renderPagination(){
    return(
      <div className='carousel-pagination'>
        {this.props.data.map((paginationNode,index)=>{          
          var classNames= 'pager';
          if(index === this.props.currentSlide){
              classNames+=" active";
            }
          return(
            
            <a className={classNames} key={paginationNode.id} id={paginationNode.id}  title={paginationNode.title} onClick={this.toggleSlide.bind(this,paginationNode.id)}>{paginationNode.dataId}</a>
          )
        }, this)}; 
        
      </div>
    ) 
  }
  render() {
    return (
      <div>
    		{this.renderPrev()}
        {this.renderNext()}
        <div className='pagination'>
          {this.renderPagination()}
        </div>
      </div>
    );
  }
  slidePrev(){
    this.props.slidePrev();
  }
  slideNext(){
    this.props.slideNext();
  }
  toggleSlide(i){
    this.props.toggleSlide(i)
  }
  
};

Controls.propTypes= {
    slideCount: React.PropTypes.number,
    currentSlide: React.PropTypes.number
}  

export default Controls;
