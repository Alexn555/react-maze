import { combineReducers } from 'redux';
import MazeReducer from './maze-reducer';

const reducers = {
    mazeStore: MazeReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
