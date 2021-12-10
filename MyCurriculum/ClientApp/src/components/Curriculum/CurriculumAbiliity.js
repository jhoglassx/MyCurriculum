import React, { Component } from 'react';
import { format } from 'date-fns';

export class CourseModel {
    constructor(props) {
        this.id = props.id > 0 ? props.id : 0;
        this.curriculumId = props.curriculumId;
        this.institution = props.id > 0 ? props.institution : "";//Instuição de formação
        this.name = props.id > 0 ? props.name : "";
        this.dateInitial = props.id > 0 ? format(new Date(props.dateInitial), 'yyyy-MM-dd') : new Date("1999-01-00");//Data de inicio do curso
        this.dateConclusion = props.id > 0 ? format(new Date(props.dateConclusion), 'yyyy-MM-dd') : new Date("1999-01-00");
    }
}

export class SkillModel {
    constructor(props) {
        this.id = props.id > 0 ? props.id : 0;
        this.curriculumId = props.curriculumId;
        this.title = props.id > 0 ? props.title : "";
        this.skillTime = props.id > 0 ? props.skillTime : "";
        this.skillNivel = props.id > 0 ? props.skillNivel : "";
    }
}

export class AcademicEducationModel {
    constructor(props) {
        this.id = props.id > 0 ? props.id : 0;
        this.curriculumId = props.curriculumId;
        this.institution = props.id > 0 ? props.institution : "";//Instuição de formação
        this.course = props.id > 0 ? props.course : "";
        this.dateInitial = props.id > 0 ? format(new Date(props.dateInitial), 'yyyy-MM-dd') : new Date();//Data de inicio do curso
        this.dateConclusion = props.id > 0 ? format(new Date(props.dateConclusion), 'yyyy-MM-dd') : new Date();
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
        this.loadCourses(cId);
        this.loadSkills(cId);
    }

    async loadAcademicEducations(cId) {

        const response = await fetch('api/AcademicEducations');

        const data = await response.json();

        if (data.length > 0) {

            const dataFilter = data.filter(aca => aca?.curriculumId === cId);

            var aca = this.state.academicEducations;

            for (var i = 0; i < dataFilter.length; i++) {
                aca.push(new AcademicEducationModel(dataFilter[i]));
                this.setState({ academicEducations: aca, loading: false });
            }
        } else {
            this.setState({ academicEducations: [new AcademicEducationModel({ curriculumId: cId  })], loading: false });
        }
    }

    async loadCourses(cId) {
        const response = await fetch('api/Courses');

        const data = await response.json();

        if (data.length > 0) {

            const dataFilter = data.filter(cou => cou?.curriculumId === cId);

            var cou = this.state.courses;

            for (var i = 0; i < dataFilter.length; i++) {
                cou.push(new CourseModel(dataFilter[i]));
                this.setState({ courses: cou, loading: false });
            }
        } else {
            this.setState({ courses: [new CourseModel({ curriculumId: cId })], loading: false });
        }
    }

    async loadSkills(cId) {

        const response = await fetch('api/Skills');

        const data = await response.json();

        if (data.length > 0) {

            const dataFilter = data.filter(exp => exp?.curriculumId === cId);

            var ski = this.state.skills;

            for (var i = 0; i < dataFilter.length; i++) {
                ski.push(new SkillModel(dataFilter[i]));
                this.setState({ skills: ski, loading: false });
            }
        } else {
            this.setState({ skills: [new SkillModel({ curriculumId: cId })], loading: false });
        }
    }

    handleAddAcademicEducation(event) {
        event.preventDefault();

        var aca = this.state.academicEducations;

        aca.push(new AcademicEducationModel({ curriculumId: aca[0].curriculumId }));

        this.setState({ academicEducations: aca });
    };

    handleAddCourse(event) {
        event.preventDefault();

        var cou = this.state.courses;

        cou.push(new CourseModel({ curriculumId: cou[0].curriculumId }));

        this.setState({ courses: cou });
    };

