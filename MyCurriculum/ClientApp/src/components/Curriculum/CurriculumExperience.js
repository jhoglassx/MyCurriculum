import React, { Component } from 'react';

export class ExperienceModel {
    constructor() {
        this.id =0;
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
        this.initialize();

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleAddExperience = this.handleAddExperience.bind(this);
        
    }
    async initialize() {
        var id = this.props.match.params["id"];
        const response = await fetch('api/Experiences');
        const data = await response.json();
        const dataFilter = data.filter(exp => exp?.curriculum.id === 1 );

        //this.setState({ title: "expEdit", experience: dataFilter, loading: false });

        var exp = this.state.experiences;

        for (var i = 0; i < dataFilter.length; i++) {
            exp.push(dataFilter[i]);
            this.setState({ experiences: exp, loading: false });
        }
    }

    handleAddExperience(event) {
        event.preventDefault();

        var exp = this.state.experiences;

        exp.push(new ExperienceModel());

        this.setState({experiences: exp});
    };

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/CurriculumEdit")
    }

    handleChange(e, index) {
        const target = e.target;
        this.state.experiences[index][target.name] = target.value;
    }

    handleSave(event, index) {
        event.preventDefault();

        for (var i = 0; i < this.state.experiences.length;i++) {
            
            const exp = this.state.experiences[i];
            const data = new FormData(event.target);
            if (exp.id > 0) {
                
                fetch('api/Experiences/' + exp.id, { method: "PUT", body: data });
                //this.props.history.push("/CurriculumEdit");
            }
            else {
                fetch('api/Experiences/', {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',

                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(exp)
                });
            }
        }
        this.props.history.push("/CurriculumEdit");
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="form-group col-md-12">
                        <button type="submit" className="btn btn-success" onClick={this.handleAddExperience} >Adcionar Experiencia</button>
                    </div>
                </div>
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
                    <button type="submit" className="btn btn-success" value={this.experiences}>Salvar</button>
                </form>
                
            </div >
            );
    }
}