import React, { Component } from "react";

export default class TodoList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return !this.props.todos.length ? (
            ""
        ) : (
            <ul>
                {this.props.todos.map((todo, key) => (
                    <li key={key}>
                        <span>{todo.todo}</span>
                        <button onClick={() => this.props.handleEdit(todo.id)}>
                            Edit
                        </button>
                        <button onClick={() => this.props.handleDelete(key)}>
                            Hapus
                        </button>
                    </li>
                ))}
            </ul>
        );
    }
}
