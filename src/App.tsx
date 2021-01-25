import React, {useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {addTodoActionCreator, removeTodoActionCreator, todos, toggleTodoActionCreator} from "./store/slice/todo.slice";
import {IState, ITodo} from "./type";

function App(): JSX.Element {
    return (
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <div>
                <TodoInput/>
            </div>
            <div>
                <h3>TodoList</h3>
                <hr/>
                <TodoItems/>
            </div>
        </div>
    );
}

function TodoInput(): JSX.Element {
    const dispatch = useDispatch();
    const [desc, setDesc] = useState<string>('');

    const onAddTodo = (): void => {
        if (desc) {
            dispatch(addTodoActionCreator({desc}));
            setDesc('')
        } else {
            alert('Please input text!');
        }
    }

    return (
        <div>
            <h3>Input</h3>
            <input value={desc} onChange={(e) => setDesc(e.target.value)}/>
            <button onClick={onAddTodo}>Add</button>
        </div>
    );
}

function TodoItems(): JSX.Element {
    const list = useSelector<IState, Array<ITodo>>(todos);
    const dispatch = useDispatch();

    const onToggle = (key: string): void => {
        dispatch(toggleTodoActionCreator({key}));
    }

    const onRemove = (key: string): void => {
        dispatch(removeTodoActionCreator({key}));
    }

    return (
        <ul>
            {list.map(item => {
                return (
                    <li key={item.key} style={{textDecoration: item.isComplete ? 'line-through' : 'inherit'}}>
                        {item.desc}
                        <button onClick={() => onToggle(item.key)}>{item.isComplete ? 'undone' : 'done'}</button>
                        <button onClick={() => onRemove(item.key)}>remove</button>
                    </li>
                );
            })}
        </ul>
    );
}

export default App;
