import React, { Component } from "react";
import "./Posts.css";

export default class Posts extends Component {
    render() {
        const { todos } = this.props;
        return todos.map((todo, key) => (
            <div className="todo" key={key}>
                <div className="todo__header">
                    <h2>{todo.title}</h2>
                </div>
                <div className="todo__footer">
                    <button onClick={() => this.props.edit(todo.id)}>
                        Edit
                    </button>
                    <button onClick={() => this.props.hapus(todo.id)}>
                        Hapus
                    </button>
                </div>
            </div>
        ));
    }
}
