import React, { Component } from 'react';
import { CurriculumExperience } from '../Curriculum/CurriculumExperience';

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

export class CurriculumEdit extends Component {
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
        this.props.history.push("/CurriculumEdit")
    }

    handleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.curriculum.id > 0) {
            fetch('api/Curriculums/' + this.state.curriculum.id, { method: "PUT", body: data });
            this.props.history.push("/CurriculumEdit");
        }
        else
        {
            fetch('api/Curriculums/', { method: "POST", body: data });
            this.props.history.push("/CurriculumEdit");
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : this.renderEditCurriculum();
        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>Tela do Curriculum</p>
                {contents}
            </div>
        );
    }

    renderEditCurriculum() {
        const CurriculumExperience_content = new CurriculumExperience(this.state.curriculum.id);
        return (
           
            
            <div className="row curriculumEdit">
                <form onSubmit={this.handleSave}>
                <input type="hidden" name="id" value={this.state.curriculum.id} />
                    <div className="col-md-12 dados">
                        <div className="row">
                            <div className="input-group col-md-12">
                                <input className="form-control name" type="text" name="name" placeholder="Nome" defaultValue={this.state.curriculum.name} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-12">
                                <input className="form-control profession" type="text" name="profession" placeholder="Profissão" defaultValue={this.state.curriculum.name} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-12">
                                <textarea className="form-control resume" name="resume" required>
                                    {this.state.curriculum.resume}
                                </textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-12">
                                <input className="form-control title" type="text" name="title" placeholder="Titulo" defaultValue={this.state.curriculum.title} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-6">
                                <input className="form-control email" type="text" name="email" placeholder="Email" defaultValue={this.state.curriculum.email} required />
                            </div>
                            <div className="input-group col-md-3">
                                <input className="form-control telephone" type="text" name="telephone" placeholder="Telefone" defaultValue={this.state.curriculum.telephone} required />
                            </div>
                            <div className="input-group col-md-3">
                                <input className="form-control cellphone" type="text" name="cellphone" placeholder="Celular" defaultValue={this.state.curriculum.cellphone} required />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 address">
                        <div className="row">
                            <div className="input-group col-md-2">
                                <input className="form-control zip-code" type="text" name="zip-code" placeholder="00000-000" defaultValue={this.state.curriculum.name} required />
                            </div>
                            <div className="input-group col-md-6">
                                <input className="form-control road" type="text" name="road" placeholder="rua" defaultValue={this.state.curriculum.name} required />
                            </div>
                            <div className="input-group col-md-4">
                                <input className="form-control district" type="text" name="district" placeholder="bairro" defaultValue={this.state.curriculum.name} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-8">
                                <input className="form-control city" type="text" name="city" placeholder="Cidade" defaultValue={this.state.curriculum.name} required />
                            </div>
                            <div className="input-group col-md-4">
                                <input className="form-control state" type="text" name="state" placeholder="Estado" defaultValue={this.state.curriculum.name} required />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 address">
                        <div className="row">
                            <div className="input-group col-md-2">
                                <input className="form-control zip-code" type="text" name="zip-code" placeholder="00000-000" defaultValue={this.state.curriculum.name} required />
                            </div>
                            <div className="input-group col-md-6">
                                <input className="form-control road" type="text" name="road" placeholder="rua" defaultValue={this.state.curriculum.name} required />
                            </div>
                            <div className="input-group col-md-4">
                                <input className="form-control district" type="text" name="district" placeholder="bairro" defaultValue={this.state.curriculum.name} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-8">
                                <input className="form-control city" type="text" name="city" placeholder="Cidade" defaultValue={this.state.curriculum.name} required />
                            </div>
                            <div className="input-group col-md-4">
                                <input className="form-control state" type="text" name="state" placeholder="Estado" defaultValue={this.state.curriculum.name} required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-12">
                            <button type="submit" className="btn btn-success" value={this.state.curriculum.id}>Salvar</button>
                            <button className="btn btn-danger" onClick={this.handleCancel}>Cancelar</button>
                        </div>
                    </div>
                </form>
                </div>
                
        );
    }
}