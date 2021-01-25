import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IState, ITodo} from "../../type";
import {v4 as uuidv4} from "uuid";

const findIndexByKey = (state: Array<ITodo>, payload: ITodo): number => {
    return state.findIndex(item => item.key === payload.key);
}

export const todoSlice = createSlice({
    name: 'todoSlice',
    initialState: [
        {
            key: uuidv4(),
            desc: 'React.js',
            isComplete: false
        }
    ],
    reducers: {
        add(state: Array<ITodo>, {payload}: PayloadAction<{ desc: string }>) {
            state.push({key: uuidv4(), isComplete: false, desc: payload.desc});
        },
        edit(state: Array<ITodo>, {payload}: PayloadAction<{ key: string, desc: string }>) {
            const index = findIndexByKey(state, payload);
            state[index].desc = payload.desc;
        },
        toggle(state: Array<ITodo>, {payload}: PayloadAction<{ key: string }>) {
            const index = findIndexByKey(state, payload);
            state[index].isComplete = !state[index].isComplete
        },
        remove(state: Array<ITodo>, {payload}: PayloadAction<{ key: string }>) {
            const index = findIndexByKey(state, payload);
            state.splice(index, 1);
        }
    }
});

export const {
    add: addTodoActionCreator,
    edit: editTodoActionCreator,
    toggle: toggleTodoActionCreator,
    remove: removeTodoActionCreator
} = todoSlice.actions;

export const todos = (state: IState): Array<ITodo> => state.todos;

export const todoReducer = todoSlice.reducer;

