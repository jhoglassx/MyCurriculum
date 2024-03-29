﻿import React, { Component } from 'react';
import { format } from 'date-fns';

export class ExperienceModel {
    constructor(props) {
        this.id = props.id > 0 ? props.id : 0;
        this.curriculumId = props.curriculumId;
        this.dateHiring = props.id > 0 ? format(new Date(props.dateHiring), 'yyyy-MM-dd') : new Date();
        this.dateResignation = props.id > 0 && props.dateResignation != null ? format(new Date(props.dateResignation), 'yyyy-MM-dd') : null;
        this.company = props.company;
        this.occupation = props.occupation
        this.description = props.description;
    }
}

export class CurriculumExperience extends Component {

    constructor(props) {
        super(props);
        this.state = { title: "", experiences: [], loading: true };
        this.load();

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleAddExperience = this.handleAddExperience.bind(this);
        
    }
    async load() {
        var cid = Number(this.props.match.params["id"]);
        const response = await fetch('api/Experiences');

        const data = await response.json();
        
        if (data.length > 0) {

            const dataFilter = data.filter(exp => exp?.curriculumId === cid);

            var exp = this.state.experiences;

            for (var i = 0; i < dataFilter.length; i++) {
                exp.push(new ExperienceModel(dataFilter[i]));
                this.setState({ experiences: exp, loading: false });
            }
        } else {
            this.setState({ experiences: [new ExperienceModel({ curriculumId: cid })], loading: false });
        }
    }

    handleAddExperience(event) {
        event.preventDefault();

        var exp = this.state.experiences;

        exp.push(new ExperienceModel({ curriculumId: exp[0].curriculumId }));

        this.setState({ experiences: exp });
    };

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/curriculo/Edit")
    }

    handleChange(e, index) {
        const target = e.target;

        var exp = this.state.experiences;
        exp[index][target.name] = target.value;
        this.setState({ experiences: exp });
    }

    async handleSave(e) {
        e.preventDefault();

        for (var i = 0; i < this.state.experiences.length;i++) {
            
            const exp = this.state.experiences[i];

            if (exp.id > 0) {
                await fetch('api/Experiences/' + exp.id, {
                    method: "PUT",
                    contentType: 'application/json; charset=UTF-8',
                    headers: { 'Content-Type': 'application/json' },
                    dataType: 'json',
                    body: JSON.stringify(exp)
                })
                    .then(result => result.text())
                    .then(data => this.setState({ Id: data.id }));
            }
            else {
                await fetch('api/Experiences/', {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(exp)
                })
                    .then(result => result.text())
                    .then(data => console.log(data));
            }
        }
        this.props.history.push("/curriculo/abi/" + this.state.experiences[0].curriculumId);
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : this.renderExperiencia();
        return (
            <div>
                {contents}
            </div>
        );
    }

    renderExperiencia() {
        return (
            <div>
                <form onSubmit={this.handleSave}>

                    <div class="experiences">
                        <div class="card card-header">
                            Featured
                        </div>
                        {this.state.experiences.map((experience, index) => (
                            <div key={index} className="card card-item experience">
                                <input type="hidden" name="id" value={experience.id} />
                                <div className="row">
                                    <div className="input-group col-md-12">
                                        <input className="form-control company" type="text" name="company" id={index} placeholder="Contratante" defaultValue={experience.company} onBlur={(e) => this.handleChange(e, index)} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-group col-md-6">
                                        <input className="form-control occupation" type="text" name="occupation" placeholder="Ocupação" defaultValue={experience.occupation} onBlur={(e) => this.handleChange(e, index)} required />
                                    </div>
                                    <div className="input-group col-md-3">
                                        <input className="form-control dateHiring" type="date" name="dateHiring" placeholder="Data de Contratação" defaultValue={experience.dateHiring} onBlur={(e) => this.handleChange(e, index)} required />
                                    </div>
                                    <div className="input-group col-md-3">
                                        <input className="form-control dateResignation" type="date" name="dateResignation" placeholder="Data da saida" defaultValue={experience.dateResignation} onBlur={(e) => this.handleChange(e, index)} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-group col-md-12">
                                        <textarea className="form-control description" name="description" onBlur={(e) => this.handleChange(e, index)} required>
                                            {experience.description}
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        ))}

 
                        <div className="form-group col-md-12">
                            <button type="submit" className="btn btn-success" onClick={this.handleAddExperience} >Adcionar Experiencia</button>
                        </div>
                    </div>


                    <div className="row">
                        <div className="form-group col-md-12">
                            <button type="submit" className="btn btn-success float-right" value={this.experiences}>Salvar</button>
                        </div>
                    </div>
                </form>
                
            </div >
        );
    }
}