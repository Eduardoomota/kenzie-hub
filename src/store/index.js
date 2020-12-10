import { combineReducers, createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

// REDUCERS
import techsReducer from './Modules/Techs/reducer'
import usersReducer from './Modules/Users/reducer'
import worksReducer from './Modules/Works/reducer'
import dataReducer from './Modules/Data/reducer'

const reducers = combineReducers({
    techs: techsReducer,
    users: usersReducer,
    works: worksReducer,
    data: dataReducer,
})

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
