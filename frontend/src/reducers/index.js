import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';


function actionReducer(state = {}, action) {
  return action.type;
}


const rootReducer = combineReducers({
  action: actionReducer,
  routing,
  user,
});

export default rootReducer;
