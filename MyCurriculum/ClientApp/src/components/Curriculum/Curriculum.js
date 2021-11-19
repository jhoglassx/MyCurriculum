import React, { Component } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
        
        var id = this.props.match.params["id"];
        
        if (id > 0) {
            const response = await fetch('api/Curriculums/' + id);
            const curriculum = await response.json();

            this.setState({ title: "Edit", curriculum: curriculum, loading: false });
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
                {contents}
            </div>
        );
    }

    renderCurriculum() {
        const textArea = document.querySelector('textarea');
        const textRowCount = textArea ? textArea.value.substring(100).length : 0;
        const rows = textRowCount + 1;
        return (
            <div>
                <div className="mb5">
                    <button onClick={this.printDocument}>Print</button>
                </div>
            
                <div id="divToPrint" className="curriculum">
                    <input type="hidden" name="id" value={this.state.curriculum.id} />
                    <div className="row">
                        <div className="curriculum_left col-md-3">
                            <div className="photograph">
                                <img src="https://thumbs.dreamstime.com/z/3-4-mannequin-gradient-9422208.jpg" />
                            </div>
                            <div className="div-group contacts">
                                <h1>Contatos</h1>
                                <div className="row">
                                    <div className="col-md-12 email div-control">
                                        <i class="bi bi-envelope-fill"></i><span>{this.state.curriculum.email}</span>
                                    </div>
                                    <div className="col-md-12 telephone div-control">
                                        <i class="bi bi-telephone-fill"></i><span>{this.state.curriculum.telephone}</span>
                                    </div>

                                    <div className="col-md-12 cellphone div-control">
                                        <i class="bi bi-telephone-fill"></i><span>{this.state.curriculum.cellphone}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="div-group address">
                                <h1>Endereço</h1>
                                <div className="row">
                                    <div className="col-md-12 cidade div-control">
                                        <span>Betim/MG</span>
                                    </div>
                                </div>
                            </div>
                            <div className="div-group educations">
                                <h1>Formação</h1>
                                <div className="row">
                                    <div className="col-md-12 course div-control">
                                        <span>Analise e Desenvolvimento de Sistemas</span>
                                    </div>
                                    <div className="col-md-12 institution div-control">
                                        <span>Faculdade Estacio</span>
                                    </div>
                                    <div className="col-md-12 institution div-control">
                                        <span>06/2019 ate 06/2022</span>
                                    </div>
                                </div>
                            </div>
                            <div className="div-group skills">
                                <h1>Habilidades</h1>
                                <div className="row skill">
                                    <div className="col-md-5 title div-control text-center">
                                        <span>C#</span>
                                    </div>
                                    <div className="col-md-4 time div-control text-center">
                                        <span>12 Meses</span>
                                    </div>
                                    <div className="col-md-3 nivel div-control text-center">
                                        <span>Junior</span>
                                    </div>
                                </div>
                                <div className="row skill">
                                    <div className="col-md-5 title div-control text-center">
                                        <span>SQL</span>
                                    </div>
                                    <div className="col-md-4 time div-control text-center">
                                        <span>2 anos</span>
                                    </div>
                                    <div className="col-md-3 nivel div-control text-center">
                                        <span>Pleno</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="curriculum_right col-md-9">
                            <div className="row">
                                <div className="col-md-12 name div-control text-center">
                                    <span>Jhoglas Shopsigner Xavier Rocha</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 profession div-control text-left">
                                    Programador Full Stack
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 resume div-control">
                                    {this.state.curriculum.resume}
                                </div>
                            </div>

                            <div className="div-group">
                                <div className="experience">
                                    <div className="row experience_top">
                                        <div className="occupation col-md-7">
                                            <span>Programador C# .net Fullstack</span>
                                        </div>
                                    
                                        <div className="date_hiring col-md-2 text-right">
                                            <span>04/2021</span>
                                        </div>
                                        <div className="col-md-1 text-center">
                                            <span>ate</span>
                                        </div>
                                        <div className="date_resignation col-md-2">
                                            <span>Atualmente</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="company col-md-12">
                                            <span>Elfa Engenharia e Sistemas</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="description div-control">
                                            <span>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}