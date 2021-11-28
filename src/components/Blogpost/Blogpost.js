import React, { Component } from "react";
import PostContainer from "../PostContainer/PostContainer";
import Posts from "../posts/Posts";

export default class Blogpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            formTodos: {
                title: "",
            },
            isUpdate: {
                update: false,
                id: null,
            },
        };
    }

    getTodos = async () => {
        const response = await fetch(`http://localhost:3000/todos`);
        const result = await response.json();

        this.setState({
            todos: await result,
        });
    };

    postTodos = async () => {
        await fetch(`http://localhost:3000/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({
                id: this.state.todos.length + 1,
                ...this.state.formTodos,
            }),
        });

        alert("Data berhasil dibuat");

        this.setState({
            formTodos: {
                title: "",
            },
        });

        this.getTodos();
    };

    deleteTodos = async (id) => {
        await fetch(`http://localhost:3000/todos/${id}`, {
            method: "DELETE",
        });

        alert("Data berhasil dihapus");

        this.getTodos();
    };

    editTodos = async () => {
        const { id } = this.state.isUpdate;

        await fetch(`http://localhost:3000/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(this.state.formTodos),
        });

        alert("Data berhasil diedit");

        this.getTodos();
    };

    onHandleChange = (event) => {
        const newFormTodos = { ...this.state.formTodos };
        newFormTodos[event.target.name] = event.target.value;

        this.setState({
            formTodos: {
                title: newFormTodos.title,
            },
        });
    };

    onHandleSubmit = (event) => {
        event.preventDefault();

        if (!this.state.formTodos.title) {
            alert("Data harus diisi");
            return false;
        }

        if (this.state.isUpdate.update) {
            this.editTodos();
        } else {
            this.postTodos();
        }

        this.setState({
            isUpdate: {
                update: false,
                id: null,
            },
            formTodos: {
                title: "",
            },
        });
    };

    onHandleHapus = (id) => {
        this.deleteTodos(id);
    };

    onHandleEdit = (id) => {
        const newTodos = [...this.state.todos];
        const foundData = newTodos.find((todo) => todo.id === id);

        this.setState({
            isUpdate: {
                update: true,
                id,
            },
            formTodos: {
                title: foundData.title,
            },
        });
    };

    componentDidMount() {
        this.getTodos();
    }

    render() {
        return (
            <>
                <form onSubmit={this.onHandleSubmit}>
                    <label htmlFor="tugas">
                        <span>Tugas Anda</span>
                        <input
                            type="text"
                            id="tugas"
                            value={this.state.formTodos.title}
                            onChange={this.onHandleChange}
                            name="title"
                        />
                    </label>
                    <button>Simpan</button>
                </form>
                <PostContainer>
                    <Posts
                        todos={this.state.todos}
                        hapus={this.onHandleHapus}
                        edit={this.onHandleEdit}
                    />
                </PostContainer>
            </>
        );
    }
}
