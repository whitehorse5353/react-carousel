import AppDispatcher from '../Dispatcher/CarouselDispatcher';
import AppConstants from  '../Constants/CarouselConstants';

class AppActions {

    dispatch(actionType: string, data?: Object) {
        console.log('action' , 'dispatcher',data);
        AppDispatcher.dispatch({ actionType:actionType, data:data });
    }

    initLoad(data?: Object) {
        console.log('action', 'init load', data)
        this.dispatch(AppConstants.GET_SLIDES_DATA, data);
    }

    clickNext(data?: Object){
      console.log('action','click next' , data);
      this.dispatch(AppConstants.CLICK_NEXT,data);
    }

    clickPrev(data?: Object){
      console.log('action','click prev',data);
      this.dispatch(AppConstants.CLICK_PREV,data);
    }

    toggleSlide(data?: Object){
      console.log('action','toggle slide',data);
      this.dispatch(AppConstants.TOGGLE_SLIDE,data);
    }

};

export default new AppActions();
