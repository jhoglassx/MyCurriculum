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
        this.state = { title: "", experience: [new ExperienceModel()], loading: true };
        this.render();
    }

    render() {
        const experience = new ExperienceModel();
        return (
            <div key={experience.id} className="experience">
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
        );
    }
}