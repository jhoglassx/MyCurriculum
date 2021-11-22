import React, { Component } from 'react';

export class ExperienceModel {
    constructor() {
        this.id =0;
        this.curriculumId = 0;
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
        this.experience = new ExperienceModel();
        this.initialize();

        this.experiences = [this.experience];

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleAddExperience = this.handleAddExperience.bind(this);
        
    }

    async initialize(){ 
        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('api/Curriculums/' + id);
            const data = await response.json();
            this.setState({experience: data});
        }
        else {
            this.state = { title: "expCreate", experience: new ExperienceModel(), loading: false };
        }
    }

    handleAddExperience(event) {
        event.preventDefault();

        var experiences = this.experiences;

        experiences.push(new ExperienceModel({
            id: '',
        }));

        this.setState({experiences: experiences});
    };

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
        else {
            fetch('api/Curriculums/', { method: "POST", body: data });
            this.props.history.push("/CurriculumEdit");
        }
    }

    render() {
        console.log('SearchBar this.state', this.experience);
        return (
            <div>
                <div className="row">
                    <div className="form-group col-md-12">
                        <button type="submit" className="btn btn-success" onClick={this.handleAddExperience} >Adcionar Experiencia</button>
                    </div>
                </div>
                {this.experiences.map((experience, index) => (
                    <div key={index} className="experience">
                        <input type="hidden" name="id" value={experience.curriculumId} />
                        <div className="row">
                            <div className="input-group col-md-12">
                                <input className="form-control company" type="text" name="company" placeholder="Contratante" defaultValue={experience.company} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-6">
                                <input className="form-control occupation" type="text" name="Occupation" placeholder="Ocupação" defaultValue={experience.occupation} required />
                            </div>
                            <div className="input-group col-md-3">
                                <input className="form-control dateHiring" type="text" name="dateHiring" placeholder="Data de Contratação" defaultValue={experience.dateHiring} required />
                            </div>
                            <div className="input-group col-md-3">
                                <input className="form-control dateResignation" type="text" name="dateResignation" placeholder="Data da saida" defaultValue={experience.dateResignation} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group col-md-12">
                                <textarea className="form-control description" name="description" required>
                                    {experience.description}
                                </textarea>
                            </div>
                        </div>
                    </div>
                ))}
            </div >
            );
    }
}