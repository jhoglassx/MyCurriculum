﻿import React, { Component } from 'react'

//import './components/Curriculum/Curriculum.css'

export class Curriculums extends Component {
    static displayName = "Curriculo";

    constructor() {
        super();
        this.state = { curriculums: [], loading: true }
    }

    async loadCurriculum() {
        const response = await fetch('api/Curriculums');
        const data = await response.json();
        this.setState({ curriculums: data, loading: false });
    }

    componentDidMount() {
        this.loadCurriculum();
    }

    static handledEdit(id) {
        window.location.href = "/curriculo/edit/" + id;
    }

    static handledView(id,name) {
        window.location.href = "/curriculo/" + id+"/"+name;
    }

    static handledDelete(id) {
        if (!window.confirm("Você deseja deletar este Curriculo : " + id)) {
            return;
        }
        else
        {
            fetch('api/Curriculums/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "curriculos";
                    alert('Deletado com Sucesso');
                })
        }
    }
    static renderCurriculum(curriculums) {
        return (
            <table className='table table-striped' aria-labelledby='tableLabel'>
                <thead>
                    <th>id</th>
                    <th>Email</th>
                    <th></th>
                </thead>
                <tbody>
                    {curriculums.map(c =>
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.email}</td>
                            <td>
                                <button className='btn btn-success' onClick={(id) => this.handledView(c.id, c.name)}>Ver</button>
                                <button className='btn btn-success' onClick={(id) => this.handledEdit(c.id)}>Edit</button>
                                <button className='btn btn-danger' onClick={(id) => this.handledDelete(c.id)}>Delete</button>
                            </td>
                        </tr>
                        )}
                </tbody>
            </table>
            );
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : Curriculums.renderCurriculum(this.state.curriculums);

        return (
            <div>
                <h1 id="tabelLabel">Curriculuns</h1>
                <p>Tela de Listagem de Curriculuns</p>
                <p>
                    {/*<link to="/add-curriculum">Cadastrar curriculum</link>*/}
                </p>
                {contents}
            </div>
            );
    }
}