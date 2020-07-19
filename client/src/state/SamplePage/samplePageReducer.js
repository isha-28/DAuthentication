import * as ActionTypes from './samplePageActionTypes';

export const Events = (state = { 
	events : []
}, action) => {
	switch(action.type){

		case ActionTypes.FETCH_EVENTS:
			return {...state,events: action.payload} 
 
		default: 
			return state;
	}
} 