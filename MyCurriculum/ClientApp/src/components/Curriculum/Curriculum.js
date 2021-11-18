import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
        const textArea = document.querySelector('textarea');
        const textRowCount = textArea ? textArea.value.substring(100).length : 0;
        const rows = textRowCount + 1;
        return (
            
            <div className="curriculum">
                <form onSubmit={this.handleSave}>
                    <input type="hidden" name="id" value={this.state.curriculum.id} />
                    <div className="row">
                        <div className="curriculum_left col-md-3">
                        </div>
                        <div className="curriculum_right col-md-9">
                            <div className="row">
                                <div className="form-group col-md-12">
                                    <div className="">
                                        <input className="name form-control text-center" type="text" name="name" placeholder="Nome" defaultValue="Jhoglas Shopsigner Xavier Rocha" required />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-12 mx-auto">
                                    <div className="">
                                        <input className="profession form-control text-left" type="text" name="profession" placeholder="Profissão" defaultValue="Programador Full Stack" required />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-12">
                                <div className="">
                                    <textarea rows={rows} className="resume form-control" name="resume" placeholder="Resumo" required>
                                        {this.state.curriculum.resume}
                                    </textarea>

                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="form-group col-md-12">
                                    <div className="">
                                        <input className="form-control" type="text" name="title" placeholder="Titulo" defaultValue={this.state.curriculum.title} required />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <div className="">
                                        <input className="form-control" type="text" name="email" placeholder="Email" defaultValue={this.state.curriculum.email} required />
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="">
                                        <input className="form-control" type="tel" name="telephone" placeholder="Telefone" defaultValue={this.state.curriculum.telephone} required />
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="">
                                        <input className="form-control" type="tel" name="cellphone" placeholder="Celular" defaultValue={this.state.curriculum.cellphone} required />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="form-group col-md-12">
                                    <button type="submit" className="btn btn-success" value={this.state.curriculum.id}>Salvar</button>
                                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    
                </form>
            </div>
        );
    }
}