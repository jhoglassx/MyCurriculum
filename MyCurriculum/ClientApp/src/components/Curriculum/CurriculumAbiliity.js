import React, { Component } from 'react';
import { ExperienceModel } from './CurriculumExperience';

export class CourseModel {
    constructor(props) {
        this.Id = "";
        this.CurriculumId = props;
        this.Institution = "";//Instuição de formação
        this.Title = "";
        this.DateIntial = "";//Data de inicio do curso
        this.DateConclusion = "";
    }
}

export class SkillModel {
    constructor(props) {
        this.Id = "";
        this.CurriculumId = props;
        this.name = "";
        this.SkillTime = "";
        this.SkillNivel = "";
    }
}

export class AcademicEducationModel {
    constructor(props) {
        this.id = "";
        this.curriculumId = props;
        this.institution = "";//Instuição de formação
        this.course = "";
        this.dateIntial = "";//Data de inicio do curso
        this.dateConclusion = "";
    }
}

export class CurriculumAbiliity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            academicEducations: [],
            courses: [],
            skills: [],
            loading: true
        };
        this.load();

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleAddAcademicEducation = this.handleAddAcademicEducation.bind(this);
        this.handleAddCourse = this.handleAddCourse.bind(this);
        this.handleAddSkill = this.handleAddSkill.bind(this);
        
    }
    async load() {
        var cId = Number(this.props.match.params["id"]);
        this.loadAcademicEducations(cId);
    }

    async loadAcademicEducations(cId) {

        const response = await fetch('api/AcademicEducations');

        const data = await response.json();

        if (data.length > 0) {

            const dataFilter = data.filter(exp => exp?.curriculumId === cId);

            var exp = this.state.academicEducations;

            for (var i = 0; i < dataFilter.length; i++) {
                exp.push(dataFilter[i]);
                this.setState({ academicEducations: exp, loading: false });
            }
        } else {
            this.setState({ academicEducations: [new AcademicEducationModel(cId)], loading: false });
        }
    }

    async loadCourses(cId) {
        const response = await fetch('api/Courses');

        const data = await response.json();

        if (data.length > 0) {

            const dataFilter = data.filter(exp => exp?.curriculumId === cId);

            var exp = this.state.courses;

            for (var i = 0; i < dataFilter.length; i++) {
                exp.push(dataFilter[i]);
                this.setState({ courses: exp, loading: false });
            }
        } else {
            this.setState({ courses: [new CourseModel(cId)], loading: false });
        }
    }

    async loadSkills(cId) {

        const response = await fetch('api/Skills');

        const data = await response.json();

        if (data.length > 0) {

            const dataFilter = data.filter(exp => exp?.curriculumId === cId);

            var ski = this.state.skills;

            for (var i = 0; i < dataFilter.length; i++) {
                ski.push(dataFilter[i]);
                this.setState({ skills: ski, loading: false });
            }
        } else {
            this.setState({ skills: [new SkillModel(cId)], loading: false });
        }
    }

    handleAddAcademicEducation(event) {
        event.preventDefault();

        var aca = this.state.academicEducations;

        aca.push(new AcademicEducationModel(aca[0].curriculumId));

        this.setState({ academicEducations: aca });
    };

    handleAddCourse(event) {
        event.preventDefault();

        var cou = this.state.courses;

        cou.push(new CourseModel(cou[0].curriculumId));

        this.setState({ courses: cou });
    };

    handleAddSkill(event) {
        event.preventDefault();

        var ski = this.state.skills;

        ski.push(new SkillModel(ski[0].curriculumId));

        this.setState({ skills: ski });
    };

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/Curriculum/Edit")
    }

    handleChangeacademicEducations(e, index) {
        const target = e.target;
        this.state.experiences[index][target.name] = target.value;
    }
    handleChangeCourse(e, index) {
        const target = e.target;
        this.state.experiences[index][target.name] = target.value;
    }
    handleChangeSkill(e, index) {
        const target = e.target;
        this.state.experiences[index][target.name] = target.value;
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
        this.props.history.push("/Curriculum/Edit");
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
                    <div className="academicEducations">
                        {this.state.academicEducations.map((academicEducation, index) => (
                            <div key={index} className="academicEducation">
                                <input type="hidden" name="id" value={academicEducation.id} />
                                <div className="row">
                                    <div className="input-group col-md-12">
                                        <input className="form-control company" type="text" name="institution" id={index} placeholder="Contratante" defaultValue={academicEducation.institution} onChange={(e) => this.handleChange(e, index)} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-group col-md-6">
                                        <input className="form-control occupation" type="text" name="course" placeholder="Ocupação" defaultValue={academicEducation.course} onChange={(e) => this.handleChange(e, index)} required />
                                    </div>
                                    <div className="input-group col-md-3">
                                        <input className="form-control dateHiring" type="text" name="dateIntial" placeholder="Data de Inicio" defaultValue={academicEducation.dateIntial} onChange={(e) => this.handleChange(e, index)} required />
                                    </div>
                                    <div className="input-group col-md-3">
                                        <input className="form-control dateResignation" type="text" name="dateConclusion" placeholder="Data de Conclusão" defaultValue={academicEducation.dateConclusion} onChange={(e) => this.handleChange(e, index)} required />
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
                    </div>

                    <div className="courses">
                        {this.state.courses.map((course, index) => (
                            <div key={index} className="course">
                                <input type="hidden" name="id" value={course.id} />
                                <div className="row">
                                    <div className="input-group col-md-12">
                                        <input className="form-control company" type="text" name="institution" id={index} placeholder="Contratante" defaultValue={course.institution} onChange={(e) => this.handleChange(e, index)} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-group col-md-6">
                                        <input className="form-control occupation" type="text" name="name" placeholder="Ocupação" defaultValue={course.name} onChange={(e) => this.handleChange(e, index)} required />
                                    </div>
                                    <div className="input-group col-md-3">
                                        <input className="form-control dateHiring" type="text" name="dateIntial" placeholder="Data de Inicio" defaultValue={course.dateIntial} onChange={(e) => this.handleChange(e, index)} required />
                                    </div>
                                    <div className="input-group col-md-3">
                                        <input className="form-control dateResignation" type="text" name="dateConclusion" placeholder="Data de Conclusão" defaultValue={course.dateConclusion} onChange={(e) => this.handleChange(e, index)} required />
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
                    </div>

                    <div className="courses">
                        {this.state.skills.map((skill, index) => (
                            <div key={index} className="course">
                                <input type="hidden" name="id" value={skill.id} />
                                <div className="row">
                                    <div className="input-group col-md-12">
                                        <input className="form-control company" type="text" name="title" id={index} placeholder="Titulo" defaultValue={skill.title} onChange={(e) => this.handleChange(e, index)} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-group col-md-6">
                                        <input className="form-control occupation" type="text" name="skillTime" placeholder="Tempo" defaultValue={skill.skillTime} onChange={(e) => this.handleChange(e, index)} required />
                                    </div>
                                    <div className="input-group col-md-3">
                                        <input className="form-control dateHiring" type="text" name="skillNivel" placeholder="Nivel de Habilidade" defaultValue={skill.skillNivel} onChange={(e) => this.handleChange(e, index)} required />
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
                    </div>
                </form>
                
            </div >
        );
    }
}