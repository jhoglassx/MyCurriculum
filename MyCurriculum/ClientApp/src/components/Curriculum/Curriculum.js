import React, { Component } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';

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
                <div className="mb5">
                    <button onClick={this.printDocument}>Print</button>
                </div>
            
                <div id="divToPrint" className="curriculum">
                    <input type="hidden" name="id" value={this.state.curriculum.id} />
                    <div className="row">
                        <div className="curriculum_left col-md-3">
                            <div className="photograph">
                                <img alt="imagem" type="imagem" src="https://thumbs.dreamstime.com/z/3-4-mannequin-gradient-9422208.jpg" />
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
                                {/*{this.state.curriculum.addresses.map(a =>//{s.skillNivel}*/}
                                {/*    <div className="row" key={a.id}>*/}
                                {/*        <div className="col-md-12 cidade div-control">*/}
                                {/*            <span>{a.district} / {a.city}</span>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                                
                            </div>
                            <div className="div-group educations">
                                <h1>Formação</h1>
                                {/*{this.state.curriculum.academicEducations.map(e =>//{s.skillNivel}*/}
                                {/*    <div className="row" key={e.id}>*/}
                                {/*        <div className="col-md-12 course div-control">*/}
                                {/*            <span>{e.course}</span>*/}
                                {/*        </div>*/}
                                {/*        <div className="col-md-12 institution div-control">*/}
                                {/*            <span>{e.institution}</span>*/}
                                {/*        </div>*/}
                                {/*        <div className="col-md-12 date div-control">*/}
                                {/*            <span>{format(new Date(e.dateIntial), 'MM/yyyy') + " ate " + format(new Date(e.dateConclusion), 'MM/yyyy')}</span>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                            </div>
                            <div className="div-group skills">
                                <h1>Habilidades</h1>
                                {/*{this.state.curriculum.skills.map(s =>*/}
                                {/*    <div className="row skill" key={s.id}>*/}
                                {/*        <div className="col-md-5 title div-control text-center">*/}
                                {/*            <span>{s.title}</span>*/}
                                {/*        </div>*/}
                                {/*        <div className="col-md-4 time div-control text-center">*/}
                                {/*            <span>{s.skillTime}</span>*/}
                                {/*        </div>*/}
                                {/*        <div className="col-md-3 nivel div-control text-center">*/}
                                {/*            <span>{s.skillNivel}</span>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                            </div>

                        </div>
                        <div className="curriculum_right col-md-9">
                            <div className="row">
                                <div className="col-md-12 name div-control text-center">
                                    <span>jhoglas</span>
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
                                { }
                                {this.state.curriculum.experiences.map()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}