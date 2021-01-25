import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {todoReducer} from "./slice/todo.slice";

const rootReducer = combineReducers({
    todos: todoReducer
})

const middleware = [...getDefaultMiddleware()];

export default configureStore({
    reducer: rootReducer,
    middleware
});
