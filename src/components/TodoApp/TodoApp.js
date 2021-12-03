import React, { Component } from "react";
import TodoList from "../TodoList/TodoList";

export default class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    id: 1,
                    todo: "Membaca",
                },
                {
                    id: 2,
                    todo: "Menulis",
                },
            ],
            formTodo: {
                todo: "",
            },
            isUpdate: {
                update: false,
                id: null,
            },
        };
    }

    onHandleChange = (e) => {
        const newFormTodo = { ...this.state.formTodo };
        newFormTodo["todo"] = e.target.value;

        this.setState({
            formTodo: newFormTodo,
        });
    };

    onHandleEdit = (id) => {
        const newTodos = [...this.state.todos];
        const foundTodo = newTodos.find((todo) => todo.id === id);

        this.setState({
            formTodo: {
                todo: foundTodo.todo,
            },
            isUpdate: {
                update: true,
                id: id,
            },
        });
    };

    onHandleSubmit = (e) => {
        e.preventDefault();
        const { todos } = this.state;
        const { id, update } = this.state.isUpdate;
        const { todo } = this.state.formTodo;

        const newTodos = [...todos];

        if (!todo) {
            alert("Data harus diisi");
        } else {
            if (update) {
                const findIndex = newTodos.findIndex((todo) => todo.id === id);
                newTodos[findIndex] = { ...newTodos[findIndex], todo };
            } else {
                newTodos.push({ id: todos.length + 1, todo });
            }
        }

        this.setState({
            todos: newTodos,
            formTodo: {
                todo: "",
            },
            isUpdate: {
                update: false,
                id: null,
            },
        });
    };

    onHandleDelete = (id) => {
        const { todos } = this.state;
        const newTodos = [...todos];

        newTodos.splice(id, 1);

        this.setState({
            todos: newTodos,
        });
    };

    render() {
        return (
            <>
                <form onSubmit={this.onHandleSubmit}>
                    <input
                        type="text"
                        name="todo"
                        value={this.state.formTodo.todo}
                        onChange={this.onHandleChange}
                    />
                    <br />
                    <button>Simpan</button>
                </form>
                <TodoList
                    todos={this.state.todos}
                    handleEdit={(id) => this.onHandleEdit(id)}
                    handleDelete={(id) => this.onHandleDelete(id)}
                />
            </>
        );
    }
}
