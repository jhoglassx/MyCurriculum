import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class CurriculumModel {
    constructor() {
        this.id = 0;
        this.title = "";
        this.email = "";
        this.telephone = "";
        this.cellphone = "";
        this.resume = "";
    }
}

export class Curriculum extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", curriculum: new CurriculumModel(), loading: true };
        this.initialize();

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    async initialize() {
        
        var id = this.props.match.params["id"];
        
        if (id > 0) {
            const response = await fetch('api/Curriculums/' + id);
            const data = await response.json();
            this.setState({ title: "Edit", curriculum: data, loading: false });
        }
        else
        {
            this.state = { title: "Create", curriculum: new CurriculumModel(), loading: false };
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/Curriculum")
    }

    handleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.curriculum.id > 0) {
            const response1 = fetch('api/Curriculums/' + this.state.curriculum.id, { method: "PUT", body: data });
            this.props.history.push("/Curriculum");
        }
        else
        {
            const response2 = fetch('api/Curriculums/', { method: "POST", body: data });
            this.props.history.push("/Curriculum");
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : this.renderCurriculum();
        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>Tela do Curriculum</p>
                {contents}
            </div>
        );
    }

    renderCurriculum() {
        return (
            <div className="">
                <form onSubmit={this.handleSave}>

                    <div className="form-group row">
                        <input type="hidden" name="id" value={this.state.curriculum.id} />
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6">
                            <input className="form-control" type="text" name="title" value={this.state.curriculum.title} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6">
                            <input className="form-control" type="text" name="email" value={this.state.curriculum.email} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6">
                            <input className="form-control" type="text" name="telephone" value={this.state.curriculum.telephone} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6">
                            <input className="form-control" type="text" name="cellphone" value={this.state.curriculum.cellphone} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <input className="form-control" type="text" name="resume" value={this.state.curriculum.resume} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <button type="submit" className="btn btn-success" value={this.state.curriculum.id}>Salvar</button>
                        <button className="btn btn-danger" onClick={this.handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        );
    }
}