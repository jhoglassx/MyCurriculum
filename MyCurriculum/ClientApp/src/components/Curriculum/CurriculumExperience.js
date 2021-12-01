import React, { Component } from 'react';

export class ExperienceModel {
    constructor(props) {
        this.curriculumId = props;
        this.dateHiring = "";
        this.dateResignation = "";
        this.company = "";
        this.occupation = "";
        this.description = "";
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
        var id = this.props.match.params["id"];
        const response = await fetch('api/Experiences');

        const data = await response.json();
        const dataFilter = data.filter(exp => exp?.curriculumId === id );

        var exp = this.state.experiences;

        for (var i = 0; i < dataFilter.length; i++) {
            exp.push(dataFilter[i]);
            this.setState({ experiences:exp , loading: false });
        }
    }

    handleAddExperience(event) {
        event.preventDefault();

        var exp = this.state.experiences;

        exp.push(new ExperienceModel(exp[0].curriculumId));

        this.setState({ experiences: exp });
    };

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/CurriculumEdit")
    }

    handleChange(e, index) {
        const target = e.target;
        this.state.experiences[index][target.name] = target.value;
    }

    async handleSave(e, index) {
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
        this.props.history.push("/CurriculumEdit");
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
                    {this.state.experiences.map((experience, index) => (
                        <div key={index} className="experience">
                            <input type="hidden" name="id" value={experience.id} />
                            <div className="row">
                                <div className="input-group col-md-12">
                                    <input className="form-control company" type="text" name="company" id={index} placeholder="Contratante" defaultValue={experience.company} onChange={(e) => this.handleChange(e, index)} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group col-md-6">
                                    <input className="form-control occupation" type="text" name="occupation" placeholder="Ocupação" defaultValue={experience.occupation} onChange={(e) => this.handleChange(e, index)} required />
                                </div>
                                <div className="input-group col-md-3">
                                    <input className="form-control dateHiring" type="text" name="dateHiring" placeholder="Data de Contratação" defaultValue={experience.dateHiring} onChange={(e) => this.handleChange(e, index)} required />
                                </div>
                                <div className="input-group col-md-3">
                                    <input className="form-control dateResignation" type="text" name="dateResignation" placeholder="Data da saida" defaultValue={experience.dateResignation} onChange={(e) => this.handleChange(e, index)} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group col-md-12">
                                    <textarea className="form-control description" name="description" onChange={(e) => this.handleChange(e, index)} required>
                                        {experience.description}
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <div className="row">
                        <div className="form-group col-md-12">
                            <button type="submit" className="btn btn-success float-right" value={this.experiences}>Salvar</button>
                            <button type="submit" className="btn btn-success" onClick={this.handleAddExperience} >Adcionar Experiencia</button>
                        </div>
                    </div>
                </form>
                
            </div >
        );
    }
}