export interface ITodo {
    key: string,
    desc?: string,
    isComplete?: boolean
}

export interface IState {
    todos: ITodo[]
}

