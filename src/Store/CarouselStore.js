import AppDispatcher from '../Dispatcher/CarouselDispatcher';
import AppConstants from '../Constants/CarouselConstants'
import {EventEmitter} from 'events';

class AppStore extends EventEmitter{

	constructor(){
		super();		
		this.dispatchToken = AppDispatcher.register(this.onDispatch.bind(this));
		this._slides =[];
		this._currentSlide=0;
	}

	onDispatch(payload: Object):bool{
	  
	  var action = payload.actionType;
	  console.log('payload', payload)
	  switch(payload.actionType) {

	    case AppConstants.GET_SLIDES_DATA:
	      this.initLoad(payload);
	      break;

	    case AppConstants.CLICK_NEXT:
	      this.clickNext(payload);
	      break;

	    case AppConstants.CLICK_PREV:
	    	this.clickPrev(payload);
	    	break;

	    case AppConstants.TOGGLE_SLIDE:
	    	this.toggleSlide(payload);
	    	break;

	    default:
	      return true;
	  }
	
	}
	
	emitChange(){
		this.emit('change');
	}

	addChangeListener(callback: Function): void{
		console.log('addchange',callback);
		this.on('change',callback);
	}

	removeChangeListener(callback: Function): void{
		console.log('removechange', callback);
		this.removeListener('change',callback);
	}
	initLoad(action: Object): void {
		console.log('init load', action)
        this._slides = action.data || {};
        this.emitChange();
    }

    getSlides(){
    	console.log('getSlides', this._slides);
    	return this._slides;
    }

    clickPrev(action:Object):void{
    	console.log('click prev store', action)
    	this._currentSlide = ((action.data.currentSlide + action.data.slideCount-1) % action.data.slideCount);
    	this.emitChange();
    }

    getCurrentSlide(){
    	return this._currentSlide;
    }

    clickNext(action:Object):void{
    	console.log('click next store',action);
    	this._currentSlide = (action.data.currentSlide + 1) % action.data.slideCount;
    	this.emitChange();
    }

    toggleSlide(action:Object):void{
    	console.log('toggle click ' , action);
    	this._currentSlide = (action.data.currentSlide);
    	this.emitChange();
    }
}

export default new AppStore();