    handleAddSkill(event) {
        event.preventDefault();

        var ski = this.state.skills;

        ski.push(new SkillModel({ curriculumId: ski[0].curriculumId }));

        this.setState({ skills: ski });
    };

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/Curriculum/Edit")
    }

    handleChangeacademicEducations(e, index) {
        const target = e.target;

        var aca = this.state.academicEducations;
        aca[index][target.name] = target.value;
        this.setState({ academicEducations: aca });
    }
    handleChangeCourse(e, index) {
        const target = e.target;

        var cou = this.state.courses;
        cou[index][target.name] = target.value;
        this.setState({ courses: cou });
    }
    handleChangeSkill(e, index) {
        const target = e.target;

        var ski = this.state.skills;
        ski[index][target.name] = target.value;
        this.setState({ skills: ski });
    }

    async handleSave(e) {
        e.preventDefault();
        var cId = Number(this.props.match.params["id"]);

        this.handleSaveAcademicEducations();
        this.handleSaveCourse();
        this.handleSaveSkill();

        this.props.history.push("/c/" + cId);
    }

    async handleSaveAcademicEducations() {

        for (var i = 0; i < this.state.academicEducations.length;i++) {
            
            const aca = this.state.academicEducations[i];

            if (aca.id > 0) {
                await fetch('api/AcademicEducations/' + aca.id, {
                    method: "PUT",
                    contentType: 'application/json; charset=UTF-8',
                    headers: { 'Content-Type': 'application/json' },
                    dataType: 'json',
                    body: JSON.stringify(aca)
                })
                    .then(result => result.text())
                    .then(data => this.setState({ Id: data.id }));
            }
            else {
                await fetch('api/AcademicEducations/', {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(aca)
                })
                    .then(result => result.text())
                    .then(data => console.log(data));
            }
        }
    }

    async handleSaveCourse() {

        for (var i = 0; i < this.state.courses.length; i++) {

            const cou = this.state.courses[i];

            if (cou.id > 0) {
                await fetch('api/Courses/' + cou.id, {
                    method: "PUT",
                    contentType: 'application/json; charset=UTF-8',
                    headers: { 'Content-Type': 'application/json' },
                    dataType: 'json',
                    body: JSON.stringify(cou)
                })
                    .then(result => result.text())
                    .then(data => this.setState({ Id: data.id }));
            }
            else {
                await fetch('api/Courses/', {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(cou)
                })
                    .then(result => result.text())
                    .then(data => console.log(data));
            }
        }
    }

    async handleSaveSkill() {

        for (var i = 0; i < this.state.skills.length; i++) {

            const ski = this.state.skills[i];

            if (ski.id > 0) {
                await fetch('api/Skills/' + ski.id, {
                    method: "PUT",
                    contentType: 'application/json; charset=UTF-8',
                    headers: { 'Content-Type': 'application/json' },
                    dataType: 'json',
                    body: JSON.stringify(ski)
                })
                    .then(result => result.text())
                    .then(data => this.setState({ Id: data.id }));
            }
            else {
                await fetch('api/Skills/', {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(ski)
                })
                    .then(result => result.text())
                    .then(data => console.log(data));
            }
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : this.renderAbiliity();
        return (
            <div>
                {contents}
            </div>
        );
    }

    renderAbiliity() {
        return (
            <div className="abiliitys">
                <form onSubmit={this.handleSave}>
                    <div className=" academicEducations">
                        <div className="card-header">
                            <h5 class="card-title">Formação Academica</h5>
                        </div>
                        {this.state.academicEducations.map((academicEducation, index) => (
                            <div key={index} className="card card-item academicEducation">
                                <input type="hidden" name="id" value={academicEducation.id} />
                                <div className="row">
                                    <div className="input-group col-md-12">
                                        <input className="form-control" type="text" name="course" placeholder="Curso" defaultValue={academicEducation.course} onBlur={(e) => this.handleChangeacademicEducations(e, index)} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-group col-md-6">
                                        <input className="form-control" type="text" name="institution" id={index} placeholder="Instituição" defaultValue={academicEducation.institution} onBlur={(e) => this.handleChangeacademicEducations(e, index)} required />
                                    </div>
                                        
                                    <div className="input-group col-md-3">
                                        <input className="form-control" type="date" name="dateInitial" placeholder="Data de Inicio" defaultValue={academicEducation.dateInitial} onBlur={(e) => this.handleChangeacademicEducations(e, index)} required />
                                    </div>
                                    <div className="input-group col-md-3">
                                        <input className="form-control" type="date" name="dateConclusion" placeholder="Data de Conclusão" defaultValue={academicEducation.dateConclusion} onBlur={(e) => this.handleChangeacademicEducations(e, index)} required />
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <div className="row">
                            <button type="submit" className="btn btn-sm btn-success" onClick={this.handleAddAcademicEducation} >Adcionar Formação</button>
                        </div>
                    </div>

     
                    <div class="courses">
                        <div class="card-header">
                            <h5 class="card-title">Cursos</h5>
                        </div>
                        {this.state.courses.map((course, index) => (
                            <div key={index} className="card card-item course">
                                <input type="hidden" name="id" value={course.id} />
                                <div className="row">
                                    <div className="input-group col-md-12">
                                        <input className="form-control" type="text" name="name" placeholder="Nome do Curso" defaultValue={course.name} onBlur={(e) => this.handleChangeCourse(e, index)} required />
                                    </div>
                                        
                                </div>
                                <div className="row">
                                    <div className="input-group col-md-6">
                                        <input className="form-control" type="text" name="institution" id={index} placeholder="Instituição" defaultValue={course.institution} onBlur={(e) => this.handleChangeCourse(e, index)} required />
                                    </div>
                                    <div className="input-group col-md-3">
                                        <input className="form-control" type="date" name="dateInitial" placeholder="Data de Inicio" defaultValue={course.dateInitial} onBlur={(e) => this.handleChangeCourse(e, index)} required />
                                    </div>
                                    <div className="input-group col-md-3">
                                        <input className="form-control" type="date" name="dateConclusion" placeholder="Data de Conclusão" defaultValue={course.dateConclusion} onBlur={(e) => this.handleChangeCourse(e, index)} required />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="row">
                            <button type="submit" className="btn btn-sm btn-success" onClick={this.handleAddCourse} >Adcionar Curso</button>
                        </div>
                    </div>

                    <div class="skills">
                        <div class="card-header">
                            <h5 class="card-title">Habilidades</h5>
                        </div>
                        {this.state.skills.map((skill, index) => (
                            <div key={index} className="card card-item course col-md-5">
                                <input type="hidden" name="id" value={skill.id} />
                                <div className="row">
                                    <div className="input-group col-md-6">
                                        <input className="form-control" type="text" name="title" id={index} placeholder="Titulo" defaultValue={skill.title} onBlur={(e) => this.handleChangeSkill(e, index)} required />
                                    </div>
                                    <div className="input-group col-md-3">
                                        <input className="form-control" type="text" name="skillTime" placeholder="Tempo" defaultValue={skill.skillTime} onBlur={(e) => this.handleChangeSkill(e, index)} required />
                                    </div>
                                    <div className="input-group col-md-3">
                                        <input className="form-control" type="text" name="skillNivel" placeholder="Nivel de Habilidade" defaultValue={skill.skillNivel} onBlur={(e) => this.handleChangeSkill(e, index)} required />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="row">
                            <button type="submit" className="btn btn-sm btn-success" onClick={this.handleAddSkill} >Adcionar Habilidade</button>
                        </div>
                    </div>

                    <div className="row">
                        <button type="submit" className="btn btn-success float-right" value={this.skills}>Salvar</button>
                    </div>

                </form>
                
            </div >
        );
    }
}