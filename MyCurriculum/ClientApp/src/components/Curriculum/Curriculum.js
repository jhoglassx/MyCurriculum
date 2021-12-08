import React, { Component } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';


import { CurriculumModel, AdressModel } from '../Curriculum/CurriculumEdit';
import { ExperienceModel } from '../Curriculum/CurriculumExperience';
import { AcademicEducationModel,CourseModel, SkillModel } from '../Curriculum/CurriculumAbiliity';

import '../Curriculum/Curriculum.css';

export class Curriculum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curriculum: "",
            experiences: [],
            academicEducations: [],
            courses: [],
            skills: [],
            adress: [],
            loading: true
        };
        this.initialize();
    }

    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('img/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
            })
            ;
    }

    async initialize() {
        
        var cId = Number(this.props.match.params["id"]);
        this.loadCurriculum(cId);
        this.loadAdress(cId);
        this.loadExperiences(cId);
        this.loadAcademicEducations(cId);
        this.loadCourses(cId);
        this.loadSkills(cId);
        
    }

    async loadCurriculum(cId) {

        if (cId > 0) {
            const response = await fetch('api/Curriculums/' + cId);
            const curriculum = await response.json();

            this.setState({curriculum: new CurriculumModel(curriculum), loading: false });
        }
    }

    async loadAdress(cId) {

        const response = await fetch('api/Addresses');

        const data = await response.json();
        const dataFilter = data.filter(adress => adress?.curriculumId === cId);

        for (var i = 0; i < dataFilter.length; i++) {
            this.setState({adress: [new AdressModel(dataFilter[i])], loading: false });
        }
    }

    async loadExperiences(cId) {

        const response = await fetch('api/Experiences');

        const data = await response.json();
        const dataFilter = data.filter(experience => experience?.curriculumId === cId);

        var exp = this.state.experiences;

        for (var i = 0; i < dataFilter.length; i++) {
            exp.push(new ExperienceModel(dataFilter[i]));
            this.setState({ experiences: exp, loading: false });
        }
    }

    async loadAcademicEducations(cId) {

        const response = await fetch('api/AcademicEducations');

        const data = await response.json();
        const dataFilter = data.filter(academicEducation => academicEducation?.curriculumId === cId);

        var aca = this.state.academicEducations;

        for (var i = 0; i < dataFilter.length; i++) {
            aca.push(new AcademicEducationModel(dataFilter[i]));
            this.setState({ academicEducations: aca, loading: false });
        }
    }

    async loadCourses(cId) {

        const response = await fetch('api/Courses');

        const data = await response.json();
        const dataFilter = data.filter(course => course?.curriculumId === cId);

        var cou = this.state.courses;

        for (var i = 0; i < dataFilter.length; i++) {
            cou.push(new CourseModel(dataFilter[i]));
            this.setState({ courses: cou, loading: false });
        }
    }

    async loadSkills(cId) {

        const response = await fetch('api/Skills');

        const data = await response.json();
        const dataFilter = data.filter(skill => skill?.curriculumId === cId);

        var ski = this.state.courses;

        for (var i = 0; i < dataFilter.length; i++) {
            ski.push(new SkillModel(dataFilter[i]));
            this.setState({ skills: ski, loading: false });
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em></p>
            : this.renderCurriculum();
        return (
            <div>
                {contents}
            </div>
        );
    }

    renderCurriculum() {
        return (
            <div>
                <div className="mb5 print">
                    <button className="btn btn-warning btn-sm" onClick={this.printDocument}>Gerar PDF</button>
                </div>
            
                <div id="divToPrint" className="curriculum">
                    <div className="row">
                        <div className="curriculum_left col-md-3">
                            <div className="photograph">
                                <img alt="imagem" type="imagem" src="https://thumbs.dreamstime.com/z/3-4-mannequin-gradient-9422208.jpg" />
                            </div>
                            <div className="div-group contacts">
                                <h1>Contatos</h1>
                                <div className="row">
                                    <div className="col-md-12 email div-control">
                                        <i className="bi bi-envelope-fill"></i><span>{this.state.curriculum.email}</span>
                                    </div>
                                    <div className="col-md-12 telephone div-control">
                                        <i className="bi bi-telephone-fill"></i><span>{this.state.curriculum.telephone}</span>
                                    </div>

                                    <div className="col-md-12 cellphone div-control">
                                        <i className="bi bi-telephone-fill"></i><span>{this.state.curriculum.cellphone}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="div-group address">
                                <h1>Endereço</h1>
                                {this.state.adress.map(a =>
                                    <div className="row" key={a.id}>
                                        <div className="col-md-12 cidade div-control">
                                            <span>{a.district} / {a.city}</span>
                                        </div>
                                    </div>
                                )}
                                
                            </div>
                            <div className="div-group educations">
                                <h1>Formação</h1>
                                {this.state.academicEducations.map(e =>
                                    <div className="row" key={e.id}>
                                        <div className="col-md-12 course div-control">
                                            <span>{e.course}</span>
                                        </div>
                                        <div className="col-md-12 institution div-control">
                                            <span>{e.institution}</span>
                                        </div>
                                        <div className="col-md-12 date div-control">
                                            <span>{format(new Date(e.dateInitial), 'MM/yyyy') + " ate " + format(new Date(e.dateConclusion), 'MM/yyyy')}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="div-group skills">
                                <h1>Habilidades</h1>
                                {this.state.skills.map(s =>
                                    <div className="row skill" key={s.id}>
                                        <div className="col-md-5 title div-control text-center">
                                            <span>{s.title}</span>
                                        </div>
                                        <div className="col-md-4 time div-control text-center">
                                            <span>{s.skillTime}</span>
                                        </div>
                                        <div className="col-md-3 nivel div-control text-center">
                                            <span>{s.skillNivel}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="curriculum_right col-md-9">
                            <div className="row">
                                <div className="col-md-12 name div-control text-center">
                                    <span>{this.state.curriculum.name}</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 profession div-control text-left">
                                    {this.state.curriculum.profession}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 resume div-control">
                                    {this.state.curriculum.resume}
                                </div>
                            </div>

                            <div className="div-group">
                                {this.state.experiences.map(e =>
                                    <div className="experience" key={e.id}>
                                        <div className="row experience_top">
                                            <div className="occupation col-md-7">
                                                <span>{e.occupation}</span>
                                            </div>

                                            <div className="date_hiring col-md-2 text-right">
                                                <span>{format(new Date(e.dateHiring), 'MM/yyyy')}</span>
                                            </div>
                                            <div className="col-md-1 text-center">
                                                <span>ate</span>
                                            </div>
                                            <div className="date_resignation col-md-2">
                                                <span>{e.dateResignation != null ? format(new Date(e.dateResignation), 'MM/yyyy') : "Atualmente"}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="company col-md-12">
                                                <span>{e.company}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="description div-control">
                                                <span>{e.description}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}